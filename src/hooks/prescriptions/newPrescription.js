import { useRouter } from 'next/router'
// Firebase Imports
import { database } from 'src/firebase'
import { collection, addDoc } from 'firebase/firestore'

const router = useRouter()

export const newPrescription = async (prescription) => {
  try {
    const docRef = await addDoc(collection(database, 'prescriptions'), prescription)
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.log('Error adding document:', e)
  }
}
