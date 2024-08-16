import React from 'react'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Typography } from '@mui/material'
import { getMedicines } from 'src/hooks/medicines/getMedicines'

export function MedicineBox({ isDialogOpen, selectedMedicine, setSelectedMedicine, setPresentation, medicines, setMedicines }) {

  useEffect(() => {
    if (!isDialogOpen) {
      getMedicines()
        .then(response => {
          setMedicines(response.data)
          // Set the selectedMedicine to the last element of the fetched medicines array
          if (response.data.length > 0) {
            setSelectedMedicine(response.data[response.data.length - 1])
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [isDialogOpen])



  return (
    <>
      <Autocomplete
        disablePortal
        id='medicine'
        size='small'
        value={selectedMedicine}
        onChange={(newValue) => {
          setSelectedMedicine(newValue)
        }}
        options={medicines}
        getOptionLabel={option => option.name + ' ' + option.presentation} // Use the name property for the option label
        sx={{ width: 300, border: 'none' }}
        renderInput={params => <TextField {...params} label='Medicamento...' />}
      />

    </>
  )
}

export const DosageLabel = ({ presentation }) => {
  function getUnitForPresentation(presentation) {
    const presentationUnits = {
      'Pastillas': 'uds',
      'Jarabe': 'cucharadas',
      'Inyección': 'ml',
      'Pomada': 'aplicaciones',
      'Gotas': 'gotas',
      'Supositorio': 'supositorios',
      'Suspensión': 'ml',
      'Crema': 'aplicaciones',
      'Solución': 'ml',
      'Aerosol': 'aplicaciones'
    };

    return presentationUnits[presentation] || 'Unknown unit';
  }
  return (
    <Typography sx={{
      backgroundColor:'#EDEDED',

      fontSize: 10,
      padding: 1,

      display: 'inline',
      marginLeft: 1
    }} color='text.secondary'>
      {getUnitForPresentation(presentation)}
    </Typography>
  )
}
