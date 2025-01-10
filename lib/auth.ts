import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import dbConnect from './dbConnect'
import UserModel from './models/UserModel'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { useRouter, useSearchParams } from 'next/navigation'


export const config = {
  providers: [
    // CredentialsProvider({
    //   credentials: {
    //     email: {
    //       type: 'email',
    //     },
    //     password: { type: 'password' },
    //   },
    //   async authorize(credentials) {
    //     await dbConnect()
    //     if (credentials == null) return null

    //     const user = await UserModel.findOne({ email: credentials.email })

    //     if (user) {
    //       const isMatch = await bcrypt.compare(
    //         credentials.password as string,
    //         user.password
    //       )
    //       if (isMatch) {
    //         return user
    //       }
    //     }
    //     return null
    //   },
    // }),
    GoogleProvider(
      {
        clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      
    )
  ],
  pages: {
    signIn: '/signin',
    newUser: '/register',
    error: '/signin',
  },
  callbacks: {
    signIn: async ({profile}: any) => {
      console.log(profile)
         
      try {
        await dbConnect()
        const userExist = await UserModel.findOne({email: profile.email})
        

        if(!userExist)
          {
            const user = new UserModel(
              {
                _id: profile._id,
                name : profile.name,
                email : profile.email,
                isAdmin: profile.isAdmin,
                password: '@D1fF1cuLt#Str1nG$T3st!2024#%^',
                
              }
            )

            await user.save()

          }



        return true

      } catch(error)
      {
        console.log(error)
        return false
      }


    },
    async jwt({ user, trigger, session, token }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        }
      }
      if (trigger === 'update' && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
        }
      }
      return token
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user
      }
      const sessionUser = await UserModel.findOne({ email: session.user.email });
            if (sessionUser) {
                session.user._id = sessionUser._id.toString();
                session.user.isAdmin = sessionUser.isAdmin;
                return session;                
            }
      return session
    },

  },
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config)
