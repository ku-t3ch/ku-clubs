import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions, type DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isAdmin: boolean;
      owner: string[];
      editor: string[];
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    isAdmin: boolean;
    owner: string[];
    editor: string[];
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.isAdmin = token.isAdmin;
        session.user.owner = token.owner;
        session.user.editor = token.editor;
      }
      return session;
    },
    async jwt({ token }) {
      const userData = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
        include: {
          myClubs: true,
          editor: true,
        },
      });

      if (userData === null) {
        return {
          ...token,
        };
      }

      return {
        ...{
          ...userData,
          owner: userData.myClubs.map((club) => club.id),
          editor: userData.editor.map((club) => club.id),
        },
        ...token,
      };
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
