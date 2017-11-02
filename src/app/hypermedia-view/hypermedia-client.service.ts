import { MockResponses } from './mockResponses';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { HttpClient as AngularHttpClient, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';

@Injectable()
export class HypermediaClientService {

  // private entryPoint = 'http://localhost:5000/Customers/Query?Pagination.PageSize=4';
  // private entryPoint = 'http://localhost:5000/entrypoint';
  private entryPoint = 'http://localhost:5000/Customers/1';

  private currentClientObject$: BehaviorSubject<SirenClientObject> = new BehaviorSubject<SirenClientObject>(new SirenClientObject(this.httpClient));
  private currentClientObjectRaw$: BehaviorSubject<object> = new BehaviorSubject<object>({});


  constructor(private httpClient: AngularHttpClient) { }

  getHypermediaObjectStream(): BehaviorSubject<SirenClientObject> {
    return this.currentClientObject$;
  }

  getHypermediaObjectRawStream(): BehaviorSubject<object> {
    return this.currentClientObjectRaw$;
  }

  enterApi() {
    this.httpClient.get(this.entryPoint).subscribe(response => {
      response = MockResponses.customerWithParameterlessAction; // MOCK

      const sirenClientObject = this.MapResponse(response);
      this.currentClientObject$.next(sirenClientObject);
      this.currentClientObjectRaw$.next(response);
    });
  }

  Navigate(url: string) {
    this.httpClient.get(url).subscribe(response => {
      const sirenClientObject = this.MapResponse(response);
      this.currentClientObject$.next(sirenClientObject);
      this.currentClientObjectRaw$.next(response);
    });
  }

  executeParameterlessAction(action: HypermediaAction, actionResult: (ActionResults, string?) => void): any {
    switch (action.method) {
      case HttpMethodTyes.POST:
        this.httpClient.post(action.href, {}).subscribe(
          response => { actionResult(ActionResults.ok, this.getErrorMessage(<HttpResponseBase>response)); },
          error => {
            actionResult(ActionResults.error, this.getErrorMessage(<HttpResponseBase>error)); // TODO process ProblemJson
            // throw new Error('HypermediaClientService: Error in request: ' + (<HttpErrorResponse>error).message);
          },
          () => { actionResult(ActionResults.ok); }); // TODO on complete reload current entity?
        break;

      default: {
        // TODO implement other methods
        throw Error('Unsupported method used for execution action');
      }

    }
  }

  getErrorMessage(error: HttpResponseBase): any {
    const statusCode = error.status;
    let message;
    if (statusCode >= 200 && statusCode < 300) {
      message = 'Executed';
    } else if (statusCode === 400) {
      message = 'Bad Request';
    } else if (statusCode === 401) {
      message = 'Unauthorized';
    } else if (statusCode === 403) {
      message = 'Forbidden';
    } else if (statusCode === 404) {
      message = 'Action resource not found';
    } else if (statusCode === 409) {
      message = 'Resource has changed: conflict.';
    } else if (statusCode >= 400 && statusCode < 500) {
      message = 'Client error';
    } else if (statusCode >= 500) {
      message = 'Server error';
    } else {
      message = 'Unknown';
    }

    return message + ' [' + statusCode + ']';
  }

  private MapResponse(response: any): SirenClientObject {
    const hco = new SirenClientObject(this.httpClient);
    hco.deserialize(response);
    return hco;
  }
}

// todo extract deserializer
export class SirenClientObject {
  private readonly waheActionType = 'application/json';

  classes: string[] = new Array<string>();
  links: HypermediaLink[] = new Array<HypermediaLink>();
  properties: PropertyInfo[];
  embeddedLinkEntities: EmbeddedLinkEntity[];
  embeddedEntities: EmbeddedEntity[];
  title: string;
  actions: HypermediaAction[];

  constructor(private httpClient: AngularHttpClient) { } // todo remove this http client! also add a chache for schemas

  deserialize(response: any) {
    this.classes = [...(<string[]>response.class)]; // todo what if undefined
    this.title = response.title;
    this.links = this.deserializeLinks(response.links); // todo what if undefined
    this.properties = this.deserializeProperties(response.properties);
    this.actions = this.deserializeActions(response.actions);


    // todo preserve order of embeddedLinkEntitys and embeddedEntity, splitting types changes order
    this.embeddedLinkEntities = this.deserializeEmbeddedLinkEntity(response.entities);
    this.embeddedEntities = this.deserializeEmbeddedEntity(response.entities);
  }

  deserializeEmbeddedLinkEntity(entities: Array<any>): Array<EmbeddedLinkEntity> {
    const result = new Array<EmbeddedLinkEntity>();

    entities.forEach(entity => {
      if (!this.isEmbeddedLinkEntity(entity)) {
        return;
      }

      const linkEntity = new EmbeddedLinkEntity(this.httpClient);
      linkEntity.href = entity.href;           // todo what if not there
      linkEntity.relations = [...entity.rel];
      linkEntity.classes = [...entity.class];
      linkEntity.title = entity.title;
      linkEntity.mediaType = entity.mediaType;

      result.push(linkEntity);
    });

    return result;
  }



  deserializeEmbeddedEntity(entities: Array<any>): Array<EmbeddedEntity> {
    const result = new Array<EmbeddedEntity>();
    entities.forEach(entity => {
      if (this.isEmbeddedLinkEntity(entity)) {
        return;
      }

      const embeddedEntity = new EmbeddedEntity(this.httpClient);
      embeddedEntity.relations = [...entity.rel];  // todo what if not there
      embeddedEntity.deserialize(entity);
      result.push(embeddedEntity);
    });

    return result;
  }

  deserializeLinks(links: any[]): HypermediaLink[] {
    const result = new Array<HypermediaLink>();
    links.forEach(link => {
      result.push(new HypermediaLink([...link.rel], link.href));
    });

    return result;
  }

  deserializeActions(actions: any[]): HypermediaAction[] {
    const result = new Array<HypermediaAction>();

    actions.forEach(action => {
      const hypermediaAction = new HypermediaAction();
      hypermediaAction.name = action.name;

      if (this.hasFilledArrayProperty(action, 'class')) {
        hypermediaAction.classes = [...action.class];
      }

      hypermediaAction.method = this.getMethod(action);

      hypermediaAction.href = action.href;
      hypermediaAction.title = action.title;
      hypermediaAction.type = action.type;

      this.deserializeActionParameters(action, hypermediaAction);

      result.push(hypermediaAction);
    });

    return result;
  }

  private getMethod(action: any): HttpMethodTyes {
    let method = HttpMethodTyes[<string>action.method];

    // default value for siren is GET
    if (!method) {
      method = HttpMethodTyes.GET;
    }

    return method;
  }


  deserializeActionParameters(action: any, hypermediaAction: HypermediaAction) {
    if (!this.hasFilledArrayProperty(action, 'fields') || action.fields.length === 0) {
      hypermediaAction.isParameterLess = true;
      return;
    } else {
      hypermediaAction.isParameterLess = false;



      this.parsWaheStyleParameters(action, hypermediaAction);

    }
  }

  parsWaheStyleParameters(action: any, hypermediaAction: HypermediaAction) {
    if (!this.hasProperty(action, 'type') || action.type !== this.waheActionType) {
      throw new Error(`Only suporting actions with type="${this.waheActionType}". [action ${action.name}]`); // todo pars standard siren
    }

    if (!this.hasFilledArrayProperty(action, 'fields')) {
      throw new Error(`no property fields of type array found, which is required. [action ${action.name}]`);
    }

    if (action.fields.length !== 1) {
      throw new Error(`Action field may only contain one entry. [action ${action.name}]`);
    }

    hypermediaAction.waheActionParameterName = action.fields[0].name; // todo check from pressence
    hypermediaAction.waheActionParameterClasses = [...action.fields[0].class];
    if (hypermediaAction.waheActionParameterClasses.length !== 1) {
      throw new Error(`Action field may only contain one class. [action ${action.name}]`);
    }

    // todo find better solution ASYNC
    hypermediaAction.waheActionParameterJsonSchema = null;
    this.getActionParameterJsonSchema(hypermediaAction.waheActionParameterClasses[0], hypermediaAction);

  }

  getActionParameterJsonSchema(schemaUrl: string, hypermediaAction: HypermediaAction){
    this.httpClient.get(schemaUrl).subscribe( (response: Response) => {
      hypermediaAction.waheActionParameterJsonSchema = JSON.stringify(response);
    });
  }

  deserializeProperties(properties: any): PropertyInfo[] {
    const result = new Array<PropertyInfo>();

    for (const property in properties) {
      if (!properties.hasOwnProperty(property)) {
        continue;
      }

      const value = properties[property];
      const propertyType = typeof value;


      if (value === null) {
        result.push(new PropertyInfo(property, value, PropertyTypes.nullvalue));
        continue;
      }

      switch (propertyType) {
        case 'number':
          result.push(new PropertyInfo(property, value, PropertyTypes.number));
          break;

        case 'boolean':
          result.push(new PropertyInfo(property, value, PropertyTypes.boolean));
          break;

        case 'string':
          result.push(new PropertyInfo(property, value, PropertyTypes.string));
          break;

        case 'object':
          if (Array.isArray(value)) {
            result.push(new PropertyInfo(property, value, PropertyTypes.array)); // todo nested values
          } else {
            result.push(new PropertyInfo(property, value, PropertyTypes.object)); // todo nested values
          }

          break;

        case 'undefined':
        case 'function':
        case 'symbol':
        default:
          continue;
      }
    }

    return result;
  }

  private hasProperty(obj: object, propertyName: string): boolean {
    if (obj.hasOwnProperty(propertyName)) {
      return true;
    }
    return false;
  }

  private hasFilledProperty(obj: object, propertyName: string): boolean {
    if (this.hasProperty(obj, propertyName) && obj[propertyName]) {
      return true;
    }

    return false;
  }

  private hasFilledArrayProperty(obj: object, propertyName: string): boolean {
    if (this.hasFilledProperty(obj, propertyName) && Array.isArray(obj[propertyName])) {
      return true;
    }

    return false;
  }

  private isEmbeddedLinkEntity(entity: any) {
    if (entity.hasOwnProperty('href')) {
      return true;
    }

    return false;
  }
}

export class EmbeddedLinkEntity extends SirenClientObject implements IEmbeddedEntity {
  public relations: string[] = new Array<string>();
  public href: string;
  public classes: string[] = new Array<string>();
  public mediaType: string;
  public title: string;

  constructor(httpClient: AngularHttpClient) {
    super(httpClient);
  }

}

export class EmbeddedEntity extends SirenClientObject implements IEmbeddedEntity {
  public relations: string[];
}

export interface IEmbeddedEntity {
  relations: string[];
}

export class PropertyInfo {
  constructor(public name: string, public value: any, public type: PropertyTypes) { }
}

export enum PropertyTypes {
  nullvalue = 'nullvalue',
  boolean = 'boolean',
  number = 'number',
  string = 'string',
  object = 'object',
  array = 'array'
}

export enum HttpMethodTyes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export enum ActionResults {
  undefined,
  pending,
  error,
  ok
}

export class HypermediaLink {
  constructor(public relations: string[], public url: string) { }
}

export class HypermediaAction {
  public name: string;
  public classes: string[] = new Array<string>();
  public method: HttpMethodTyes;
  public href: string;
  public title: string;
  public type: string;

  public isParameterLess: boolean;
  public waheActionParameterName: string;
  public waheActionParameterClasses: string[];
  public waheActionParameterJsonSchema: string;

  constructor() { }
}

