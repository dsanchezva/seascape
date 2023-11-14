// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const path = require("path")

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials");

const app = express();

// Configuración para servir archivos estáticos (imágenes, CSS, etc.)
app.use(express.static(path.join(__dirname, "public")));

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "Sea Scape";

app.locals.appTitle = `${capitalize(projectName)}`;

// 👇 Start handling routes here
const {
  infoLocals,
  infoLocalsAdmin,
} = require("./middlewares/auth.middleware.js");
const indexRoutes = require("./routes/index.routes");
app.use("/", infoLocals, infoLocalsAdmin, indexRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
