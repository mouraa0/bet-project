import NextAuth from "next-auth";
import Providers from "next-auth/providers";
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

                const user = await new User('a', email, password);
                const result = await user.verifyLogin();
                const userData = result.user
                
                if (!result.status) {
                    throw new Error(result.cause);
                }

                return { name: userData };
            }
        })
    ]
});
