import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    const client = await clientPromise;
    const db = await client.db('BetProject');

    const gamesData = await db.collection('games').find({}).toArray();

    res.json(gamesData);
};
