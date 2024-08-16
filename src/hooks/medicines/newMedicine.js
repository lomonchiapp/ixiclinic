import { useRouter } from 'next/router'
// Firebase Imports
import { database } from 'src/firebase'
import { collection, addDoc } from 'firebase/firestore'

const router = useRouter()

export const newMedicine = async (medicine) => {
  try {
    const docRef = await addDoc(collection(database, 'medicines'), medicine)
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.log('Error adding document:', e)
  }
}
