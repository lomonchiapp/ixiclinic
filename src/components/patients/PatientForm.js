// ** React Imports
import { useState, useEffect } from 'react'
import InputMask from 'react-input-mask'

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

// ** Hooks
import { newPatient } from 'src/hooks/patients/newPatient'
import { useNewAndRecord } from 'src/hooks/patients/useNewAndRecord'

// ** Custom Components
import SkinTypeSelect from 'src/components/inputs/SkinTypeSelect'
import SkinFormDialog from 'src/components/skinTypes/SkinFormDialog'

// Global State
import { usePatientStore } from 'src/hooks/globalStates/usePatientStore'
import {useGlobalStore} from 'src/contexts/useGlobalStore'
import CloseIcon from '@mui/icons-material/Close'

export const PatientForm = ({ setOpen }) => {
  // ** Hooks
  const { newAndRecord } = useNewAndRecord()
  // ** Router

  // ** Local States
  const [dobVisible, setDobVisible] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [advanced, setAdvanced] = useState(false)
  // ** Global State
  const {fetchPatients} = useGlobalStore()
  const { patient, setPatient } = usePatientStore()

  // ** Handlers
  const handleCreate = async () => {
    await newPatient(patient)
    fetchPatients()
    setOpen(false)
  }

  const handleOpenDialog = () => setIsDialogOpen(true)

  return (
    <form>
      <Card sx={{ position: 'relative' }}>
        <CloseIcon
          sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
          onClick={() => setOpen(false)}
        />
        <CardHeader title='Nuevo Paciente' titleTypographyProps={{ variant: 'h6' }} />
        <Divider />
        <CardContent>
          <Grid container spacing={3} sx={styles.formContainer}>
            <Grid container spacing={3} sx={{ display: 'flex' }}>
              <Grid item>
                <TextField
                  value={patient.firstName}
                  size='small'
                  onChange={e => setPatient({ ...patient, firstName: e.target.value })}
                  placeholder='Nombre del Paciente'
                />
              </Grid>
              <Grid item>
                <TextField
                  value={patient.lastName}
                  size='small'
                  onChange={e => setPatient({ ...patient, lastName: e.target.value })}
                  placeholder='Apellido del Paciente'
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <InputMask
                mask='+1-999-999-9999'
                value={patient.phone}
                onChange={e => setPatient({ ...patient, phone: e.target.value })}
              >
                {() => (
                  <TextField
                    sx={styles.textField}
                    size='small'
                    type='tel'
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
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='date'
                size='large'
                onChange={e => setPatient({ ...patient, dateOfBirth: e.target.value })}
                value={patient.dateOfBirth}
                sx={{ marginRight: 9 }}
                label='Fecha de nacimiento'
                InputLabelProps={{
                  shrink: true
                }}
              />
              <FormControlLabel
                sx={{ border: 'solid 1px #e0e0e0', paddingRight: 2, borderRadius: 5 }}
                control={
                  <Switch
                    checked={patient.isAllergic}
                    onChange={() => setPatient(({ ...patient, isAllergic: !patient.isAllergic }))}
                    size='large'
                  />
                }
                label='Alergico'
              />
            </Grid>
            <Grid item>
              {patient.isAllergic && (
                <TextField
                  sx={styles.textField}
                  onChange={e => setPatient({ ...patient, allergies: e.target.value })}
                  value={patient.allergies}
                  size='small'
                  label='Alergias'
                  placeholder='Alergias del cliente'
                />
              )}
            </Grid>
            <Grid item container xs={12}>
              <SkinTypeSelect isDialogOpen={isDialogOpen} />{' '}
              <Button
                startIcon={<AddCircleIcon />}
                sx={{ marginLeft: 2 }}
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
                sx={styles.textField}
                value={patient.usedProducts}
                onChange={e => setPatient({ ...patient, usedProducts: e.target.value })}
                rows={2}
                multiline
                size='small'
                label='Productos que utiliza'
                placeholder='Escriba comentarios sobre el cliente'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={styles.textArea}
                onChange={e => setPatient({ ...patient, pastProcedures: e.target.value })}
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
                sx={styles.textArea}
                onChange={e => setPatient({ ...patient, suggestions: e.target.value })}
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
                    sx={styles.textArea}
                    value={patient.notes}
                    onChange={e => setPatient({ ...patient, notes: e.target.value })}
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
                        sx={styles.textField}
                        value={patient.cedulaRnc}
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
                        sx={styles.textField}
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
          <Box sx={styles.submitContainer}>
          <Button
              onClick={() => newAndRecord()}
              type='button'
              variant='contained'
              size='large'
              startIcon={<AddCircleIcon />}
            >
              Agregar y crear Expediente
            </Button>

            <Button
              onClick={() => handleCreate()}
              type='button'
              variant='outlined'
              size='large'
              startIcon={<AddCircleIcon />}
            >
              Agregar y Salir
            </Button>

          </Box>
        </CardContent>
      </Card>
    </form>
  )
}

const styles = {
  formContainer: {
    minWidth: '100%'
  },
  submitContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth:'80%',
    gap:3,
    pb:5,
  },
  textField: {
    minWidth: '80%'
  },
  textArea: {
    width: '80%',
    minHeight: 50
  }
}
