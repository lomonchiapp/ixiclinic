import React, { useEffect, useState } from 'react'
import { Box, FormControl, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { database } from 'src/firebase'
import { collection, getDocs } from 'firebase/firestore'

export function ProvidersSelect({ isDialogOpen, setProvider, provider }) {
  // ** Local State
  const [providers, setProviders] = useState([])

  const handleChange = (event, newValue) => {
    setProvider(newValue)
  }
  useEffect(() => {
    if (!isDialogOpen) {
      const fetchProviders = async () => {
        const querySnapshot = await getDocs(collection(database, 'product_providers'));
        let providers = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
        setProviders(providers);
      };
      fetchProviders();
    }
  }, [isDialogOpen]);
  return (
    <Box>
      <FormControl fullWidth>
        <Autocomplete
          id='provider-autocomplete'
          options={providers}
          getOptionLabel={option => `${option.name}`}
          value={providers.find(prov => prov.id === provider) || null} //prov is provider
          onChange={handleChange}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={params => <TextField {...params} label='Seleccione un Proveedor / Visitador' />}
          sx={{ minWidth: 345 }}
        />
      </FormControl>
    </Box>
  )
}
