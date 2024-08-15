// ** React Imports
import { useForm, FormState } from 'react-hook-form'
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
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Box from '@mui/material/Box'

// ** Icons Imports
import EditNoteIcon from '@mui/icons-material/EditNote'
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import Phone from 'mdi-material-ui/Phone'
import Close from '@mui/icons-material/Close'

// ** Firestore Imports
import { database } from 'src/firebase'
import { collection, addDoc } from 'firebase/firestore'

// ** Custom Components
import SkinTypeSelect from 'src/components/inputs/SkinTypeSelect'
import SkinFormDialog from 'src/components/skinTypes/SkinFormDialog'

export const PatientForm = () => {
  // ** Router
  const router = useRouter()

  // ** Hook Form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm()

  // ** Local States
  const [dobVisible, setDobVisible] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [advanced, setAdvanced] = useState(false)
  const [isAllergic, setIsAllergic] = useState(false)
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    isAllergic: false,
    allergy: '',
    usedProducts: '',
    skinType: '',
    pastProcedures: '',
    suggestions: '',
    notes: '',
    rnc: '',
    email: ''
  })

  // ** Handlers
  const fNameChange = e => setData({ ...data, firstName: e.target.value })
  const lNameChange = e => setData({ ...data, lastName: e.target.value })
  const phoneChange = e => setData({ ...data, phone: e.target.value })
  const dobChange = e => setData({ ...data, dateOfBirth: e.target.value })
  const allergyChange = e => setData({ ...data, allergy: e.target.value })
  const usedProductsChange = e => setData({ ...data, usedProducts: e.target.value })
  const skinTypeChange = e => setData({ ...data, skinType: e.target.value })
  const pastProceduresChange = e => setData({ ...data, pastProcedures: e.target.value })
  const suggestionsChange = e => setData({ ...data, suggestions: e.target.value })
  const notesChange = e => setData({ ...data, notes: e.target.value })
  const rncChange = e => setData({ ...data, rnc: e.target.value })
  const emailChange = e => setData({ ...data, email: e.target.value })

  const handleOpenDialog = () => setIsDialogOpen(true)
  const handleChangeAl = e => setIsAllergic(e.target.checked)

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  const onSubmit = handleSubmit(async data => {
    try {
      const docRef = await addDoc(collection(database, 'patients'), data)
      console.log('Document written with ID: ', docRef.id)
      router.push('/patients')

    } catch (e) {
      console.log('Error adding document:', e)
    }
  })

  const addAndRecord = async (data) => {
    try {
      const docRef = await addDoc(collection(database, 'patients'), data)
      console.log('Document written with ID: ', docRef.id)
      router.push('/records/newRecord')
    } catch (e) {
      console.log('Error adding document:', e)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader title='Nuevo Paciente' titleTypographyProps={{ variant: 'h6' }} />
        <Divider />
        <CardContent>
          <Grid container spacing={5} sx={{ alignContent: 'start' }}>
            <Grid item sx={{ display: 'flex' }}>
              <Grid item>
                <TextField
                  {...register('firstName')}
                  value={data.firstName}
                  size='small'
                  onChange={fNameChange}
                  sx={{ width: '98%', marginRight: 8 }}
                  label='Nombres'
                  placeholder='Nombre del Cliente'
                />
              </Grid>
              <Grid item>
                <TextField
                  {...register('lastName')}
                  value={data.lastName}
                  size='small'
                  sx={{ width: '100%' }}
                  onChange={lNameChange}
                  label='Apellidos'
                  placeholder='Apellidos del Cliente'
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('phone')}
                size='small'
                sx={{ width: 390, WebkitAppearance: 'none' }}
                value={data.phone}
                onChange={phoneChange}
                type='number'
                label='No. de Contacto.'
                placeholder='+1-123-456-8790'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('dateOfBirth')}
                type='date'
                size='large'
                onChange={dobChange}
                sx={{ minWidth: 250, marginRight: 9 }}
                label='Fecha de nacimiento'
                InputLabelProps={{
                  shrink: true
                }}
              />
              <FormControlLabel
                sx={{ border: 'solid 1px #e0e0e0', paddingRight: 2, borderRadius: 5 }}
                control={
                  <Switch {...register('isAllergic')} checked={isAllergic} onChange={handleChangeAl} size='large' />
                }
                label='Alergico'
              />
            </Grid>
            <Grid item>
              {isAllergic && (
                <TextField
                  {...register('allergy')}
                  sx={{ width: 270 }}
                  size='small'
                  label='Alergias'
                  placeholder='Alergias del cliente'
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('usedProducts')}
                sx={{ width: 390 }}
                rows={2}
                multiline
                size='small'
                label='Productos que utiliza'
                placeholder='Escriba comentarios sobre el cliente'
              />
            </Grid>
            <Grid item container xs={12}>
              <SkinTypeSelect isDialogOpen={isDialogOpen} />{' '}
              <Button
                startIcon={<AddCircleIcon />}
                sx={{ maxWidth: 160, marginLeft: 2 }}
                variant='outlined'
                size='small'
                onClick={handleOpenDialog}
              >
                NUEVO TIPO
              </Button>
              <SkinFormDialog open={isDialogOpen} setOpen={setIsDialogOpen} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('pastProcedures')}
                sx={{ width: 390 }}
                rows={2}
                multiline
                size='small'
                label='Procedimientos Anteriores'
                placeholder='Escriba comentarios sobre el cliente'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('suggestions')}
                sx={{ width: 390 }}
                rows={2}
                multiline
                size='small'
                label='Recomendaciones'
                placeholder='Tratamiento recomendado...'
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
              {dobVisible ? (
                <Box>
                  <TextField
                    {...register('notes')}
                    sx={{ width: 390 }}
                    rows={4}
                    multiline
                    size='small'
                    label='Notas. (Uso interno)'
                    placeholder='Escriba comentarios sobre el cliente'
                  />
                  <Button
                    color='error'
                    variant='outlined'
                    onClick={() => setDobVisible(!dobVisible)}
                    startIcon={<Close />}
                    sx={{ marginLeft: 5, fontSize: 12, fontVariant: 'small-caps' }}
                  >
                    Cancelar
                  </Button>
                </Box>
              ) : (
                <Button
                  variant='outlined'
                  onClick={() => setDobVisible(!dobVisible)}
                  startIcon={<EditNoteIcon />}
                  sx={{ fontSize: 12, fontVariant: 'small-caps' }}
                >
                  AGREGAR NOTA
                </Button>
              )}
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Divider />
              <Grid item>
                <FormControlLabel
                  sx={{ border: 'solid 1px #e0e0e0', paddingRight: 2, marginBottom: 5, borderRadius: 5 }}
                  control={
                    <Switch
                      checked={advanced}
                      onChange={() => setAdvanced(prevAdvanced => !prevAdvanced)}
                      size='large'
                    />
                  }
                  label='Campos Avanzados'
                />

                {advanced && (
                  <Grid container spacing={5} sx={{ paddingBottom: 5 }}>
                    <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
                      <TextField
                        {...register('rnc')}
                        sx={{ width: 390 }}
                        size='small'
                        label='C&eacute;dula/RNC'
                        placeholder='Leonard Carter'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <ContactEmergencyIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
                      <TextField
                        {...register('email')}
                        sx={{ width: 390 }}
                        size='small'
                        type='email'
                        label='Email'
                        placeholder='carterleonard@gmail.com'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <EmailOutline />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Grid
        spacing={2}
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 5,
          zIndex: 1000,
          border: 'solid 1px #e0e0e0',
          backgroundColor: 'white',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)'
        }}
      >
        <Button
          sx={{ marginRight: 2 }}
          onClick={() => addAndRecord(data)}
          type='button'
          variant='contained'
          size='large'
          startIcon={<AddCircleIcon />}
        >
          Agregar y Crear Expediente
        </Button>
        <Button onClick={onSubmit} type='button' variant='outlined' size='large' startIcon={<AddCircleIcon />}>
          Agregar y Volver a la Lista
        </Button>
      </Grid>
    </form>
  )
}

