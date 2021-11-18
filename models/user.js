import clientPromise from "../lib/mongodb";
import { comparePassword } from '../lib/auth';

const mongodb = require('mongodb');

class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.coins = 500;
        this.totalBets = 0;
    }

    static async getDb() {                                                                      //returns the database.
        const client = await clientPromise;
        const db = await client.db('BetProject');
        
        return db;
    }

    async save() {                                                 //saves the user in the database.
        const db = await User.getDb();

        return db.collection('users')
                .insertOne(this)
                .catch(err => console.log(err));
    }

    static async getDataByEmail(passedEmail) {
        const db = await User.getDb();
        const dbData = await db.collection('users').findOne({ email: passedEmail });
        const userData = {
            _id: dbData._id,
            username: dbData.username,
            email: dbData.email,
            coins: dbData.coins,
            totalBets: dbData.totalBets,
        }
        
        return userData;
    }

    static async getDataById(passedId) {
        const db = await User.getDb();
        const userData = await db.collection('users').findOne({ _id: new mongodb.ObjectId(passedId) })
        return {
            _id: userData._id,
            username: userData.username,
        }
    }

    static async verifyEmail(passedEmail) {                                //returns 'true' and the psw if the email already exists, otherwise if it doesnt.
        const db = await User.getDb();
        const DbEmail = await db.collection('users').findOne({ email: passedEmail });

        if (!DbEmail) {
            return false;
        } else {
            return true;
        }
    }

    static async verifyPassword(passedEmail, passedPassword) {             //returns 'true' if the password is valid.
        const db = await User.getDb();
        const userData = await db.collection('users').findOne({ email: passedEmail });
        const DbPassword = userData.password;
        const isPasswordValid = await comparePassword(passedPassword, DbPassword);
        
        return isPasswordValid;
    }

    static async verifyLogin(passedEmail, passedPassword) {               //verifies if the login is possible.
        const isEmailInDb = await this.verifyEmail(passedEmail);

        if (isEmailInDb) {
            const isPasswordValid = await this.verifyPassword(passedPassword);
            if (isPasswordValid) {    

                return {status: true}
            } else {
                return {status: false, cause: 'psw'}
            }
        } else {
            return {status: false, cause: 'eml'}
        }
    }
}

module.exports = User;
