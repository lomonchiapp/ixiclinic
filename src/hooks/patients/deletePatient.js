import { deleteDoc, doc } from 'firebase/firestore';
import { database } from 'src/firebase';
import { toast } from 'react-toastify';

export const deletePatient = async (id) => {
  try {
    await deleteDoc(doc(database, 'patients', id));
    toast.success('Paciente eliminado con éxito');
  } catch (e) {
    console.error('hubo bobo:', e);
    toast.error('Hubo un error al eliminar el paciente');
  }
};