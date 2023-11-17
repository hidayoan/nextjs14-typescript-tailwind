import connectDB from "@/lib/mongodb";
import User from "@/models/user.model";
import bcrypt from 'bcrypt';

//loginUser function
export const loginUser = async (credentials: any) => {
  try {
    await connectDB();
    const { email, password } = credentials;
    if (!email || !password) {
      return { status: 400, message: "EMAIL_OR_PASSWORD_NOT_PROVIDED" };
    }
    const userOne = await getUser(email) as any;

    return bcrypt.compareSync(password, userOne?.password)
      ? { status: 200, message: "LOGIN_SUCCESS", userOne }
      : { status: 400, message: "PASSWORD_NOT_MATCH" };

  } catch (error) {
    return { status: 500, message: "INTERNAL_SERVER_ERROR" };
  }
};

export const registerUser = async (credentials: any) => {
  try {
    await connectDB();
    const { name, email, password } = credentials;
    if (!name || !email || !password) {
      return { status: 400, message: "NAME_EMAIL_PASSWORD_NOT_PROVIDED" };
    }
    const userOne = await getUser(email);

    if (userOne) {
      return { status: 400, message: "EMAIL_ALREADY_EXISTS" };
    }
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });
    return { status: 200, message: "REGISTER_SUCCESS", newUser };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "INTERNAL_SERVER_ERROR" };
  }
}

export const getUser = async (email: string) => {
  try {
    await connectDB();
    if (!email) {
      return null;
    }
    const userOne = await User.findOne({ email })
    if (!userOne) {
      return null;
    }
    return userOne;
  } catch (error) {
    console.log(error);
    return null;
  }
}