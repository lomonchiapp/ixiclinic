// ** MUI Imports
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Autocomplete from '@mui/material/Autocomplete'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
// ** Icons Imports
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import Phone from 'mdi-material-ui/Phone'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import Radio from '@mui/material/Radio'
import BusinessIcon from '@mui/icons-material/Business';
import {useForm, FormState } from 'react-hook-form'
import { InputLabel, MenuItem } from '@mui/material'
import { useState, useEffect } from 'react'
import { set } from 'nprogress'
import {createClient} from '../../api/clients.api'

const ClientForm = () => {
  const {register, handleSubmit, formState:{errors}} = useForm()
  const saludos = ['Sr.', 'Sra.', 'Srita.', 'Ing.', 'Lic.', 'Dr.', 'Dra.']
  const [saludo, setSaludo] = useState('')
  const handleChange = (event) => {
    setSaludo(event.target.value)
  }
  const [firstName, setFirstName] = useState('')
  const fNameChange = (event) => {
    setFirstName(event.target.value)
  }
  const [lastName, setLastName] = useState('')
  const lNameChange = (event) => {
    setLastName(event.target.value)
  }
  const [company, setCompany] = useState('')
  const CompanyChange = (event) => {
    setCompany(event.target.value)
  }
  const [error, setError] = useState({
    error: false,
    message: '',
  })
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }
  const ciudades = ['Santo Domingo', 'Santiago', 'La Vega', 'San Pedro de Macorís', 'La Romana', 'Higüey', 'Puerto Plata', 'San Francisco de Macorís', 'Bonao', 'Moca', 'Salcedo', 'Cotuí', 'Dajabón', 'Monte Cristi', 'San Juan de la Maguana', 'Azua', 'Baní', 'Barahona', 'Hato Mayor', 'Jimaní', 'Nagua', 'Neiba', 'Pedernales', 'Monte Plata', 'Samaná', 'San Cristóbal', 'El Seibo', 'Santo Domingo Este', 'Santo Domingo Norte', 'Santo Domingo Oeste', 'San José de Ocoa', 'Santiago Rodríguez', 'Valverde', 'Independencia']
  const onSubmit = handleSubmit(async (data) => {

    //errores

    if(data.type == null){
      setError({
        error: true,
        message: 'Debe seleccionar un tipo de cliente'
      })
      return
    }


    console.log(data)
    const res = await createClient(data)
    console.log(res)
  })

  return (
    <Card>
      <CardHeader title='Nuevo Cliente' titleTypographyProps={{ variant: 'h6' }} />
      <Divider />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={5} sx={{alignContent: 'start'}}>
      <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
        <FormControl
        {...register('type')}
        error={error.error}
        helperText={error.message}
        >
        <FormLabel component='legend'>Tipo de Cliente</FormLabel>
        <RadioGroup row
        >
        <FormControlLabel value="individual" control={<Radio />} label="Individual" />
        <FormControlLabel  value="business" control={<Radio />} label="Empresarial" />
        </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
              <TextField {...register('company')}
                sx={{width:390}}
                size='small'
                onChange={CompanyChange}
                value={company}
                label='Empresa'
                placeholder='Leonard Carter'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <BusinessIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
    <Grid item sx={{display:'flex'}}>
      <Grid item xs={4} sm={4} lg={4} xl={4} md={4}>
        <FormControl size='small'>
          <InputLabel>Saludo</InputLabel>
            <Select {...register('mp_greet')}
              sx={{width: 100}}
              label='Saludo'
              placeholder='Sr.'
              value={saludo}
              onChange={handleChange}

            >
              {saludos.map((saludo) => (
                <MenuItem key={saludo} value={saludo}>
                  {saludo}
                </MenuItem>
              ))}
            </Select>
        </FormControl>
      </Grid>
      <Grid item>
              <TextField {...register('mp_name')}
              value={firstName}
              size='small'
              onChange={fNameChange}
              sx={{width:100}}
              label='Nombre'
              placeholder='Nombre del Cliente'
               />
            </Grid>
            <Grid item>
              <TextField {...register('mp_lastname')}
              value={lastName}
              size='small'
              sx={{width:190}}
              onChange={lNameChange}
              label='Apellidos'
              placeholder='Apellidos del Cliente'
              />
            </Grid>
    </Grid>

            <Grid item xs={12}>
        <FormControl sx={{width:390}} size='small'>
          <InputLabel>Nombre Para Mostrar</InputLabel>
            <Select
              label='Saludo'
              placeholder='Sr.'
              {...register('displayname')}
            >
                <MenuItem key={'1'} value={`${saludo} ${firstName} ${lastName}`}>
                  {saludo} {firstName} {lastName}
                </MenuItem>
                <MenuItem key={'2'} value={`${saludo} ${lastName}, ${firstName}`}>
                  {saludo} {lastName}, {firstName}
                </MenuItem>
                <MenuItem key={'3'} value={`${saludo} ${lastName}`}>
                  {saludo} {lastName}
                </MenuItem>
                <MenuItem key={'saludo_company'} value={`${company}`}>
                  {company}
                </MenuItem>
            </Select>
        </FormControl>
               </Grid>
               <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
              <TextField {...register('rnc')}
                sx={{width:390}}
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
              <TextField {...register('email')}
                sx={{width:390}}
                size='small'
                type='email'
                label='Email'
                placeholder='carterleonard@gmail.com'
                helperText='You can use letters, numbers & periods'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutline />
                    </InputAdornment>
                  )
                }}
              />

              <Grid>
              <FormControl {...register('city')}>
                <Autocomplete
                options={ciudades}
                  sx={{width:390, mt:3}}
                  size='small'
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='outlined'
                      label='Seleccione una Ciudad'

                    />
                  )}
                />
              </FormControl>
              </Grid>

            <Grid item xs={12}>
              <TextField {...register('address')}
                sx={{width:390, mt:3}}
                rows={3}
                multiline
                size='small'
                label='Direccion / Domicilio'
                placeholder='Escriba comentarios sobre el cliente'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LocationOnIcon />
                    </InputAdornment>
                  )
                }}
              />
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <TextField {...register('phone')}
                size='small'
                sx={{width:390, WebkitAppearance: 'none'}}
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
              <TextField {...register('comments')}
                sx={{width:390}}
                rows={4}
                multiline
                size='small'
                label='Notas. (Uso interno)'
                placeholder='Escriba comentarios sobre el cliente'
              />
              </Grid>
            <Grid item xs={12}>
              <Button
               type='submit'
               variant='contained'
               size='large'
                startIcon={<AddCircleIcon />}
                >
                Agregar Cliente
              </Button>

            </Grid>
          </Grid>
        </form>
      </CardContent>

    </Card>

  )
}

export default ClientForm
