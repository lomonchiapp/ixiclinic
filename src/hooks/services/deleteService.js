import { deleteDoc, doc } from 'firebase/firestore';
import { database } from 'src/firebase';
import { toast } from 'react-toastify';

export const deleteService = async (id) => {
  try {
    await deleteDoc(doc(database, 'services', id));
    toast.success('Servicio eliminado con éxito');
  } catch (e) {
    console.error('hubo bobo:', e);
    toast.error('Hubo un error al eliminar el paciente');
  }
};