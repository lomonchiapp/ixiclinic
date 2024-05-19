import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'


function ProductForm() {
  return (

    <Box>
      <Typography variant="h6">Agregar Cliente</Typography>
      <Divider sx={{mb: 2}} />
      <form>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3}}>
          <TextField id="outlined-basic" label="Nombre" variant="outlined" />
          <TextField id="outlined-basic" label="Apellido" variant="outlined" />
        </Box>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3}}>
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField id="outlined-basic" label="Teléfono" variant="outlined" />
        </Box>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3}}>
          <TextField id="outlined-basic" label="Dirección" variant="outlined" />
          <TextField id="outlined-basic" label="Ciudad" variant="outlined" />
        </Box>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3}}>
          <TextField id="outlined-basic" label="Código Postal" variant="outlined" />
          <TextField id="outlined-basic" label="País" variant="outlined" />
        </Box>
        <Button variant="contained" color="primary">Agregar Cliente</Button>
      </form>
    </Box>
  );
}

export default ClientForm;
