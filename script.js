const fs = require("fs");

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
const serverTemplate = fs.readFileSync(`${__dirname}/templates/server_template.txt`, "utf-8");
const appTemplate = fs.readFileSync(`${__dirname}/templates/app_template.txt`, "utf-8");
const routerTemplate = fs.readFileSync(`${__dirname}/templates/router_template.txt`, "utf-8");
const apiFeaturesTemplate = fs.readFileSync(`${__dirname}/templates/api_features_template.txt`, "utf-8");
const controllerTemplate = fs.readFileSync(`${__dirname}/templates/controller_template.txt`, "utf-8");
const modelTemplate = fs.readFileSync(`${__dirname}/templates/model_template.txt`, "utf-8");
const packageJsonTemplate = fs.readFileSync(`${__dirname}/templates/package_json_template.txt`, "utf-8");
const prettierTemplate = fs.readFileSync(`${__dirname}/templates/prettier_template.txt`, "utf-8");
const dotenvTemplate = fs.readFileSync(`${__dirname}/templates/dotenv_template.txt`, "utf-8");

// 3°) Write the files that we are going to need
fs.writeFileSync(`${__dirname}/new_project/server.js`, serverTemplate);
fs.writeFileSync(`${__dirname}/new_project/app.js`, appTemplate);
fs.writeFileSync(`${__dirname}/new_project/routes/planeRoutes.js`, routerTemplate);
fs.writeFileSync(`${__dirname}/new_project/utils/apiFeatures.js`, apiFeaturesTemplate);
fs.writeFileSync(`${__dirname}/new_project/controllers/planeController.js`, controllerTemplate);
fs.writeFileSync(`${__dirname}/new_project/models/planeModel.js`, modelTemplate);
fs.writeFileSync(`${__dirname}/new_project/package.json`, packageJsonTemplate);
fs.writeFileSync(`${__dirname}/new_project/.prettierrc`, prettierTemplate);
fs.writeFileSync(`${__dirname}/new_project/config.env`, dotenvTemplate);
