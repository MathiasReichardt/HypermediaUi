import { ReflectionHelpers } from './reflection-helpers';
import { findAll, find, get, where, replace } from 'simple-object-query';

export class SchemaSimplifier {
   simplifySchema(response: any) {
    // normalize schema so ui component can render propperly, if component improves this may be vanish:
    // sub schemas, definitions + ref: not resolved
    // format: unknown "int32", "int64"
    // oneOf: not handled-> will not show

    this.resolveLocalReferences(response);
    this.fixNullablesInOneOf(response);
    this.flatenOneOf(response);
    this.fixUnknownFormats(response);

    // angular2-json-schema-form: 0.7.0-alpha.1 leaves schema version in schema object when translating from schema 4 to 6
    // until fixed remove schema version
    this.removeSchemaSpecification(response);
  }

  private removeSchemaSpecification(schema: any) {
    const schemaProeprty = '$schema';
    if (schema.hasOwnProperty(schemaProeprty)) {
      delete schema[schemaProeprty];
    }
  }

  private fixUnknownFormats(object: any) {
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

  private flatenOneOf(schema: any) {
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

  private fixNullablesInOneOf(schema: any) {
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

  private removeNullType(oneOf: Array<any>) {
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
    const foundRefs = <Array<any>>find(schema, {
      '$ref': /\.*/
    });

    foundRefs.forEach(refParent => {
      const definitionKey = (<string>refParent.$ref).replace('#/definitions/', '');
      const replacement = schema.definitions[definitionKey];
      if (!replacement) {
        throw new Error(`Can not resolve schema reference: ${refParent.$ref}`);
      }

      delete refParent.$ref;
      Object.assign(refParent, replacement);
    });

    delete schema.definitions;
    return;
  }
}
