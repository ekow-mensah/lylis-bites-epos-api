import {Router, Request, Response} from 'express';
import { FoodRouter} from './food';
import {DrinkRouter} from './drinks';
import {UserRouter} from './users';
import { OrdersRouter } from './orders';


const routes = Router();

routes.use('/api/dishes', FoodRouter);
routes.use('/api/drinks', DrinkRouter);
routes.use('/api/users', UserRouter);
routes.use('/api/orders', OrdersRouter)

export {routes};