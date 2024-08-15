import { Grid, Typography, FormControl, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Close from '@mui/icons-material/Close'
import { useState } from 'react'

import { database } from 'src/firebase'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'

export const VariationForm = ({
  serviceSelected,
  setVariations
}) => {
  const [newVariation, setNewVariation] = useState(false)
  const [variationName, setVariationName] = useState('')
  const [variationPrice, setVariationPrice] = useState('')
  const fetchVariations = async () => {
    try {
      const variationsCollection = collection(database, 'service_variations')
      const variationsSnapshot = await getDocs(variationsCollection)
      const variationsList = variationsSnapshot.docs.map(doc => doc.data())
      setVariations(variationsList)
    } catch (error) {
      console.error('Error fetching variations:', error)
    }
  }
  const handleAddVariation = async () => {
    const variationsCollection = collection(database, 'service_variations');
    // Query to check if a variation with the same name already exists
    const querySnapshot = await getDocs(query(variationsCollection, where("name", "==", variationName)));
    if (!querySnapshot.empty) {
      // Handle the case where the variation name is not unique
      alert("A variation with this name already exists. Please choose a different name.");
      return;
    }

    const newVariation = {
      service: serviceSelected,
      name: variationName,
      price: variationPrice
    };
    await addDoc(variationsCollection, newVariation);
    setVariationName('');
    setVariationPrice('');
    setNewVariation(false);
    fetchVariations();
  };
  return (
    <Grid sx={styles.variationForm}>
      <Typography sx={{ fontWeight: 'bold', color: '#00A99D', fontSize: 15 }}>Agregar Variación</Typography>
      <FormControl>
        <TextField
          value={variationName}
          onChange={e => setVariationName(e.target.value)}
          sx={{ marginRight: 2, width: 200 }}
          label='Nombre'
        />
      </FormControl>

      <FormControl>
        <TextField
          value={variationPrice}
          onChange={e => setVariationPrice(e.target.value)}
          sx={{ marginLeft: 15, width: '60%' }}
          label='Precio'
        />
      </FormControl>
      <AddIcon onClick={() => handleAddVariation()} sx={styles.addIcon} />
      <Close onClick={() => setNewVariation(false)} sx={styles.closeIcon} />
    </Grid>
  )
}

const styles = {
  variationForm: {
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    padding: 5,
    marginTop: 5,
    border: '1px solid #00A99D',
    display: 'flex',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)'
  },
  addIcon: {
    cursor: 'pointer',
    fontSize: 25,
    color: 'white',
    backgroundColor: '#00A99D'
  },
  closeIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
    cursor: 'pointer',
    fontSize: 18
  }
}
