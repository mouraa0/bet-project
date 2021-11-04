import User from '../../models/user';

export default async (req, res) => {
    if (req.method === 'POST') {
        const id = req.body.id;
        const user = new User('a','a','a', id);
        const result = await user.getDataById();
        res.status(202).json(result);
    }
}