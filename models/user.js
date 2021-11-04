import clientPromise from "../lib/mongodb";
import { comparePassword } from '../lib/auth';

const mongodb = require('mongodb');

class User {
    constructor(username = 'a', email = 'a', password = 'a', _id = 0) {
        this.username = username;
        this.email = email;
        this.password = password;
        this._id = _id;
        this.coins = 500;
        this.totalBets = 0;
    }

    async getDb() {                     //returns the database.
        const client = await clientPromise;
        const db = await client.db('BetProject');
        return db;
    }

    async getDataByEmail() {
        const db = await this.getDb();
        const dbData = await db.collection('users').findOne({ email: this.email });
        const userData = {
            _id: dbData._id,
            username: dbData.username,
            email: dbData.email,
            coins: dbData.coins,
            totalBets: dbData.totalBets,
        }
        
        return userData;
    }

    async getDataById() {
        const db = await this.getDb();
        const dbData = await db.collection('users').findOne({ _id: new mongodb.ObjectId(this._id) });
        const userData = {
            _id: dbData._id,
            username: dbData.username,
            email: dbData.email,
            coins: dbData.coins,
            totalBets: dbData.totalBets,
        }

        return userData;
    }

    async verifyEmail() {               //returns 'true' and the psw if the email already exists, otherwise if it doesnt.
        const db = await this.getDb();
        const res = await db.collection('users').findOne({ email: this.email });

        if (res === null) {
            return {status: false};
        } else {
            return {status: true, psw: res.password};
        }
    }

    async verifyPassword() {            //returns 'true' if the password 
        const emlV = await this.verifyEmail();
        const dbPassword = emlV.psw
        const isValid = await comparePassword(this.password, dbPassword);
        return isValid;
    }

    async save() {                      //saves the user in the database.
        const db = await this.getDb();

        return db.collection('users')
                .insertOne(this)
                .catch(err => console.log(err));
    }

    async verifySignUp() {               //verifies if the sign up is possible.
        const emlV = await this.verifyEmail();
        const emailIsValid = emlV.status;

        if (!emailIsValid) {
            this.save();
            return {status: true}
        } else {
            return {status: false, cause: 'eml exists'}
        }
    }

    async verifyLogin() {               //verifies if the login is possible.
        const emlV = await this.verifyEmail();
        const emailIsValid = emlV.status;
        const userData = await this.getDataByEmail();

        if (emailIsValid) {
            const pswVer = await this.verifyPassword();
            if (pswVer) {    
                return {status: true, user: userData};
            } else {
                return {status: false, cause: 'wrong psw'}
            }
        } else {
            return {status: false, cause: 'eml dont exist'}
        }
    }
}

module.exports = User;
