import {database} from 'src/firebase'
import {collection, doc, setDoc} from 'firebase/firestore'
import { toast } from 'react-toastify';

export const newRecord = async (record) => {
    try {
      const newDocRef = doc(collection(database, 'records')); // Create a new document reference with an auto-generated ID
      const recId = newDocRef.id;
      await setDoc(newDocRef, { ...record, id: recId }); // Set the document with the ID included
      console.log('Document written with ID: ', recId);
      toast.success('Expediente creado exitosamente.');
      return { ...record, id: recId }; // Return the new category with the ID
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error('Error al crear el expediente.');
      throw error; // Re-throw the error to be handled by the caller
    }
  };