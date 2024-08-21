import { deleteDoc, doc } from 'firebase/firestore';
import { database } from 'src/firebase';
import { toast } from 'react-toastify';

export const deleteVariation = async (id) => {
  try {
    await deleteDoc(doc(database, 'service_variations', id));
    toast.success('Variación eliminado con éxito');
  } catch (e) {
    console.error('hubo bobo:', e);
    toast.error('Hubo un error al eliminar el paciente');
  }
};