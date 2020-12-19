import mongoose from 'mongoose';

interface IDrink {
    drinkId: String;
    name: String,
    price: String,
    priceAsDouble: Number,
    description: String
}

interface DrinkDoc extends mongoose.Document<any> {
    drinkId: String,
    name: String, 
    price: String,
    priceAsDouble: Number,
    description: String
}

interface DrinkModelInterface extends mongoose.Model<any> {
    build(drink: IDrink): DrinkDoc
}

const DrinkSchema = new mongoose.Schema({
    drinkId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    priceAsDouble: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, 
{collection: 'Drinks'});

const Drink = mongoose.model<DrinkDoc, DrinkModelInterface>('Drink', DrinkSchema);

export {Drink};