import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
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
import { Typography } from '@mui/material'
// ** Firestore Imports
import { database, FIREBASE_APP } from 'src/firebase'
import { collection, addDoc } from 'firebase/firestore'
// ** Custom Components
import { Backspace } from '@mui/icons-material'
import { ViewDialog } from '../ViewDialog'
import { CategoryForm } from './CategoryForm'
//* new Service */
import { newService } from 'src/hooks/services/newService'

export const ServiceForm = ({ open, setOpen }) => {
  const [newCategory, setNewCategory] = useState(false)
  const [service, setService] = useState({
    name: '',
    category: '',
    description: '',
    price: 0.0,
    cost: 0.0,
    duration: 0 // in minutes
  })
  const router = useRouter()
  const handleServiceCategoryChange = value => {
    setService({ ...service, category: value })
  }
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const serviceRef = await newService(service)
      console.log('Service added: ', serviceRef)
      setOpen(false)
    } catch (error) {
      console.error('Error creating new service: ', error)
    }
  }

  const handleChange = event => {
    setService({ ...service, [event.target.name]: event.target.value })
  }

  return (
    <Card sx={{ minWidth: 400, maxWidth: 400 }}>
      <form onSubmit={handleSubmit}>
        <CardHeader title='Agregar Servicio' titleTypographyProps={{ variant: 'h6' }} />
        <Divider />
        <CardContent>
          <Grid sx={{ gap: 3 }} container spacing={2}>
            <Grid item>
              <TextField
                size='small'
                id='name'
                name='name'
                autoFocus
                type='text'
                sx={{ width: '98%', marginRight: 8 }}
                label='Nombre de Servicio'
                placeholder='Nombre del Servicio'
                value={service.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid container item>
              <ServiceCategorySelect
                serviceCategory={service.category}
                setServiceCategory={handleServiceCategoryChange}
                isDialogOpen={newCategory}
              />
              <Button
                startIcon={<AddCircleIcon fontSize='' />}
                sx={{ width: 40 }}
                variant='outlined'
                size='large'
                onClick={() => setNewCategory(true)}
              ></Button>
              <ViewDialog open={newCategory} setOpen={setNewCategory}>
                <CategoryForm setOpen={setNewCategory}/>
              </ViewDialog>
            </Grid>
            <Grid item container> 
              <TextField
                size='small'
                value={service.price}
                type='number'
                id='price'
                name='price'
                onChange={handleChange}
                sx={{ width: '40%' }}
                label='Precio'
                placeholder='Precio del Servicio'
              />
              <Typography variant='h6' color='secondary'>
                DOP.
              </Typography>
            </Grid>
            <Grid item container>
              <TextField
                size='small'
                value={service.duration}
                type='number'
                id='duration'
                name='duration'
                onChange={handleChange}
                sx={{ width: '40%' }}
                label='Duración'
                placeholder='Duración del Servicio'
              />
              <Typography sx={styles.helperText}>en Minutos</Typography>
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
                color='secondary'
                variant='outlined'
                size='small'
                startIcon={<Backspace />}
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
  helperText: {
    fontSize: 10,
    color: '#fff',
    alignSelf: 'center',
    padding: 2,
    backgroundColor: '#00A99D'
  }
}
