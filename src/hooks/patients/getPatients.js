import { database } from 'src/firebase'
import { getDocs, collection } from 'firebase/firestore'

export const getPatients = async () => {
  try {
    const patientsCollection = getDocs(collection(database, 'patients'))
    const patients = (await patientsCollection).docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    return patients
  } catch (error) {
    console.error("Error getting patients:", error);
    // Handle the error appropriately, e.g., return an empty array or throw the error
    return []; 
  }
}