import {Router} from 'express';
import { Drink } from '../models/drink';
import { Food } from '../models/food';
import {Order} from '../models/order';

const OrdersRouter = Router();

OrdersRouter.get('/', async(req, res) => {
    const orders = await Order.find({});
    return res.status(200).json(orders);
});

OrdersRouter.get('/:orderId', async(req, res) => {
    const orderId = req.params.orderId;
    const order = await Order.findOne({
        orderId: orderId
    });

    return res.status(200).json(order);
});

OrdersRouter.post('/', async(req, res) => {
    const {orderId, foodIds, drinkIds, timestamp } = req.body;
    
    const foodsArray: Array<typeof Food> = [];
    const drinksArray: Array<typeof Drink> = [];

    for (let foodId of foodIds) {
        const food = await Food.findOne({
            foodId: foodId
        });
        foodsArray.push(food);
    }

    for (let drinkId of drinkIds) {
        const drink = await Drink.findOne({
            drinkId: drinkId
        });
        drinksArray.push(drink);
    }

    const order = Order.build({
        orderId: orderId,
        food: foodsArray,
        drink: drinksArray,
        timestamp: new Date()
    });

    await order.save();

    return res.status(200).json(order);

});

OrdersRouter.delete('/:orderId', async(req, res) => {
    const orderId = req.params.orderId;

    const order = await Order.findOneAndDelete({
        orderId: orderId
    });

    return res.status(200).json(order);
});

export {OrdersRouter};