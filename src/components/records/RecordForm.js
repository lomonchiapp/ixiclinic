// ** MUI Imports
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
// ** Icons Imports
import { Box, InputLabel, MenuItem, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useRecordState } from 'src/contexts/recordState'
import { useRouter } from 'next/router'


// ** Firestore Imports
import { database } from 'src/firebase'
import { collection, getDocs, serverTimestamp, onSnapshot } from 'firebase/firestore'
// Date imports
import { format } from 'date-fns'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// ** Custom Components
import { PatientsSelect } from 'src/components/inputs/PatientsSelect'
import { RecordTabs } from '../records/RecordTabs'
import {EmptyPatient} from 'src/components/records/EmptyPatient'
// ** Global States
import { useGlobalStore } from 'src/contexts/useGlobalStore'

export const RecordForm = () => {
  const [openDialog, setOpenDialog] = useState(false)
  
  const { selectedPatient, date, setDate } = useRecordState()
  const {patients, services, products, fetchPatients, fetchServices, fetchProducts} = useGlobalStore()
  // Convert server timestamp to JavaScript Date object
  const initialDate = date ? new Date(date.seconds * 1000) : new Date()
  const [selectedDate, setSelectedDate] = useState(initialDate)

  const router = useRouter()
  // ** Fetching data

  useEffect(() => {
    fetchPatients()
    fetchServices()
    fetchProducts()
    console.log(patients)
  }, [fetchPatients, fetchServices, fetchProducts]);

  const handleDateChange = date => {
    setSelectedDate(date)
    setDate(date.toISOString())
  }

  return (
    <Card sx={{
      minWidth: '90%',
    }}>
      <form>
        <CardHeader title='Nuevo Expediente' titleTypographyProps={{ variant: 'h6' }} />
        <Divider />
        <CardContent>
          <Grid>
            <Grid sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}} item>
              <PatientsSelect />
              <Box sx={styles.dateContainer}>
                <Typography sx={styles.dateLabel}>Fecha:</Typography>
                <Typography sx={styles.dateValue}>
                {format(date, 'dd/MM/yyyy')}
                </Typography>
              </Box>
            </Grid>
            <Grid sx={styles.tabContainer} item container>
             {selectedPatient? (<RecordTabs />) : (<EmptyPatient />)}

            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  )
}

const styles = {
  tabContainer: {
    marginTop: 10
  },
  dateContainer: {
    border: '1px solid #00A99D',
    padding: 2.5,
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  dateValue:{
    fontWeight: 'bold',
    fontSize:18,
    color: '#00A99D'
  },
  dateLabel:{
    fontSize: 14
  }
}
