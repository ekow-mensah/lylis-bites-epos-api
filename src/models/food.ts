import mongoose from 'mongoose';

interface IFood {
    foodId: string;
    name: string; 
    price: string;
    priceAsDouble: Number;
    description: string;
}


interface FoodDoc extends mongoose.Document<any> {
    foodId: string;
    name: string; 
    price: string;
    priceAsDouble: Number;
    description: string;
}

 interface FoodModelInterface extends mongoose.Model<any> {
     build(food: IFood): FoodDoc
 }

const FoodSchema = new mongoose.Schema({
    foodId: {
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

    priceAsDouble:  {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: false
    },

}, 
{collection: 'Food'});

const Food = mongoose.model<FoodDoc, FoodModelInterface>('Food', FoodSchema);

export {Food};