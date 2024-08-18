import { collection, getDocs } from 'firebase/firestore';
import {database} from 'src/firebase'

export const getProductCategories = async () => {
    const querySnapshot = await getDocs(collection(database, 'product_categories'));
    const categories = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setCategories(categories);
  }