import clientPromise from "../lib/mongodb";

class SignUp {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    async save() {
        const client = await clientPromise;
        const db = await client.db('BetProject');
        
        return db.collection('users')
                .insertOne(this)
                .catch(err => console.log(err));
    }
}

module.exports = SignUp;
