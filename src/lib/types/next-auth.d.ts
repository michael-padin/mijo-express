import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      fullName: string;
      email: string;
      accessToken: string;
      role: string;
      address: string;
      _id: string;
      profileImg: string;
      contactNumber: string;
    };
  }
}
