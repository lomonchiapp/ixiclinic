'use client'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { RecordsList } from '../../components/records/RecordsTable'
import Grid from '@mui/material/Grid'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { useState } from 'react'
import { useRouter } from 'next/router'

const ServicesPage = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant='h6'>Expedientes</Typography>

          <Button startIcon={<ControlPointIcon />} variant='contained' color='primary' onClick={() => router.replace('records/newRecord')}>
            Nuevo Expediente
          </Button>
        </Grid>
      </Grid>
      <RecordsList drawerIsOpen={open} />
      {/*<AddServiceDrawer open={open} setOpen={setOpen} />*/}
    </>
  )
}

export default ServicesPage
// Path: src/pages/clients/index.js
