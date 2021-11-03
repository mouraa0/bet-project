import { hashPassword } from '../../../lib/auth';

const User = require('../../../models/user');

export default async (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email;
        const psw = req.body.password;
        const hashedPsw = await hashPassword(psw);

        const user = new User(email, hashedPsw);
        user.verifySignUp()
            .then(result => {
                return result;
            })
        res.status(202).json('works');
    }
}