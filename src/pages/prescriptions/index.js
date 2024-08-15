import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { PrescriptionsList } from './PrescTable'
import Grid from '@mui/material/Grid'
import ControlPointIcon from '@mui/icons-material/ControlPoint'

import { useState } from 'react'
import { useRouter } from 'next/router'

const PrescriptionPage = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant='h6'>Recetas Médicas</Typography>

          <Button
            startIcon={<ControlPointIcon />}
            variant='contained'
            color='primary'
            onClick={() => router.push('/prescriptions/NewPrescription')}
          >
            Nueva Receta
          </Button>
        </Grid>
      </Grid>
      <PrescriptionsList dialogIsOpen={open} />
    </>
  )
}

export default PrescriptionPage
// Path: src/pages/clients/index.js
