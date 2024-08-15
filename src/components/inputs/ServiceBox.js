// ** REACT IMPORTS
import React from 'react'
import { useState, useEffect } from 'react'

// ** MATERIAL UI IMPORTS
import { Box, FormControl, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'

// ** GLOBAL STATE
import { useRecordState } from '../../contexts/recordState'


export function ServiceBox({ service, services}) {
  const { servList, setServList } = useRecordState()
  const [inputValue, setInputValue] = useState('')

  const addServiceToList = (service) => {
    const serviceIndex = servList.findIndex(serv => serv.id === service.id)
    if (serviceIndex !== -1) {
      setInputValue('')
    } else {
    setServList([...servList, service])
    setInputValue('')
    }
  }

  return (
    <Box>
      <FormControl fullWidth>
        <Autocomplete
          id='service-autocomplete'
          options={services}
          getOptionLabel={option => `${option.name}`}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue); // Update input value as user types
          }}
          value={services.find(serv => serv.id === service) || null} //prov is provider
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={params => <TextField {...params} label='Elija los Servicios'/>}
          sx={{ minWidth: 345 }}
          size='small'
          onChange={(event, newValue) => {
            addServiceToList(newValue)
          }}
        />
      </FormControl>
    </Box>
  )
}
