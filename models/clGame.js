import clientPromise from "../lib/mongodb";
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

class ClGame {
    constructor(_id, status, date, awayTeam, homeTeam, score) {
        this._id = new ObjectId(_id);
        this.status = status;
        this.date = date;
        this.awayTeam = awayTeam;
        this.homeTeam = homeTeam;
        this.score = score;
    }

    static async getDb() {
        const client = await clientPromise;
        const db = await client.db('BetProject');
        
        return db;
    }

    async save() {
        const db = await ClGame.getDb();

        return db.collection('CLgames')
                .insertOne(this)
                .catch(err => console.log(err));
    }

    static async findGameById(passedId) {
        const db = await ClGame.getDb();
        const isGameInDb = await db.collection('CLgames').findOne({ _id: new ObjectId(passedId)} );
        
        if (isGameInDb) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = ClGame;
