import {database} from 'src/firebase'
import {collection, doc, setDoc} from 'firebase/firestore'
import { toast } from 'react-toastify';

export const newService = async (service) => {
    try {
      const newDocRef = doc(collection(database, 'services')); // Create a new document reference with an auto-generated ID
      const servId = newDocRef.id;
      await setDoc(newDocRef, { ...service, id: servId }); // Set the document with the ID included
      console.log('Document written with ID: ', servId);
      toast.success('Servicio creado exitosamente.');
      return { ...service, id: servId }; // Return the new category with the ID
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error('Error al crear el servicio.');
      throw error; // Re-throw the error to be handled by the caller
    }
  };