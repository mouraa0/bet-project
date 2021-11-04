import { hashPassword } from '../../../lib/auth';

const User = require('../../../models/user');

export default async (req, res) => {
    if (req.method === 'POST') {
        const username = req.body.username;
        const email = req.body.email;
        const psw = req.body.password;
        const hashedPsw = await hashPassword(psw);

        const user = new User(username, email, hashedPsw);
        user.verifySignUp()
            .then(result => {
                return result;
            })
        res.status(202).json('works');
    }
}