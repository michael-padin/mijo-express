import { User } from "./models";
import { connectToDB } from "./utils";
import bcrypt from "bcrypt";

type loginProps = {
  email?: string | undefined;
  password?: string | undefined;
};

export const login = async (credentials: loginProps) => {
  const { password, email } = credentials;
  try {
    await connectToDB();
    const user = await User.findOne({ email });

    if (!user) throw new Error("Wrong credentials!");

    if (password) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) throw new Error("Wrong credentials!");
    }

    return user;
  } catch (err) {
    console.log(err);
    throw new Error((err as Error).message);
  }
};
