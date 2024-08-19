import { collection, getDocs } from 'firebase/firestore';
import {database} from 'src/firebase'

export const getServiceCategories = async () => {
    const querySnapshot = await getDocs(collection(database, 'service_categories'));
    const categories = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return categories;
  }