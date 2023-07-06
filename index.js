const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  // Iteration 2
  .then(() => {
    const newRecipe = Recipe.create({
      title: "Curry Sausage",
      level: 'Easy Peasy',
      ingredients: ["sausage", "ketchup", "pommes", "curry",],
      cuisine: "German",
      dishType: "main_course",
      duration: 1,
      creator: "Alex",
  })
  })

  // Iteration 3
  .then( () => {
    return Recipe.insertMany(data)
  })

  .then( () => {
    console.log(Recipe.title)
  })

  // Iteration 4

  .then( () => {
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, // Search condition
    { $set: { duration: 100 } }, // Update operation
    { new: true } )
  })

  .then( () => {
    console.log('duration updated succsesfully')
  })

  // Iteration 5

  .then(() => {
    return Recipe.deleteOne({
      title: "Carrot Cake"
    })
  })
  
  .then(() => {
    console.log("Carrot Cake recipe deleted successfully!")
  })

  // Iteration 6

  .finally( () => {
    return mongoose.connection.close();
  })

  .then( () => {
    console.log('connection closed');
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });


   