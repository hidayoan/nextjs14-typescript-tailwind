import { firestore } from '@/FirebaseProvider';
import bcrypt from 'bcrypt';
const PATH = 'users';

export const loginUser = async (credentials: {
  email: string,
  password: string,
}) => {
  const { email, password } = credentials;
  try {
    const userOne = await firestore.collection(PATH).where('email', '==', email).get();
    if (userOne.docs.length === 0) {
      return null;
    }

    const user: any = userOne.docs[0].data();
    console.log(user);
    return bcrypt.compareSync(password, user?.password) ? user : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const signUpUser = async (credentials: {
  email: string,
  password: string,
}) => {
  try {
    const { email, password } = credentials;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const user = await firestore.collection(PATH).where('email', '==', email).get();
    if (user.docs.length > 0) {
      return false;
    }
    await firestore.collection(PATH).add({
      email,
      password: hashedPassword,
    });
    return true;
  }
  catch (error) {
    console.error(error);
    return false;
  }
}

export const getUser = async (email: string) => {
  try {
    const userOne = await firestore.collection(PATH).where('email', '==', email).get();
    if (userOne.docs.length === 0) {
      return null;
    }
    const user = userOne.docs[0];
    return {
      ...user.data(),
      id: user.id,
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
