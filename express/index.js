const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const {
  allowCrossOriginAccess,
} = require("./server/utilities/allow_cross_origin_access");
const authenticationRoutes = require("./server/routers/authentication_router");
const apiRoutes = require("./server/routers/api_router");
const authenticationCheck = require("./server/utilities/authentication_check");
const { connectToMongo } = require("./server/models");
const { APP_ROUTES } = require("./server/constants/routes_constants");
const { APP } = require("./server/constants/app_constants");
const { logger } = require("./server/utilities/logger");

// Application init
const app = express();

// TODO: Add logger
// Connect to MongoDB
connectToMongo();

// Parse application/json
app.use(bodyParser.json({ extended: false }));

// Allow cross origin access
app.use(allowCrossOriginAccess);

// Routing for authentication related functions
app.use(APP_ROUTES.AUTHENTICATION, authenticationRoutes);

// Check authentication token on any /api routes
app.use(APP_ROUTES.API, authenticationCheck);

// Routing for api related functions
app.use(APP_ROUTES.API, apiRoutes);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(config.APPLICATION.APPLICATION_PORT, () =>
  logger.info(`${APP.LISTEN_STRING} ${config.APPLICATION.APPLICATION_PORT}`)
);
