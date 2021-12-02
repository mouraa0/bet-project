import clientPromise from "../lib/mongodb";

class Logos {
    static async getDb() {
        const client = await clientPromise;
        const db = await client.db('BetProject');
        
        return db;
    }
    
    static async getLogoCorrect(team) {
        const db = await Logos.getDb();
        const teamId = team.id;
        const teamInfo = await db.collection('logos').findOne({id: teamId.toString()});
        
        team.logo = teamInfo.logo
        
        return team;
    }
}

module.exports = Logos;
