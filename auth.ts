import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/lib/models/user";
import {connectDB} from "@/lib/mongoose";

export const {handlers, auth, signIn, signOut} = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        Credentials({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            authorize: async (credentials) => {
                await connectDB();

                const user = await User.findOne({email: credentials.email});
                if (!user) throw new Error("کاربر یافت نشد");

                const isValid = await bcrypt.compare(credentials.password as string, user.password);
                if (!isValid) throw new Error("رمز عبور اشتباه است");

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],

    session: {strategy: "jwt"},

    callbacks: {
        async signIn({user, account}) {
            await connectDB();

            if (account?.provider === "google") {
                let existingUser = await User.findOne({email: user.email});

                if (!existingUser) {
                    existingUser = await User.create({
                        name: user.name,
                        email: user.email,
                        role: "customer",
                        password: null,
                    });
                }
            }
            return true;
        },
        async jwt({token}) {
            await connectDB();

            const dbUser = await User.findOne({email: token.email});
            if (dbUser) {
                token.role = dbUser.role;
                token.id = dbUser._id
            }
            return token;
        },

        async session({session, token}) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role as string;
            }
            return session;
        }
    },

    pages: {
        signIn: "/auth/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
});
