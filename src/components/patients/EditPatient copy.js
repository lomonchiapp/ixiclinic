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

// Global State
import { usePatientStore } from 'src/hooks/globalStates/usePatientStore'

export const EditPatient = ({setOpen}) => {
  const {selectedPatient, setSelectedPatient} = usePatientStore()
  const [patient, setPatient] = useState(selectedPatient)

  useEffect(()=> {
    setPatient(selectedPatient)
  }, [selectedPatient])

  // ** Router
  const router = useRouter()

  // ** Local States
  const [dobVisible, setDobVisible] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [advanced, setAdvanced] = useState(false)

  // ** Handlers
  const updatePatient = async () => {
    const docRef = doc(db, 'patients', patient.id)
    await updateDoc(docRef, selectedPatient)
    setOpen(false)
  }



  const handleOpenDialog = () => setIsDialogOpen(true)


  return (
    <form>
      <Card>
        <CardHeader title='Nuevo Paciente' titleTypographyProps={{ variant: 'h6' }} />
        <Divider />
        <CardContent>
          <Grid container spacing={5} sx={{ alignContent: 'start' }}>
            <Grid item sx={{ display: 'flex' }}>
              <Grid item>
                <TextField
                  value={patient.firstName}
                  size="small"
                  onChange={e => setPatient({...patient, firstName: e.target.value})}
                  placeholder='Nombre del Paciente'
                  />
              </Grid>
              <Grid item>
                <TextField
                  value={patient.lastName}
                  size="small"
                  onChange={e => setPatient({...patient, lastName: e.target.value})}
                  placeholder='Apellido del Paciente'
                  />
              </Grid>
            </Grid>

            <Grid item xs={12}>

              <TextField
                size='small'
                sx={{ width: 390, WebkitAppearance: 'none' }}
                value={patient.phone}
                onChange={e => setPatient({...patient, phone: e.target.value})}
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
                type='date'
                size='large'
                onChange={e => setPatient({...patient, dateOfBirth: e.target.value})}
                value={patient.dateOfBirth}
                sx={{ minWidth: 250, marginRight: 9 }}
                label='Fecha de nacimiento'
                InputLabelProps={{
                  shrink: true
                }}
              />
              <FormControlLabel
                sx={{ border: 'solid 1px #e0e0e0', paddingRight: 2, borderRadius: 5 }}
                control={
                  <Switch checked={isAllergic} onChange={() => setIsAllergic(prevIsAllergic => !prevIsAllergic)} size='large' />
                }
                label='Alergico'
              />
            </Grid>
            <Grid item>
              {isAllergic && (
                <TextField
                  onChange={e => setPatient({...patient, allergies: e.target.value})}
                  value={patient.allergies}
                  sx={{ width: 270 }}
                  size='small'
                  label='Alergias'
                  placeholder='Alergias del cliente'
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={patient.usedProducts}
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
                onChange={e => setPatient({...patient, pastProcedures: e.target.value})}
                sx={{ width: 390 }}
                value={patient.pastProcedures}
                rows={2}
                multiline
                size='small'
                label='Procedimientos Anteriores'
                placeholder='Escriba comentarios sobre el cliente'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setPatient({...patient, suggestions: e.target.value})}
                sx={{ width: 390 }}
                value={patient.suggestions}
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
                    value={patient.notes}
                    onChange={e => setPatient({...patient, notes: e.target.value})}
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
                        value={patient.cedulaRnc}
                        sx={{ width: 390 }}
                        size='small'
                        label='C&eacute;dula/RNC'
                        placeholder='RNC / Cedula'
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

                        sx={{ width: 390 }}
                        size='small'
                        type='email'
                        label='Email'
                        placeholder='Correo'
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
            <Grid item xs={12}>
              <Button
                sx={{ marginRight: 2 }}
                onClick={updatePatient}
                type='button'
                variant='contained'
                size='large'
                startIcon={<AddCircleIcon />}
              >
                Actualizar
              </Button>
              <Button onClick={() => setOpen(false)} type='button' variant='outlined' size='large' startIcon={<AddCircleIcon />}>
                Volver
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

    </form>
  )
}

