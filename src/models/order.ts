import mongoose from 'mongoose';
import {Food} from './food';
import {Drink} from './drink';

interface IOrder {
    orderId: number;
    food: Array<typeof Food>;
    drink: Array<typeof Drink>;
    timestamp: Date;
}

interface OrderDoc extends mongoose.Document<any> {
    orderId: number;
    food: Array<typeof Food>;
    drink: Array<typeof Drink>;
    timestamp: Date;
}

interface OrderModelInterface extends mongoose.Model<any> {
    build(order: IOrder);
}

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true
    },

    food: {
        ref: 'Food',
        type: mongoose.Schema.Types.ObjectId
    },

    drink: {
        ref: 'Drink',
        type: mongoose.Schema.Types.ObjectId 
    },

    timestamp: {
        type: Date, 
        required: true
    }
});

const Order = mongoose.model<OrderDoc, OrderModelInterface>('Order', OrderSchema);

export {Order};