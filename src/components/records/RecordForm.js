// ** MUI Imports
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { ServiceCategorySelect } from 'src/components/inputs/ServiceCategorySelect'
// ** Icons Imports
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useForm, FormState } from 'react-hook-form'
import { InputLabel, MenuItem, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useRecordState } from 'src/contexts/recordState'
import { useRouter } from 'next/router'
import { CategoryFormDialog } from 'src/components/services/CategoryFormDialog'

// ** Firestore Imports
import { database } from 'src/firebase'
import { collection, getDocs } from 'firebase/firestore'

// ** Custom Components
import { PatientsSelect } from 'src/components/inputs/PatientsSelect'
import { ServicesBox } from 'src/components/inputs/ServiceBox'
import { ProductsSelect } from '../inputs/ProductsSelect'
import { ProductBox } from '../inputs/ProductBox'
import { ProdList } from './ProdList'
import { AddServiceDrawer } from '../services/AddServiceDrawer'
import { AddProductDrawer } from '../products/AddProductDrawer'
import { RecordTabs } from '../records/RecordTabs'
export const RecordForm = ({ newPatient, setNewPatient, newService, setNewService, newProduct, setNewProduct }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)
  const [patients, setPatients] = useState([])
  const [services, setServices] = useState([])
  const [products, setProducts] = useState([])

  const {
    patient,
    doctor,
    problems,
    servList,
    prodList,
    prices,
    procedures,
    setPrices,
    setPatient,
    setDoctor,
    setProblems,
    setServList,
    setProdList,
    setProcedure
  } = useRecordState()
  //Local States

  const router = useRouter()
  // ** Fetching data
  useEffect(() => {
    const fetchPatients = async () => {
      const patientsCollection = collection(database, 'patients')
      const patientsSnapshot = await getDocs(patientsCollection)
      const patientsList = patientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setPatients(patientsList)
    }
    const fetchServices = async () => {
      const servicesCollection = collection(database, 'services')
      const servicesSnapshot = await getDocs(servicesCollection)
      const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setServices(servicesList)
    }
    const fetchProducts = async () => {
      const productsCollection = collection(database, 'products')
      const productsSnapshot = await getDocs(productsCollection)
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setProducts(productsList)
    }
    fetchPatients()
    fetchServices()
    fetchProducts()
  }, [])

  // ** Handlers
  const handleSubmit = async event => {
    event.preventDefault()
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader title='Nuevo Expediente' titleTypographyProps={{ variant: 'h6' }} />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item container>
              <PatientsSelect patient={patient} setPatient={setPatient} patients={patients} />
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
              setServices={setServices} />
            </Grid>
            <Grid sx={{ marginTop: 5 }} container item spacing={2}>
              <Button
                sx={{ marginRight: 2 }}
                onClick={handleSubmit}
                type='submit'
                variant='contained'
                size='small'
                startIcon={<AddCircleIcon />}
              >
                Agregar
              </Button>
              <Button
                onClick={() => setOpen(false)}
                type='button'
                variant='outlined'
                size='small'
                startIcon={<AddCircleIcon />}
              >
                Cancelar
              </Button>
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
  }
}
