import { 
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import type { Player, SkillRating } from '../types';

const PLAYERS_COLLECTION = 'players';
const RATINGS_COLLECTION = 'ratings';

export const addPlayer = async (player: Player) => {
  try {
    await setDoc(doc(db, PLAYERS_COLLECTION, player.id), {
      ...player,
      createdAt: Timestamp.now()
    }, { merge: true });
    return player.id;
  } catch (error) {
    console.error('Error adding player:', error);
    throw error;
  }
};

export const updateProfile = async (
  userId: string,
  data: {
    name: string;
    bio: string;
    photoFile: File | null;
  }
) => {
  try {
    const updates: Partial<Player> = {
      name: data.name,
      bio: data.bio,
    };

    if (data.photoFile) {
      const photoRef = ref(storage, `profile-photos/${userId}`);
      await uploadBytes(photoRef, data.photoFile);
      updates.photoUrl = await getDownloadURL(photoRef);
    }

    await updateDoc(doc(db, PLAYERS_COLLECTION, userId), updates);
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const submitPlayerRating = async (
  playerId: string,
  raterId: string,
  ratings: SkillRating[]
) => {
  try {
    await setDoc(doc(collection(db, RATINGS_COLLECTION)), {
      playerId,
      raterId,
      ratings,
      timestamp: Timestamp.now()
    });

    const ratingsQuery = query(
      collection(db, RATINGS_COLLECTION),
      where('playerId', '==', playerId)
    );
    const ratingsSnapshot = await getDocs(ratingsQuery);
    
    const allRatings = ratingsSnapshot.docs.map(doc => doc.data().ratings);
    const averageSkills = calculateAverageSkills(allRatings);

    await updateDoc(doc(db, PLAYERS_COLLECTION, playerId), { averageSkills });
  } catch (error) {
    console.error('Error submitting rating:', error);
    throw error;
  }
};

export const subscribeToPlayers = (callback: (players: Player[]) => void) => {
  const playersQuery = query(
    collection(db, PLAYERS_COLLECTION),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(
    playersQuery,
    (snapshot) => {
      const players = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        averageSkills: doc.data().averageSkills || {
          defense: 5,
          goalMaking: 5,
          shootingAccuracy: 5,
          passingAbility: 5,
          goalkeeping: 5,
          speedAndStamina: 5
        }
      })) as Player[];
      callback(players);
    },
    (error) => {
      console.error('Error subscribing to players:', error);
    }
  );
};

const calculateAverageSkills = (allRatings: SkillRating[][]) => {
  const skillTotals: Record<string, { total: number; count: number }> = {};
  
  allRatings.forEach(ratings => {
    ratings.forEach(({ skill, rating }) => {
      if (!skillTotals[skill]) {
        skillTotals[skill] = { total: 0, count: 0 };
      }
      skillTotals[skill].total += rating;
      skillTotals[skill].count += 1;
    });
  });

  const averageSkills: Record<string, number> = {};
  Object.entries(skillTotals).forEach(([skill, { total, count }]) => {
    averageSkills[skill] = count > 0 ? total / count : 5;
  });

  return averageSkills;
};