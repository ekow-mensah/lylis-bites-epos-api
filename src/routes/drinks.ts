import {Router} from 'express';
import {Drink} from '../models/drink';

const drinkRouter = Router();

drinkRouter.get('/', async(req, res) =>{
    const drinks = await Drink.find({});
    return res.status(200).json(drinks);
});

drinkRouter.get('/:drinkId', async(req, res) => {
    const drinkId = req.params.drinkId;

    const drink = await Drink.findOne({
        drinkId: drinkId
    });

    return res.status(200).json(drink);
});

drinkRouter.post('/', async(req, res) => {
    const {drinkId, name, price, priceAsDouble, description} = req.body;

    const drink = Drink.build({
        drinkId: drinkId,
        name: name,
        price: price,
        priceAsDouble: priceAsDouble,
        description: description
    });

    await drink.save();

    return res.status(201).json(drink);
});


drinkRouter.patch('/:drinkId', async(req, res) => {
    const {drinkId, name, price, priceAsDouble, description} = req.body;

    const drink = Drink.findOne({
        drinkId: drinkId
    });

    await drink.update({
        drinkId: drinkId,
        name: name,
        price: price,
        priceAsDouble: priceAsDouble,
        description: description
    });

    return res.status(204).json(drink);
});

drinkRouter.delete('/:drinkId', async(req, res) => {
    const drinkId = req.params.drinkId;

    const drink = await Drink.findOneAndDelete({
        drinkId: drinkId
    });

    return res.status(204).json(drinkId);
});

export {drinkRouter as DrinkRouter};