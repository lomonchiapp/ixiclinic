import { collection, getDocs } from 'firebase/firestore';
import {database} from 'src/firebase'

export const getProductProviders = async () => {
    const querySnapshot = await getDocs(collection(database, 'product_providers'));
    const providers = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return providers
  }