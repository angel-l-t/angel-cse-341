const routes = require("express").Router();
const routesControllers = require("../controllers");

// Calling functions in specified paths
//This two are to get all contacts or one contact
routes.get("/", routesControllers.allContactsRoute);
routes.get("/:id", routesControllers.oneContactRoute);

//Create a new contact
routes.post("/", routesControllers.createContact);

//Update existing contact
routes.put("/:id", routesControllers.updateContact);

//Delete existing contact
routes.delete("/:id", routesControllers.deleteContact);

module.exports = routes;
