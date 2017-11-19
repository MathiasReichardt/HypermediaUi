import { ObservableLruCache } from '../api-access/observable-lru-cache';
import { findAll, find, get, where, replace } from 'simple-object-query';
import { PropertyTypes, PropertyInfo } from './property-info';
import { HttpClient as AngularHttpClient, HttpErrorResponse, HttpResponseBase, HttpResponse, HttpHeaders } from '@angular/common/http';
import { HypermediaAction, HttpMethodTyes } from './hypermedia-action';
import { HypermediaLink } from './hypermedia-link';
import { EmbeddedLinkEntity } from './embedded-link-entity';
import { EmbeddedEntity } from './embedded-entity';
import { ISirenClientObject, IEmbeddedLinkEntity, IEmbeddedEntity } from './entity-interfaces';


export class SirenClientObject implements ISirenClientObject {

    private readonly waheActionType = 'application/json';

    classes: string[] = new Array<string>();
    links: HypermediaLink[] = new Array<HypermediaLink>();
    properties: PropertyInfo[];
    embeddedLinkEntities: IEmbeddedLinkEntity[];
    embeddedEntities: IEmbeddedEntity[];
    title: string;
    actions: HypermediaAction[];

    constructor(private httpClient: AngularHttpClient, private schemaCache: ObservableLruCache<object>) { } // todo remove this http client! also add a chache for schemas

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

        const linkEntity = new EmbeddedLinkEntity(this.httpClient, this.schemaCache);
        linkEntity.href = entity.href;           // todo what if not there
        linkEntity.relations = [...entity.rel];
        linkEntity.classes = [...entity.class];
        linkEntity.title = entity.title;
        linkEntity.mediaType = entity.mediaType;

        result.push(linkEntity);
      });

      return result;
    }



    deserializeEmbeddedEntity(entities: Array<any>): Array<IEmbeddedEntity> {
      const result = new Array<IEmbeddedEntity>();
      entities.forEach(entity => {
        if (this.isEmbeddedLinkEntity(entity)) {
          return;
        }

        console.log('Fix with deserializer');
        // const embeddedEntity = new EmbeddedEntity(this.httpClient, this.schemaCache);
        // embeddedEntity.relations = [...entity.rel];  // todo what if not there
        // embeddedEntity.deserialize(entity);
        // result.push(embeddedEntity);
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
        this.parseWaheStyleParameters(action, hypermediaAction);
      }
    }

    parseWaheStyleParameters(action: any, hypermediaAction: HypermediaAction) {
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

      if (!action.fields[0].name) {
        throw new Error(`Action field must contain a name. [action ${action.name}]`);
      }
      hypermediaAction.waheActionParameterName = action.fields[0].name;

      this.getActionParameterJsonSchema(hypermediaAction.waheActionParameterClasses[0], hypermediaAction);
    }

    // todo handle error
    getActionParameterJsonSchema(schemaUrl: string, hypermediaAction: HypermediaAction) {
      const cached = this.schemaCache.getItem(schemaUrl);
      if (cached) {
        hypermediaAction.waheActionParameterJsonSchema = cached;
        return;
      }

      const simplifiedResponse$ = this.httpClient.get(schemaUrl)
      .map(response => {
        this.simplifySchema(response);
        return response;
      });

      const cachedResponse = this.schemaCache.addItem(schemaUrl, simplifiedResponse$);
      hypermediaAction.waheActionParameterJsonSchema = cachedResponse;
    }

    simplifySchema(response: any) {
      // normalize schema so ui component can render propperly, if component improves this may be vanish:
      // sub schemas, definitions + ref: not resolved
      // format: unknown "int32", "int64"
      // oneOf: not handled-> will not show

      this.resolveLocalReferences(response);
      this.fixNullablesInOneOf(response);
      this.flatenOneOf(response);
      this.fixUnknownFormats(response);
    }

    fixUnknownFormats(object: any) {
      for (const propertyName in object) {
        if (!object.hasOwnProperty(propertyName)) {
          continue;
        }

        if (propertyName === 'format' && (object[propertyName] === 'int32' || object[propertyName] === 'int64')) {
          delete object[propertyName];
        }

        // recursion
        if (typeof (object[propertyName]) === 'object') {
          this.fixUnknownFormats(object[propertyName]);
        }

      }
    }

    flatenOneOf(schema: any) {
      const properties = schema.properties;
      if (!properties) {
        return;
      }

      for (const propertyName in properties) {
        if (!properties.hasOwnProperty(propertyName)) {
          continue;
        }

        const oneOf = properties[propertyName].oneOf;
        if (oneOf && Array.isArray(oneOf)) {
          if (oneOf.length > 1) {
            throw new Error('Can not flatten oneOf in schema because mre than one element remaining.');
          }

          const containedSchema = oneOf[0];
          delete properties[propertyName].oneOf;
          if (!containedSchema) {
            continue;
          }

          properties[propertyName] = containedSchema;

          // recursion
          this.flatenOneOf(properties[propertyName]);
        }
      }

    }

    fixNullablesInOneOf(schema: any) {
      const properties = schema.properties;
      if (!properties) {
        return;
      }

      for (const propertyName in properties) {
        if (!properties.hasOwnProperty(propertyName)) {
          continue;
        }

        const oneOf = properties[propertyName].oneOf;
        if (oneOf && Array.isArray(oneOf)) {
          this.removeNullType(oneOf);

          // recursion
          oneOf.forEach(element => {
            this.fixNullablesInOneOf(element);
          });
        }
      }
    }

    removeNullType(oneOf: Array<any>) {
      let nullTypeCount = 0;
      let nullTypeItemIndex = -1;
      let index = 0;
      oneOf.forEach(item => {
        const type = item.type;
        if (type && type === 'null') {
          nullTypeCount++;
          nullTypeItemIndex = index;
        }
        index++;
      });

      if (nullTypeCount > 1) {
        throw new Error(`Too much null types in schema (${nullTypeCount})`);
      }

      if (nullTypeItemIndex === -1) {
        return;
      }

      oneOf.splice(nullTypeItemIndex, 1);
    }

    private resolveLocalReferences(schema: any) {
      const foundRefsArrays = <Array<any>>find(schema, {
        'oneOf': /\.*/
      });

      foundRefsArrays.forEach(element => {
        const elemetsToRemove = [];
        element.oneOf.forEach(one => {
          if (this.hasProperty(one, '$ref')) {
            const definitionKey = (<string>one.$ref).replace('#/definitions/', '');
            const replacement = schema.definitions[definitionKey];
            if (!replacement) {
              throw new Error(`Can not resolve schema reference: ${one.$ref}`);
            }
            element.oneOf.push(schema.definitions[definitionKey]);
            elemetsToRemove.push(one);
          }

          elemetsToRemove.forEach(e => {
            const index = element.oneOf.indexOf(e);
            if (index >= 0) {
              element.oneOf.splice(index, 1);
            }

          });
        });
      });

      // recursion, migth have replaced ref with a subschema which contains a ref.
      const remainingRefs = <Array<any>>find(schema, {
        '$ref': /\.*/
      });
      if (remainingRefs.length !== 0) {
        this.resolveLocalReferences(schema);
      }

      delete schema.definitions;
      return;
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
