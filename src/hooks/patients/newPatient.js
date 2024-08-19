import { useRouter } from 'next/router'
// Firebase Imports
import { database } from 'src/firebase'
import { collection, addDoc } from 'firebase/firestore'


export const newPatient = async (patient) => {


  try {
    const docRef = await addDoc(collection(database, 'patients'), patient)
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.log('Error adding document:', e)
  }
}
