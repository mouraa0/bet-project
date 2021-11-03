import clientPromise from "../../lib/mongodb";
const SignUp = require('../../models/signup');

export default async (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email;
        const psw = req.body.password;
        const user = new SignUp(email, psw);
        user.save();
    } else {
        res.status(200).json({message: 'yeayeaye'})
    }
};