// ** MUI Imports
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import CloseIcon from '@mui/icons-material/Close'
import { ciudades } from 'src/data/ciudades'

// ** Icons Imports
import EditNoteIcon from '@mui/icons-material/EditNote'
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'
import Phone from 'mdi-material-ui/Phone'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import { useForm, FormState, Form } from 'react-hook-form'
import { InputLabel, MenuItem, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { createPatient } from '../../api/patients.api'
import { addMedicine } from 'src/api/medicines.api'
const NewMedicineForm = ({ open, setOpen, medicine, setMedicine }) => {

  const [presentation, setPresentation] = useState('pill')
  const [administration, setAdministration] = useState('oral')
  const onChangeName = e => {
    setMedicine({ ...medicine, name: e.target.value })
  }
  const onChangePresentation = e => {
    setMedicine({ ...medicine, presentation: e.target.value })
  }

  const onChangeAdministration = e => {
    setMedicine({ ...medicine, administration: e.target.value })
  }

  const onSubmit = async e => {
    e.preventDefault()
    try {
      const response = await addMedicine(medicine)
      setMedicine(response.data)
      setMedicine({ name: '', presentation: '' })
      setOpen(false)
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const presentations = [
    { value: 'pill', label: 'Pastillas' },
    { value: 'syrup', label: 'Jarabe' },
    { value: 'injection', label: 'Inyección' },
    { value: 'cream', label: 'Pomada' },
    { value: 'drop', label: 'Gotas' }
  ]
  const administrations = [
    { value: 'oral', label: 'Oral' },
    { value: 'intramuscular', label: 'Intramuscular' },
    { value: 'intravenous', label: 'Intravenosa' },
    { value: 'topical', label: 'Tópica' },
    { value: 'subcutaneous', label: 'Subcutánea' }
  ]
  return (
    <form onSubmit={onSubmit}>
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={5}>
            <Grid sx={{ justifyContent:'center' }} item container>
              <TextField
                value={medicine.name}
                size='small'
                variant='standard'
                onChange={onChangeName}
                sx={{ width: '60%', marginRight: 3 }}
                label='Nombre del medicamento'
                placeholder='Nombre del Medicamento'
              />
              <FormControl>
              <InputLabel id='presentation'>Presentación</InputLabel>
              <Select label='Presentacion' placeholder='sxxx' onChange={onChangePresentation} variant='outlined'>
                {presentations.map(presentation => (
                  <MenuItem key={presentation.value} value={presentation.label}>
                    {presentation.label}
                  </MenuItem>
                ))}
              </Select>
              </FormControl>
              <Grid container sx={{justifyContent:'center', alignContent:'center', marginTop:5, border:'1px solid #EDEDED', padding:4}}>
              <Typography sx={{fontSize:15, paddingTop:4, paddingRight:3}}>Via de Administración del medicamento</Typography>
              <FormControl sx={{width:'30%'}}>
              <InputLabel id='administration'>Seleccione una</InputLabel>
              <Select
              label='Administración'
              id='administration'
              onChange={onChangeAdministration}
              variant='outlined'
              size='large'
              >
                {administrations.map(administration => (
                  <MenuItem key={administration.value} value={administration.label}>
                    {administration.label}
                  </MenuItem>
                ))}
              </Select>
              </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{marginTop:6, textAlign:'center'}}>
            <Button
              sx={{ marginRight: 2 }}
              onClick={onSubmit}
              type='button'
              variant='contained'
              size='large'
              startIcon={<AddCircleIcon />}
            >
              Agregar
            </Button>
            <Button onClick={() => setOpen(false)} type='button' variant='outlined' size='large' startIcon={<AddCircleIcon />}>
              Cancelar
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </form>
  )
}

export default NewMedicineForm
