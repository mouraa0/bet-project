import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    const client = await clientPromise;
    const db = await client.db();

    const teste = await db
        .collection('users')
        .find({})
            .then(res.json(teste))
};
