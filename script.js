const fs = require("fs");
const dataArray = require("./config.js");

// Name of DB used for now
const dbName = dataArray[0];
const collectionName = dataArray[1];
const modelNameTransit = collectionName.slice(0, collectionName.length - 1);
const modelName = modelNameTransit[0].toLocaleUpperCase() + modelNameTransit.slice(1);
const schemaName = modelNameTransit + "Schema";

// 1°) Create a directory for the new project and the various directories that we are going to need.
const newProjectDir = "./new_project";
if (!fs.existsSync(newProjectDir)) {
  fs.mkdirSync(newProjectDir);
}

const newRoutersDir = "./new_project/routes";
if (!fs.existsSync(newRoutersDir)) {
  fs.mkdirSync(newRoutersDir);
}

const newUtilDir = "./new_project/utils";
if (!fs.existsSync(newUtilDir)) {
  fs.mkdirSync(newUtilDir);
}

const newControllersDir = "./new_project/controllers";
if (!fs.existsSync(newControllersDir)) {
  fs.mkdirSync(newControllersDir);
}

const newModelDir = "./new_project/models";
if (!fs.existsSync(newModelDir)) {
  fs.mkdirSync(newModelDir);
}

// 2°) Read the template that are going to be used to create our files
let serverTemplate = fs.readFileSync(`${__dirname}/templates/server_template.txt`, "utf-8");
let appTemplate = fs.readFileSync(`${__dirname}/templates/app_template.txt`, "utf-8");
let routerTemplate = fs.readFileSync(`${__dirname}/templates/router_template.txt`, "utf-8");
let apiFeaturesTemplate = fs.readFileSync(`${__dirname}/templates/api_features_template.txt`, "utf-8");
let controllerTemplate = fs.readFileSync(`${__dirname}/templates/controller_template.txt`, "utf-8");
let modelTemplate = fs.readFileSync(`${__dirname}/templates/model_template.txt`, "utf-8");
let packageJsonTemplate = fs.readFileSync(`${__dirname}/templates/package_json_template.txt`, "utf-8");
let prettierTemplate = fs.readFileSync(`${__dirname}/templates/prettier_template.txt`, "utf-8");
let dotenvTemplate = fs.readFileSync(`${__dirname}/templates/dotenv_template.txt`, "utf-8");

// 3°) We create a functions that replaces the placeholders by the name of our DB.
const replaceDbNameInTemplate = function (file) {
  const output = file.replace(/{%NAME_OF_DB%}/g, dbName);
  return output;
};
const replaceModelNameInTemplate = function (file) {
  const output = file.replace(/{%MODEL_NAME%}/g, modelName);
  return output;
};
const replaceSchemaNameInTemplate = function (file) {
  const output = file.replace(/{%SCHEMA_NAME%}/g, schemaName);
  return output;
};

const replaceCollectionNameInTemplate = function (file) {
  const output = file.replace(/{%COLLECTION_NAME%}/g, collectionName);
  return output;
};

const replaceModelNameTransitInTemplate = function (file) {
  const output = file.replace(/{%MODELNAMETRANSIT%}/g, modelNameTransit);
  return output;
};

modelTemplate = replaceModelNameInTemplate(modelTemplate);
modelTemplate = replaceSchemaNameInTemplate(modelTemplate);
dotenvTemplate = replaceDbNameInTemplate(dotenvTemplate);
appTemplate = replaceCollectionNameInTemplate(appTemplate);
appTemplate = replaceModelNameTransitInTemplate(appTemplate);
controllerTemplate = replaceModelNameTransitInTemplate(controllerTemplate);
controllerTemplate = replaceCollectionNameInTemplate(controllerTemplate);
controllerTemplate = replaceModelNameInTemplate(controllerTemplate);
packageJsonTemplate = replaceDbNameInTemplate(packageJsonTemplate);
routerTemplate = replaceModelNameTransitInTemplate(routerTemplate);
routerTemplate = replaceModelNameInTemplate(routerTemplate);

// 4°) Write the files that we are going to need
fs.writeFileSync(`${__dirname}/new_project/server.js`, serverTemplate);
fs.writeFileSync(`${__dirname}/new_project/app.js`, appTemplate);
fs.writeFileSync(`${__dirname}/new_project/routes/${modelNameTransit}Routes.js`, routerTemplate);
fs.writeFileSync(`${__dirname}/new_project/utils/apiFeatures.js`, apiFeaturesTemplate);
fs.writeFileSync(`${__dirname}/new_project/controllers/${modelNameTransit}Controller.js`, controllerTemplate);
fs.writeFileSync(`${__dirname}/new_project/models/${modelNameTransit}Model.js`, modelTemplate);
fs.writeFileSync(`${__dirname}/new_project/package.json`, packageJsonTemplate);
fs.writeFileSync(`${__dirname}/new_project/.prettierrc`, prettierTemplate);
fs.writeFileSync(`${__dirname}/new_project/config.env`, dotenvTemplate);
