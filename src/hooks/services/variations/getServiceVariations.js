import { collection, getDocs } from 'firebase/firestore';
import {database} from 'src/firebase'

export const getServiceVariations = async () => {
    const querySnapshot = await getDocs(collection(database, 'service_variations'));
    const variations = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return variations
  }