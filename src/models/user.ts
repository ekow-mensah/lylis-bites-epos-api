import mongoose, { Mongoose } from 'mongoose';

interface IUser {
    userId: string;
    username: string;
    password: string;
    userole: string;
}

interface UserDoc extends mongoose.Document<any> {
    userId: string;
    username: string;
    password: string;
    userole: string;
}

interface UserModelInterface extends mongoose.Model<any> {
    build(user: IUser);
}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    userole: {
        type: String,
        required: true
    }
});

const User = mongoose.model<UserDoc, UserModelInterface>('User', UserSchema);

export {User};