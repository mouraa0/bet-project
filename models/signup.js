import clientPromise from "../lib/mongodb";

class SignUp {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    async getDb() {                     //returns the database.
        const client = await clientPromise;
        const db = await client.db('BetProject');
        return db;
    }

    async verifyEmail() {               //returns 'true' if the email already exists, otherwise if it doesnt.
        const db = await this.getDb();
        const result = await db.collection('users').findOne({ email: this.email })
        console.log(result);

        if (result === null) {
            return false;
        } else {
            return true;
        }
    }

    async save() {
        const db = await this.getDb();

        return db.collection('users')
                .insertOne(this)
                .catch(err => console.log(err));
    }

    async verifySignUp() {                     //save the user in the database
        const emlVer = await this.verifyEmail();

        if (!emlVer) {
            this.save();
            return {status: true}
        } else {
            return {status: false, cause: 'eml exists'}
        }
    }
}

module.exports = SignUp;
