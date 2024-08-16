import React from 'react'
import { usePatientStore } from 'src/hooks/globalStates/usePatientStore'
import { Grid, Box, Typography } from '@mui/material'
export const ViewPatient = () => {
  const { selectedPatient } = usePatientStore()
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box>
          <Typography variant='h6'>
            {selectedPatient.firstName} {selectedPatient.lastName}
          </Typography>
          <Typography variant='h6'>{selectedPatient.phone}</Typography>
          <Typography variant='h6'>{selectedPatient.dateOfBirth}</Typography>
          <Typography variant='h6'>{selectedPatient.isAllergic}</Typography>
          <Typography variant='h6'>{selectedPatient.allergy}</Typography>
          <Typography variant='h6'>{selectedPatient.usedProducts}</Typography>
          <Typography variant='h6'>{selectedPatient.skinType}</Typography>
          <Typography variant='h6'>{selectedPatient.pastProcedures}</Typography>
          <Typography variant='h6'>{selectedPatient.suggestions}</Typography>
          <Typography variant='h6'>{selectedPatient.notes}</Typography>
          <Typography variant='h6'>{selectedPatient.rnc}</Typography>
          <Typography variant='h6'>{selectedPatient.email}</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
