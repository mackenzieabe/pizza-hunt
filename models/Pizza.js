const { Schema, model } = require('mongoose');
//Of course, because we're using a function that doesn't exist in this file, make sure you've imported it at the top of the file with the following code:
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String,
        required: true,
        trim: true
    }, //Just like Sequelize, when the required field option in Mongoose is set to true, it will require data to exist for that field. Also notice the trim option that's been added, which works just like the JavaScript .trim() method and removes white space before and after the input string. You'll find that useful when working with username and password data.
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    //pro-tip: With Mongoose's required field, you can actually provide a custom error message. Simply use the following syntax, and the user will receive your custom message instead of the generic "required" message:
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
        //In programming, a getter is typically a special type of function that takes the stored data you are looking to retrieve and modifies or formats it upon return. Think of it like middleware for your data!
        //To use a getter in Mongoose, we just need to add the key get to the field we are looking to use it with in the schema. 
    },
    size: {
        type: String,
        required: true,
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        //In this example, the enum option stands for enumerable, a popular term in web development that refers to a set of data that can be iterated over—much like using the for...in loop to iterate through an object.
        default: 'Large'
    },
    toppings: [],

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
    {//we need to tell the schema that it can use virtuals.
        toJSON: {
            virtuals: true,
            //Now again, we'll need to tell the Mongoose model that it should use any getter function we've specified. 
            getters: true
        },
        id: false
    }

);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
    //In its basic form, .reduce() takes two parameters, an accumulator and a currentValue.
    //As .reduce() walks through the array, it passes the accumulating total and the current value of comment into the function, with the return of the function revising the total for the next iteration through the array.

});

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;