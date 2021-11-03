import NextAuth from "next-auth";
import Providers from "next-auth/providers";
// import { comparePassword } from "../../../lib/auth";
// import clientPromise from "../../../lib/mongodb";
import User from '../../../models/user';

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const email = credentials.email;
                const password = credentials.password;

                const user = await new User(email, password);
                const result = await user.verifyLogin();
                
                if (!result.status) {
                    throw new Error(result.cause);
                }

                return { email: email };
            }
        })
    ]
});