import {Router} from 'express';
import {User} from '../models/user';
import bcrypt from 'bcrypt';

const UserRouter = Router();


UserRouter.get('/', async(req, res) => {
    const users = await User.find({});
    return res.status(200).json(users);
});

UserRouter.post('/', async(req, res) => {
    const {userId, username, password, userole} = req.body;

    const hashedPassword = await hashPassword(password); 
    if (hashedPassword === "error") {
        res.status(500).json("Could not create user. An error occurred.");
    } else {
        const user = User.build({
            userId: userId,
            username: username,
            password: hashedPassword,
            userole: userole
        });

        await user.save();

        return res.status(201).json(user);
    }
});


UserRouter.patch('/:userId', async(req, res) => {
    const userId = req.params.userId;
    const {username, password} = req.body;

    const user = await User.findOne({
        userId: userId
    });

    const newHashedPassowrd = await hashPassword(password);

    if (newHashedPassowrd === "error") {
        return res.status(500).json("Could not update user. An error occured.");
    } else {
        await user.update({
            username: username,
            password: newHashedPassowrd
        });
    }
    
    return res.status(204).json(user);

});


const hashPassword = async(plainPassword:string,) => {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(plainPassword, salt);
    } catch(error) {
        console.error(error);
    }

    return "error";
}

export {UserRouter};