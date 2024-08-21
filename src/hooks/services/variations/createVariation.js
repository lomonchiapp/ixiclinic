import {database} from 'src/firebase'
import {collection, doc, setDoc} from 'firebase/firestore'
import { toast } from 'react-toastify';

export const createVariation = async (variation) => {
    try {
      const newDocRef = doc(collection(database, 'service_variations')); // Create a new document reference with an auto-generated ID
      const varId = newDocRef.id;
      await setDoc(newDocRef, { ...variation, id: varId }); // Set the document with the ID included
      console.log('Document written with ID: ', varId);
      toast.success('Variación creada exitosamente');
      return { ...variation, id: varId }; // Return the new category with the ID
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error('Error al crear la variación');
      throw error; // Re-throw the error to be handled by the caller
    }
  };