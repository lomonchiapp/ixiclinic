import React, { useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { ServicesBox } from '../../inputs/ServiceBox'
import AddCircleIcon from '@mui/icons-material/AddCircle'


export function ClinicTab() {
  return (
    <Grid sx={{ alignItems: 'center', marginBottom: 10 }} container item>
     <Typography variant='h6'>Clinica</Typography>
    </Grid>
  )
}
