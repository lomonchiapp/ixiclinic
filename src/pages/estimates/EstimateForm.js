import ReactDOM from 'react-dom'
import { useState, useEffect, useRef } from 'react'
// ** MUI Imports
import {
  Divider,
  Card,
  Grid,
  Button,
  TextField,
  CardHeader,
  CardContent,
  Autocomplete,
  FormControl,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'

//Componentes (Inputs)
import { QuantityInput, RateInput, DiscountInput, TaxInput } from 'src/components/inputs/tableInputs'
import { ProductInput } from 'src/components/inputs/ProductInput'
//Estados Globales
import { useForm, FormState } from 'react-hook-form'
import { useEstimateState } from '../../contexts/estimateState'
import tableState from 'src/contexts/rowsState'
// Import API
import { createEstimate } from '../../api/patients.api'
import { getClients } from 'src/api/patients.api'
import { getProducts } from 'src/api/products.api'
import useRowsState from 'src/contexts/rowsState'
//Funciones

const EstimateForm = () => {

  const {inputValues, setInputValues, addRow, count, setCount, selectedValues, setSelectedValues} = useRowsState()

  function handleRemoveInput(index) {
    const values = [...inputValues]
    values.splice(index, 1)
    setInputValues(values)
  }




  //Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // Estados Globales
  const {
    client,
    setClient,
    clients,
    setClients,
    descriptions,
    setDescriptions,
    prefix,
    setPrefix,
    date,
    setDate,
    estimateNumber,
    selectedProd
  } = useEstimateState()

  //Fetch de Clients
  useEffect(() => {
    async function loadClients() {
      const res = await getClients()
      setClients(res.data)
    }
    loadClients()
  }, [])

  return (
    <Card>
      {inputValues.map((row, index) => (
  <div key={index}>
    <p>{row.product}</p>
  </div>
))}
      {selectedValues.map((value, index) => (
  <div key={index}>
    <p>{value.product}</p>
  </div>
))}
      <CardHeader sx={{ paddingBottom: 20 }} title='Crear Nueva Cotización' />
      <CardContent>
        <Grid
          item
          sx={{
            position: 'absolute',
            right: 45,
            top: 105
          }}
        >
          <Box
            sx={{
              border: 'solid 1px #e0e0e0',
              padding: 5,
              borderRadius: 5
            }}
            item
            xs={12}
            sm={6}
          >
            <Typography>Fecha</Typography>
            <Typography variant='h6'>{date.toLocaleDateString()}</Typography>
            <Typography sx={{ color: 'red' }}>Fecha de Vencimiento</Typography>
            <Typography variant='h6'>{date.toLocaleDateString()}</Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography>COT.</Typography>
            <Typography variant='h6'>0000{estimateNumber}</Typography>
          </Box>
        </Grid>
        <form>
          <Grid container spacing={2}>
            {/* Seccion Dropdown con listado de clientes */}
            <Grid sx={{ marginBottom: 15 }} item xs={12} sm={6} md={3} lg={12}>
              <FormControl sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ minWidth: '6%' }}>Cliente</Typography>
                <Autocomplete
                  sx={{ width: '30%' }}
                  id='client'
                  options={clients}
                  getOptionLabel={option => option.company}
                  renderInput={params => <TextField {...params} label='Seleccione un Cliente' size='small' />}
                  onChange={(e, value) => {
                    setClient(value)
                  }}
                />
              </FormControl>
            </Grid>

            {/*Fin del dropdown*/}
            <Grid item xs={12} sm={6}>
              <Divider />
              <FormControl sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ minWidth: '12%' }}>Vendedor</Typography>
                <Autocomplete
                  sx={{ width: '40%', marginBlock: 5 }}
                  id='client'
                  options={clients}
                  getOptionLabel={option => option.company}
                  renderInput={params => <TextField {...params} label='Seleccione un Cliente' size='small' />}
                  onChange={(e, value) => {
                    setClient(value)
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ width: '50%' }} />
              <Grid item xs={12} sm={6}>
                <FormControl
                  sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}
                >
                  <Typography sx={{ minWidth: '12%' }}>Asunto</Typography>
                  <TextField
                    sx={{ marginBlock: 5, width: '40%' }}
                    id='subject'
                    label='Motivo de la cotizacion...'
                    fullWidth
                    multiline
                    rows={3}
                    size='small'
                  />
                </FormControl>
              </Grid>
              <TableContainer sx={{ height: 500 }} component={Paper}>
                <table style={styles.table} aria-label='simple table'>
                  <thead>
                    <tr style={{ backgroundColor: '#EEEEEE' }}>
                      <th style={styles.cellHead}>#</th>
                      <th style={styles.cellHead}>Detalles del Articulo</th>
                      <th style={styles.cellHead}>Cantidad</th>
                      <th style={styles.cellHead}>Tarifa</th>
                      <th style={styles.cellHead}>Descuento</th>
                      <th style={styles.cellHead}>Impuesto</th>
                      <th style={styles.cellHead}>Importe</th>
                    </tr>
                  </thead>
                  <tbody id='newlink'>
                    {inputValues.map((row, index) => (
                       <tr key={index}>
                       <td style={styles.cell}>{index + 1}</td>
                       <td style={styles.cell}>
                         <ProductInput value={row.product} index={index} onChange={value => handleInputChange(index, 'product', value)} values={inputValues} setValues={setInputValues}  />
                       </td>
                       <td style={styles.cell}>
                         <QuantityInput value={row.quantity} index={index} onChange={value => handleInputChange(index, 'quantity', value)} />
                       </td>
                       <td style={styles.cell}>
                         <RateInput value={row.rate} index={index} onChange={value => handleInputChange(index, 'rate', value)} />
                       </td>
                       <td style={styles.cell}>
                         <DiscountInput value={row.discount} index={index} onChange={value => handleInputChange(index, 'discount', value)} />
                       </td>
                       <td style={styles.cell}>
                         <TaxInput value={row.tax} index={index} onChange={value => handleInputChange(index, 'tax', value)} />
                       </td>
                       <td style={styles.cell}>0.00</td>
                     </tr>
                    ))}
                  </tbody>
                </table>
              </TableContainer>
              <Button variant='contained' color='primary'>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
        <Button onClick={addRow}>Agregar Producto</Button>
      </CardContent>
    </Card>
  )
}

const styles = {
  cellHead: {
    border: 'solid 1px #e0e0e0',
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    height: '3rem'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  cell: {
    border: 'solid 1px #E7E7E7',
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 1
  }
}
export default EstimateForm
