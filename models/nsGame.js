import clientPromise from "../lib/mongodb";
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

class NsGame {
    constructor(_id, status, date, awayTeam, homeTeam, odds) {
        this._id = new ObjectId(_id);
        this.status = status;
        this.date = date;
        this.awayTeam = awayTeam;
        this.homeTeam = homeTeam;
        this.odds = odds;
    }

    static async getDb() {
        const client = await clientPromise;
        const db = await client.db('BetProject');
        
        return db;
    }

    async save() {
        const db = await NsGame.getDb();

        return db.collection('games')
                .insertOne(this)
                .catch(err => console.log(err));
    }

    static async findGameById(passedId) {
        const db = await NsGame.getDb();
        const isGameInDb = await db.collection('games').findOne({ _id: new ObjectId(passedId)} );
        
        if (isGameInDb) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = NsGame;
