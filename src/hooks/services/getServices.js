import { database } from 'src/firebase';
import { getDocs, collection } from 'firebase/firestore';

export const getServices = async () => {
  try {
    const servicesCollection = await getDocs(collection(database, 'services'));
    const services = servicesCollection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return services;
  } catch (error) {
    console.error("Error getting services:", error);
    return [];
  }
};