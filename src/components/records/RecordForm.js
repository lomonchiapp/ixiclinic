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
// Hooks fetch
import { getServices } from 'src/hooks/services/getServices'
import { getProducts } from 'src/hooks/products/getProducts'
import { getPatients } from 'src/hooks/patients/getPatients'

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
export const RecordForm = ({ newPatient, setNewPatient, newService, setNewService, newProduct, setNewProduct }) => {
  const [openDialog, setOpenDialog] = useState(false)

  const { patient, setPatient, date, setDate } = useRecordState()

  // Convert server timestamp to JavaScript Date object
  const initialDate = date ? new Date(date.seconds * 1000) : new Date()
  const [selectedDate, setSelectedDate] = useState(initialDate)

  //Local States

  const [patients, setPatients] = useState([])
  const [services, setServices] = useState([])
  const [products, setProducts] = useState([])
  const router = useRouter()
  // ** Fetching data

  useEffect(() => {
    const unsubscribePatients = onSnapshot(collection(database, 'patients'), (snapshot) => {
      const patients = snapshot.docs.map(doc => doc.data());
      setPatients(patients);
    });

    const unsubscribeServices = onSnapshot(collection(database, 'services'), (snapshot) => {
      const services = snapshot.docs.map(doc => doc.data());
      setServices(services);
    });

    const unsubscribeProducts = onSnapshot(collection(database, 'products'), (snapshot) => {
      const products = snapshot.docs.map(doc => doc.data());
      setProducts(products);
    });

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribePatients();
      unsubscribeServices();
      unsubscribeProducts();
    };
  }, []);

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
              <PatientsSelect patient={patient} setPatient={setPatient} patients={patients} />
              <Box sx={styles.dateContainer}>
                <Typography sx={styles.dateLabel}>Fecha:</Typography>
                <Typography sx={styles.dateValue}>
                {format(date, 'dd/MM/yyyy')}
                </Typography>
              </Box>
            </Grid>
            <Grid sx={styles.tabContainer} item container>
              <RecordTabs
                setNewProduct={setNewProduct}
                setNewService={setNewService}
                newProduct={newProduct}
                newService={newService}
                products={products}
                setProducts={setProducts}
                services={services}
                setServices={setServices}
              />
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
    padding: 5,
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
