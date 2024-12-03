import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { addPlayer } from './players';

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Create player profile after successful signup
    await addPlayer({
      id: userCredential.user.uid,
      name: name || email.split('@')[0],
      photoUrl: '',
      bio: '',
      averageSkills: {
        defense: 5,
        goalMaking: 5,
        shootingAccuracy: 5,
        passingAbility: 5,
        goalkeeping: 5,
        speedAndStamina: 5
      }
    });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};