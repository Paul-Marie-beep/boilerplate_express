class Replacement {
  constructor(file) {
    this.file = file;
  }
  replaceDbNameInTemplate() {
    const output = file.replace(/{%NAME_OF_DB%}/g, dbName);
    return output;
  }
  replaceModelNameInTemplate() {
    const output = file.replace(/{%MODEL_NAME%}/g, modelName);
    return output;
  }
  replaceSchemaNameInTemplate() {
    const output = file.replace(/{%SCHEMA_NAME%}/g, schemaName);
    return output;
  }

  replaceCollectionNameInTemplate() {
    const output = file.replace(/{%COLLECTION_NAME%}/g, collectionName);
    return output;
  }

  replaceModelNameTransitInTemplate() {
    const output = file.replace(/{%MODELNAMETRANSIT%}/g, modelNameTransit);
    return output;
  }
}

module.exports = replacement;
