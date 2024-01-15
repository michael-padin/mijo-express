import NextAuth from "next-auth/next";
import { User } from "./models";
import { connectToDB } from "./utils";
import bcrypt from "bcrypt";
import { signJwtAccessToken } from "./jwt";
import { createReview, createServiceOffer } from "./data";
import { serviceOfferTestData, testDataReview } from "./test-data";

type loginProps = {
  email?: string | undefined;
  password?: string | undefined;
};

export const login = async (credentials: loginProps) => {
  const { password = "", email = "" } = credentials;
  try {
    await connectToDB();

    // await createReview(testDataReview);
    // await Promise.all(serviceOfferTestData.map(async (item) => {
    //   await createServiceOffer(item);
    // }));

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...userWithoutPass } = user._doc;
      const accessToken = signJwtAccessToken(userWithoutPass);

      const result = {
        ...userWithoutPass,
        accessToken,
      };
      return result;
    } else {
      throw new Error("Wrong credentials!");
    }
  } catch (err) {
    console.log(err);
    throw new Error((err as Error).message);
  }
};
