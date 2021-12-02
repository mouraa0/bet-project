import clientPromise from "../lib/mongodb";
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

class ClosedGame {
    constructor(_id, status, date, awayTeam, homeTeam, score) {
        this._id = _id;
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
        const db = await ClosedGame.getDb();

        return db.collection('CLgames')
                .insertOne(this)
                .catch(err => console.log(err));
    }

    static async findGameById(passedId) {
        const db = await ClosedGame.getDb();
        const isGameInDb = await db.collection('CLgames').findOne({ _id: passedId } );
        
        if (isGameInDb) {
            return true;
        } else {
            return false;
        }
    }

    static async deleteGameById(passedId) {
        const db = await ClosedGame.getDb();
        return db.collection('CLgames').deleteOne({_id: passedId});
    }
}

module.exports = ClosedGame;
