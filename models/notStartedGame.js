import clientPromise from "../lib/mongodb";
const mongodb = require('mongodb');


class NotStartedGame {
    constructor(_id, status, date, awayTeam, homeTeam, odds) {
        this._id = _id;
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
        const db = await NotStartedGame.getDb();

        return db.collection('games')
                .insertOne(this)
                .catch(err => console.log(err));
    }

    static async findGameById(passedId) {
        const db = await NotStartedGame.getDb();
        const isGameInDb = await db.collection('games').findOne({ _id: passedId } );
        
        if (isGameInDb) {
            return true;
        } else {
            return false;
        }
    }
    
    static async deleteGameById(passedId) {
        const db = await NotStartedGame.getDb();
        return db.collection('games').deleteOne({_id: passedId});
    }
}

module.exports = NotStartedGame;
