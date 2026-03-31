import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import connectDB from "@/config/database";
import User, { IUser } from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // Add the following to request offline access all the time
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // CREDENTIALS LOGIN (solo usuarios demo)
    CredentialsProvider({
      name: "Demo Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await User.findOne({
          email: credentials.email.toLowerCase(),
        });

        if (!user) throw new Error("User not found");

        // Comparación simple para demo
        if (credentials.password !== user.password) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  callbacks: {
    //Invoked on successful sign in
    async signIn({ user, account, profile }) {
      // Si es Credentials, permitimos el paso directo (ya validamos en authorize)
      if (account?.provider === "credentials") {
        return true;
      }

      const googleProfile = profile as GoogleProfile;

      if (!googleProfile || !googleProfile.email) {
        return false;
      }
      //1- Connect to Data base
      await connectDB();
      //2- Check if user exists
      const userExists = await User.findOne({ email: googleProfile.email });
      //3- If not, create user
      if (!userExists) {
        //Truncate user name if too long
        const userName = googleProfile.name.slice(0, 20);

        await User.create({
          email: googleProfile.email,
          name: userName,
          image: googleProfile.picture,
        });
      }
      //4- Return true to allow sign in
      return true;
    },
    //Modify the session object
    async session({ session }) {
      if (!session.user?.email) return session;
      //1- Get the user from the database
      const user = await User.findOne({ email: session.user.email });
      //2- Asign user id to session
      if (user) {
        session.user.id = user._id.toString();
      }
      //3- Return session
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
