import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Add the following to request offline access all the time
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //Invoked on successful sign in
    async signIn({ profile }) {
      //1- Connect to Data base
      //2- Check if user exists
      //3- If not, create user
      //4- Return true to allow sign in
    },
    //Modify the session object
    async session({ session }) {
      //1- Get the user from the database
      //2- Asign user id to session
      //3- Return session
    },
  },
};
