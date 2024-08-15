import React, { useState } from 'react'
import { useEffect } from 'react'

// ** MATERIAL UI IMPORTS
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

// ** FIREBASE IMPORTS
import {database} from 'src/firebase'
import { collection, getDocs } from 'firebase/firestore'



export function ServiceVariationsBox({ serviceSelected, setServiceSelected }) {
  const [services, setServices] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const fetchServices = async () => {
      const servicesCollection = collection(database, 'services')
      const servicesSnapshot = await getDocs(servicesCollection)
      const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setServices(servicesList)
    }
    fetchServices()
  }
  ,[])

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

const handleChange = (event, newValue) => {
  setServiceSelected(newValue); // Update to store the selected ID or null
  if (newValue) setInputValue(newValue.name); // Assuming `newValue` has a `name` property
  else setInputValue(''); // Reset input value if no selection
};
  return (
    <Box>
      <FormControl fullWidth>
        <Autocomplete
          id='service-autocomplete'
          options={services}
          getOptionLabel={option => `${option.name}`}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onChange={handleChange}
          value={services.find(serv => serv.id === serviceSelected) || null}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={params => <TextField {...params} label='Elija un servicio'/>}
          sx={{ minWidth: 345 }}
          size='small'
        />
      </FormControl>
    </Box>
  )
}
