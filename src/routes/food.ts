import express from 'express'
import {Food} from '../models/food';

const router = express.Router();

router.get('/', [], async(req ,res) => {
 const dishes = await Food.find({});
 return res.status(200).json(dishes);
});

router.get('/:foodId', async(req, res) => {
    const foodId = req.params.foodId;
    const dish = await Food.findOne({foodId: foodId});
    return res.status(200).json(dish);
});

router.post('/', async(req, res) => {
    const {foodId, name, price, priceAsDouble, description} = req.body;
    
    const dish = Food.build({
        foodId, 
        name,
        price,
        priceAsDouble,
        description
    });

    await dish.save();

    return res.status(201).json(dish);
});

router.patch('/:foodId}', async(req, res) => {
    const {foodId, name, price, priceAsDouble, description} = req.body;

    const dishToUpdate = Food.findOne({
        foodId: foodId
    });

    await dishToUpdate.update({
        foodId: foodId, 
        name: name,
        price: price,
        priceAsDouble: priceAsDouble,
        description: description
    });

    return res.status(204).json(dishToUpdate);
});

router.delete(':/foodId', async(req, res) => {
    const foodId = req.params.foodId;

    const dish = await Food.findOneAndDelete({
        foodId: foodId
    });

    return res.status(204).json(dish);
});

export {router as FoodRouter};