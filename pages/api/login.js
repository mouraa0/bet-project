import Router from 'next/router';
import clientPromisse from '../../lib/mongodb';

export default async (req, res) => {
    const email = req.body.email;
    const psw = req.body.password;
    const user = {
        email: email,
        password: psw,
    }

    res.send()

    // return db.collections('users')
    //         .insertMany(user)
    //         .then(result => console.log(result))
    //         .catch(err => console.log(err))

    res(Router.push('/'));
};
