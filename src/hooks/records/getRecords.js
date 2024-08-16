import { database } from 'src/firebase'
import { getDocs, collection } from 'firebase/firestore'

export const getRecords = async () => {
  try {
    const recordsCollection = getDocs(collection(database, 'records'))
    const records = (await recordsCollection).docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    return records
  } catch (error) {
    console.error("Error getting records:", error);
    // Handle the error appropriately, e.g., return an empty array or throw the error
    return [];
  }
}
