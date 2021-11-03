import hashPassword from '../../lib/auth';

const SignUp = require('../../models/signup');

export default async (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email;
        const psw = req.body.password;
        const hashedPsw = await hashPassword(psw);

        const user = new SignUp(email, hashedPsw);
        user.verifySignUp()
            .then(result => {
                return result;
            })
        res.status(202).json('works');
    }
}