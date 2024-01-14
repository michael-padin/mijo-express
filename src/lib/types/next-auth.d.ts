import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      fullName: string;
      email: string;
      contact: string;
      skills: [];
      accessToken: string;
      role: "customer" | "provider" | undefined;
      address: string;
      _id: string;
      profileImg: string;
    };
  }
}
