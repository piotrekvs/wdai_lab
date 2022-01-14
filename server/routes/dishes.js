const express = require('express');
// const ObjectID = require('mongodb').ObjectID;
const dishesRoutes = express.Router();

// Connect to database
const dbo = require('../db/conn');

// 
// 
// 
// 
// DISHES
// Get dishes
dishesRoutes.route('/restaurant_wdai/dishes').get(async function (_req, res) {
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

// Get dish by id
dishesRoutes.route('/restaurant_wdai/dishes/:id').get(async function (_req, res) {
  const dbConnect = dbo.getDb();
  let filter = { id: _req.params.id };

  dbConnect
    .collection('dishes')
    .findOne(filter, function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

// Delete dish by id
dishesRoutes.route('/restaurant_wdai/dishes/:id').delete((_req, res) => {
  const dbConnect = dbo.getDb();
  let filter = { id: _req.params.id };

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

// Post new dish
dishesRoutes.route('/restaurant_wdai/dishes/').post(function (_req, res) {
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
// Get Reviews
dishesRoutes.route('/restaurant_wdai/reviews').get(async function (_req, res) {
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

// Post review
dishesRoutes.route('/restaurant_wdai/reviews').post(function (_req, res) {
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



module.exports = dishesRoutes;
