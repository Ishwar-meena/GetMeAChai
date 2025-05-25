// lib/authOptions.js
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import connectDB from "@/db/connectDb";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                const client = await connectDB();
                const currentUser = await User.findOne({ email: user.email });
                if (!currentUser) {
                    const newUser = new User({
                        email: user.email,
                        username: user.name.replaceAll(" ", ""),
                        avatar: user.image,
                    })
                    await newUser.save();
                }
            } catch (error) {
                console.log(error.message);
            }
            return true
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};
