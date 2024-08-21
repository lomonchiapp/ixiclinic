// ** React Imports
import * as React from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
// ** Custom Components
import { ClinicTab } from './tabs/ClinicTab'
import { ProductsTab } from './tabs/ProductsTab'
import { ServicesTab } from './tabs/ServicesTab'

export function RecordTabs() {
  const [tab, setTab] = React.useState('1')

  const handleChange = (event, newValue) => {
    setTab(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab label='Servicios / Tratamientos' value='1' />
            <Tab label='Productos / Medicamentos' value='2' />
            <Tab label='Inf. Clinica' value='3' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <ServicesTab />
        </TabPanel>
        <TabPanel value='2'>
          <ProductsTab />
        </TabPanel>
        <TabPanel value='3'>
          <ClinicTab />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
