import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user?: {
            id?: string;
            role?: string;
        } & DefaultSession["customer"];
    }

    interface User extends DefaultUser {
        role?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
    }
}
