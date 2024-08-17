import { useState } from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore'

export const newOrder = order => {
  try {
    const docRef = collection(db, 'orders')
    const newOrder = addDoc(docRef, order)
    return newOrder
  } catch (error) {
    console.log(error)
  }
}
