import { database } from 'src/firebase'
import { getDocs, collection } from 'firebase/firestore'

export const getSkinTypes = async () => {
  try {
    const skinsCollection = getDocs(collection(database, 'skinTypes'))
    const skinTypes = (await skinsCollection).docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    return skinTypes
  } catch (error) {
    console.error("Error getting skinTypes:", error);
    // Handle the error appropriately, e.g., return an empty array or throw the error
    return []; 
  }
}