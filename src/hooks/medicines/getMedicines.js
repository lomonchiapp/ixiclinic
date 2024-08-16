import { database } from 'src/firebase'
import { getDocs, collection } from 'firebase/firestore'

export const getMedicines = async () => {
  try {
    const medicinesCollection = getDocs(collection(database, 'medicines'))
    const medicines = (await medicinesCollection).docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    return medicines
  } catch (error) {
    console.error("Error getting medicines:", error);
    // Handle the error appropriately, e.g., return an empty array or throw the error
    return [];
  }
}
