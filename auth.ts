import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import db from '@/lib/db'
import { authConfig } from './auth.config'

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const result = await db.query(
            'SELECT id, email, password_hash FROM admin_users WHERE email = $1',
            [credentials.email]
          )

          const user = result.rows[0]
          if (!user) return null

          const isValidPassword = await compare(
            credentials.password as string,
            user.password_hash
          )

          if (!isValidPassword) return null

          return { id: user.id, email: user.email }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  session: { strategy: 'jwt' },
})
