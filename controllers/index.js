const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

// This function gets all contacts in the collection "contacts" in the database
const allContactsRoute = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
    
    result.toArray().then((contacts) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts); // I want to return every contact document
    });
};

// This function gets one contact in the collection "contacts" in the database, based on its id passed to the url.
const oneContactRoute = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({_id : userId});
        
    result.toArray().then((contact) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact[0]); // Returning a sigle contact.
    });
};

module.exports = {
    allContactsRoute,
    oneContactRoute
};