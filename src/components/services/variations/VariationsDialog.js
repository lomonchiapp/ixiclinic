// ** React Imports
import * as React from 'react'
import { useState, useEffect } from 'react'

// ** MUI Dialog Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// ** MUI Tabs Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

// ** MUI General Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components
import { ServiceVariationsBox } from 'src/components/inputs/ServiceVariationsBox'
import { Variations } from './Variations'

// ** Global State
import { useGlobalStore } from 'src/contexts/useGlobalStore'
import { useSelectedService } from 'src/contexts/useSelectedService'

export function VariationsDialog({ open, setOpen }) {

  const [tab, setTab] = useState('1')
  const [toggleInfo, setToggleInfo] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }
  return (
    <Dialog sx={styles.dialog} open={open} onClose={handleClose}>
      <DialogTitle>Variaciones y Atributos</DialogTitle>
      <DialogContent>
        <Typography sx={styles.toggleText} onClick={() => setToggleInfo(true)}>¿Que son las variaciones y Atributos?</Typography>
        {toggleInfo &&
        (
          <>
        <DialogContentText>
          <p>Las variaciones son las diferentes vertientes de un servicio. Por ejemplo, si usted ofrece servicio de
          depilación, las variaciones pueden ser: depilación de piernas, depilación de axilas, depilación de brazos,
          etc., las cuales pueden variar el precio inicial.</p>

          <p>Los atributos son las características que pueden tener las variaciones. Por ejemplo, si usted ofrece servicio
          de depilación de piernas, los atributos pueden ser: cera caliente, cera tibia, cera fría, etc...</p>
          <p style={{color:"red"}}>Nota: Las variaciones y atributos son opcionales.</p>
        </DialogContentText>
        <Typography sx={styles.closeText} onClick={() => setToggleInfo(false)}>Ocultar información</Typography>
        </>)
        }
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange}>
                <Tab label='Variaciones' value='1' />
                <Tab label='Atributos' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <Grid>
                <ServiceVariationsBox/>
              </Grid>
              <Grid>
                <Variations />
              </Grid>
            </TabPanel>
            <TabPanel value='2'>
              <p>Atributos aqui</p>
            </TabPanel>
          </TabContext>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

const styles = {
  dialog: {
    '& .MuiDialog-paper': {
      width: '80%',
      height: '80%',
    },
  },
  toggleText: {
    color: '#00A99D',
    cursor: 'pointer',
    marginBottom: 2,
    textDecoration: 'underline'
  },
  closeText: {
    color: '#A8A8A8',
    cursor: 'pointer',
    marginBottom: 2,
    textDecoration: 'underline'
  }}
