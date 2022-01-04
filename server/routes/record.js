const express = require('express');
const ObjectID = require('mongodb').ObjectID;

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This section will help you get a list of all the records.
// Get all products with limit, offset and filters
recordRoutes.route('/restaurant_wdai/dishes').get(async function (_req, res) {
  const dbConnect = dbo.getDb();
  var limit = 20;
  var offset = 0;
  if (typeof _req.query.limit !== 'undefined')
    limit = parseInt(_req.query.limit);
  if (typeof _req.query.offset !== 'undefined')
    offset = parseInt(_req.query.offset);

  var cnt = 0;
  // dbConnect
  //   .collection('dishes')
  //   .count({"deleted": false }, function (err, result) {
  //     if (err) {
  //       res.status(400).send('Error fetching listings!');
  //     }
  //     else {
  //       cnt = result
  //       // res.json({"count": result.length});
  //     }
  //   });

  console.log(limit);
  console.log(offset);
  dbConnect
    .collection('dishes')
    .find() //{"deleted": false })
    .skip(offset) // for pagination
    .limit(limit)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json({ count: cnt, dishes: result });
      }
    });
});

// Get product by _id
recordRoutes.route('/restaurant/dishes/:_id').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  console.log(_req.params._id);
  dbConnect
    .collection('dishes')
    .findOne({ _id: new ObjectID(_req.params._id) }, function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

// Delete product by _id
recordRoutes.route('/restaurant/dishes/:_id').put((_req, res) => {
  const dbConnect = dbo.getDb();

  var filter = { _id: new ObjectID(_req.params._id) };
  var update = { $set: { deleted: true } };
  var options = { upsert: true };

  console.log(filter);
  console.log(update);
  console.log(options);

  dbConnect
    .collection('dishes')
    .updateOne(filter, update, options, function (err, _result) {
      if (err) {
        res.status(400).send(`Error deleting listing with id bad request!`);
      } else {
        console.log('1 document deleted');
        res.status(204).send();
      }
    });
});

// Post new product
recordRoutes.route('/restaurant/dishes/').post(function (_req, res) {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    name: _req.body.name,
    cuisineType: _req.body.cuisineType,
    type: _req.body.type,
    category: _req.body.category,
    ingredients: _req.body.ingredients,
    maxPerDay: _req.body.maxPerDay,
    priceEuro: _req.body.priceEuro,
    description: _req.body.description,
    imagesURL: _req.body.imagesURL,
    deleted: false,
  };

  dbConnect
    .collection('dishes')
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting matches!');
      } else {
        console.log(`Added a new dish with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});

// This section will help you create a new record.
recordRoutes.route('/listings/recordSwipe').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    listing_id: req.body.id,
    last_modified: new Date(),
    session_id: req.body.session_id,
    direction: req.body.direction,
  };

  dbConnect
    .collection('matches')
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting matches!');
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});

// This section will help you update a record by id.
recordRoutes.route('/listings/updateLike').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const listingQuery = { _id: req.body.id };
  const updates = {
    $inc: {
      likes: 1,
    },
  };

  dbConnect
    .collection('listingsAndReviews')
    .updateOne(listingQuery, updates, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error updating likes on listing with id ${listingQuery.id}!`);
      } else {
        console.log('1 document updated');
      }
    });
});

// This section will help you delete a record.
recordRoutes.route('/listings/delete/:id').delete((req, res) => {
  const dbConnect = dbo.getDb();
  const listingQuery = { listing_id: req.body.id };

  dbConnect
    .collection('listingsAndReviews')
    .deleteOne(listingQuery, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
      } else {
        console.log('1 document deleted');
      }
    });
});

module.exports = recordRoutes;
