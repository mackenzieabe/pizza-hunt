const { Pizza } = require('../models');

const pizzaController = {
  // get all pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-_v')
      .sort({ _id: -1 })
      //Mongoose has a .sort() method to help with this. After the .select() method, use .sort({ _id: -1 }) to sort in DESC order by the _id value. 
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one pizza by id
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'//path
      })
      .select('-__v')
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // createPizza
  createPizza({ body }, res) {
    Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.json(err));
  },

  // update pizza by id
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      //By setting the parameter to true, we're instructing Mongoose to return the new version of the document.
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete pizza
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = pizzaController;
