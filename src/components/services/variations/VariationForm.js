import { Grid, Typography, FormControl, TextField, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Close from '@mui/icons-material/Close'
import { useState } from 'react'

import { database } from 'src/firebase'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
// Global States
import { useSelectedService } from 'src/contexts/useSelectedService'
import { useGlobalStore } from 'src/contexts/useGlobalStore'
// Hooks
import {createVariation} from 'src/hooks/services/variations/createVariation'
export const VariationForm = () => {  // Global States
  // Global States
  const { service, setService } = useSelectedService() 
  const { fetchServVariations, serviceVariations, setServiceVariations } = useGlobalStore()

  // Local States
  const [newVariation, setNewVariation] = useState(false)
  const [variation, setVariation] = useState({
    service: service,
    name: '',
    price: '',
    CreatedAt: new Date(),
  })

  const handleAddVariation = async () => {
    await createVariation(variation)
    setVariation({ ...variation, name: '', price: '' });
    fetchServVariations()
  }

  return (
    <Grid sx={styles.variationForm}>
      <Box>
      <Typography sx={{color: '#00A99D', fontSize: 12 }}>Agregar Variación</Typography>
      </Box>
      <FormControl>
        <TextField
          value={variation.name}
          size= 'small'
          onChange={e => setVariation({ ...variation, name: e.target.value })}
          label='Nombre'
        />
      </FormControl>

      <FormControl>
        <TextField
          value={variation.price}
          size='small'
          sx={{maxWidth: 100}}
          onChange={e => setVariation({ ...variation, price: e.target.value })}
          label='Precio'
        />
      </FormControl>
      <AddIcon onClick={() => handleAddVariation()} sx={styles.addIcon} />
    </Grid>
  )
}

const styles = {
  variationForm: {
    justifyContent: 'center',
    position: 'relative',
    display:'flex',
    flexGrow:1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 2,
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
}
