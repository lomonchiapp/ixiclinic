import React from 'react'
import { useSelectedPatient } from 'src/contexts/useSelectedPatient'
import { Grid, Box, Typography } from '@mui/material'


export const ViewPatient = () => {
  const { patient } = useSelectedPatient()
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box>
          <Typography variant='h6'>
            {patient.firstName} {patient.lastName}
          </Typography>
          <Typography variant='h6'>{patient.phone}</Typography>
          <Typography variant='h6'>{patient.dateOfBirth}</Typography>
          <Typography variant='h6'>{patient.isAllergic}</Typography>
          <Typography variant='h6'>{patient.allergy}</Typography>
          <Typography variant='h6'>{patient.usedProducts}</Typography>
          <Typography variant='h6'>{patient.skinType}</Typography>
          <Typography variant='h6'>{patient.pastProcedures}</Typography>
          <Typography variant='h6'>{patient.suggestions}</Typography>
          <Typography variant='h6'>{patient.notes}</Typography>
          <Typography variant='h6'>{patient.rnc}</Typography>
          <Typography variant='h6'>{patient.email}</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
