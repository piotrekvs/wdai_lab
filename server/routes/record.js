const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const recordRoutes = express.Router();

// Connect to database
const dbo = require('../db/conn');

// 
// 
// 
// 
// Dishes methods
recordRoutes.route('/restaurant_wdai/dishes').get(async function (_req, res) {
  const dbConnect = dbo.getDb();
  let limit;
  let offset;
  if (typeof _req.query.limit !== 'undefined' && typeof _req.query.offset !== 'undefined') {
    limit = parseInt(_req.query.limit);
    offset = parseInt(_req.query.offset);
  } else {
    res.status(400).send('Bad Request!');
  }

  const counter = await dbConnect.collection('dishes').countDocuments();
  dbConnect
    .collection('dishes')
    .find()
    .skip(offset)
    .limit(limit)
    .toArray(function (err, result) {
      if (err) {
        res.status(404).send('Error fetching listings! Not Found.');
      } else {
        res.json({ counter, dishes: result });
      }
    });
});

// Get product by _id
recordRoutes.route('/restaurant_wdai/dishes/:_id').get(async function (_req, res) {
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
recordRoutes.route('/restaurant_wdai/dishes/:id').delete((_req, res) => {
  const dbConnect = dbo.getDb();

  var filter = { id: _req.params.id };
  //var update = { $set: { deleted: true } };
  //var options = { upsert: true };

  console.log(filter);
  //console.log(update);
  //console.log(options);

  dbConnect
    .collection('dishes')
    .deleteOne(filter, function (err, _result) {
      if (err) {
        res.status(400).send(`Error deleting listing with id bad request!`);
      } else {
        console.log('1 document deleted');
        res.status(204).send();
      }
    });
});

// Post new product
recordRoutes.route('/restaurant_wdai/dishes/').post(function (_req, res) {
const dbConnect = dbo.getDb();
  const matchDocument = {
    id: _req.body.id,
    name: _req.body.name,
    cuisine: _req.body.cuisine,
    meal: _req.body.meal,
    category: _req.body.category,
    ingredients: _req.body.ingredients,
    quantity: _req.body.quantity,
    priceEuro: _req.body.priceEuro,
    description: _req.body.description,
    images: _req.body.images,
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

// 
// 
// 
// 
// REVIEWS
recordRoutes.route('/restaurant_wdai/reviews').get(async function (_req, res) {
  const dbConnect = dbo.getDb();
  let dishId;
  if (typeof _req.query.dishId !== 'undefined') {
    dishId = _req.query.dishId;
  } else {
    res.status(400).send('Bad Request!');
  }
  const counter = await dbConnect.collection('reviews').countDocuments({ dishId: dishId });
  dbConnect
    .collection('reviews')
    .find({ dishId: dishId})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json({counter, reviews: result});
      }
    });
});

recordRoutes.route('/restaurant_wdai/reviews').post(function (_req, res) {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    dishId: _req.body.dishId,
    id: _req.body.id,
    stars: _req.body.stars,
    nick: _req.body.nick,
    name: _req.body.name,
    text: _req.body.text,
    purchaseDate: _req.body.purchaseDate,
  };

  dbConnect
  .collection('reviews')
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting matches!');
      } else {
        console.log(`Added a new review with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});



module.exports = recordRoutes;
