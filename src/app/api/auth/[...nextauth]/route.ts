import { login } from "@/lib/auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/lib/auth.config";

const authOptions: NextAuthOptions = {
  ...authConfig,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
