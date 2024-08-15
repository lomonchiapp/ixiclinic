import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { MedicinesList } from './MedicinesTable'
import Grid from '@mui/material/Grid'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { useState } from 'react'
import { MedicineDialog } from 'src/components/medicines/MedicineDialog'

const MedicinesPage = () => {
  const [open, setOpen] = useState(false)
  const [medicine, setMedicine] = useState({
    name: '',
    presentation: ''
  })


  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant='h6'>Medicamentos</Typography>

          <Button startIcon={<ControlPointIcon />} variant='contained' color='primary' onClick={() => setOpen(true)}>
            Agregar Medicamento
          </Button>
          <MedicineDialog open={open} setOpen={setOpen} medicine={medicine} setMedicine={setMedicine} />
        </Grid>
      </Grid>

      <MedicinesList isDialogOpen={open} />
    </>
  )
}

export default MedicinesPage
// Path: src/pages/clients/index.js
