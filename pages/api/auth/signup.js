import { hashPassword } from '../../../lib/auth';

const User = require('../../../models/user');

export default async (req, res) => {
    if (req.method === 'POST') {
        const username = req.body.username;
        const email = req.body.email;
        const psw = req.body.password;

        const hashedPsw = await hashPassword(psw);

        const user = new User(username, email, hashedPsw);

        const isEmailInDb = await User.verifyEmail(email);

        if (!isEmailInDb) {
            user.save()
            
            return res.json({
                status: true,
                msg: '',
            });
        } else {
            return res.json({
                status: false,
                msg: 'Email already registered :('
            })
        }

        // user.verifySignUp()
        //     .then(result => {
        //         if (result) {
        //             return res.json({
        //                 status: true,
        //                 msg: ''
        //             })
        //         } else {
        //             return res.json({
        //                 status: false,
        //                 msg: 'Email already exists :('
        //             })
        //         }
        //     })
        //     .catch(err => console.log(err));
    }
};
