const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

// This function gets all contacts in the collection "contacts" in the database
const allContactsRoute = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("contacts").find();

    result.toArray().then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts); // I want to return every contact document
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// This function gets one contact in the collection "contacts" in the database, based on its id passed to the url.
const oneContactRoute = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .find({ _id: userId });

    result.toArray().then((contact) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contact[0]); // Returning a sigle contact.
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// This function creates a new contact
const createContact = async (req, res, next) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the contact."
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// This function updates a contact
const updateContact = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .replaceOne({ _id: userId }, contact);
    
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// This function deletes a contact
const deleteContact = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .findOneAndDelete({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the contact."
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  allContactsRoute,
  oneContactRoute,
  createContact,
  updateContact,
  deleteContact,
};
