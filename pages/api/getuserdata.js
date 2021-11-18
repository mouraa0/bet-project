import User from '../../models/user';

export default async (req, res) => {
    if (req.method === 'POST') {
        const id = req.body.id;
        const userData = await User.getDataById(id);

        return res.json(userData);
    }
};
