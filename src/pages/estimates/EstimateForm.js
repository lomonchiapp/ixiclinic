import ReactDOM from 'react-dom'
import { useState, useEffect, useRef } from 'react'
// ** MUI Imports
import {
  Divider, Card,Grid, Button, TextField, CardHeader, CardContent, Autocomplete,
  FormControl, Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper } from '@mui/material'

//Componentes (Inputs)
import { QuantityInput, RateInput, DiscountInput, TaxInput } from 'src/components/inputs/tableInputs'
import { ProductInput } from 'src/components/inputs/ProductInput'
//Estados Globales
import { useForm, FormState } from 'react-hook-form'
import { useEstimateState } from '../../contexts/estimateState'
import tableState from 'src/contexts/tableState'
// Import API
import { createEstimate } from '../../api/clients.api'
import { getClients } from 'src/api/clients.api'
import { getProducts } from 'src/api/products.api'
//Funciones
import { createData } from 'src/components/functions/createData'
import { newRow } from 'src/components/functions/newRow'


const EstimateForm = () => {

  //Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // Estados Globales
  const {client, setClient, clients, setClients,
    products, setProducts, descriptions, setDescriptions,
    prefix, setPrefix, date, setDate, estimateNumber,
    setEstimateNumber, rate, setRate, quantity, setQuantity,
    total, setTotal, subtotal, setSubtotal, shipping, setShipping,
    seller, setSeller} = useEstimateState()
  const {rows, setRows,
        addRow, removeRow} = tableState()

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
                <Table sx={styles.table} aria-label='simple table'>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#EEEEEE' }}>
                      <TableCell sx={styles.cellHead} width={'1%'}>
                        #
                      </TableCell>
                      <TableCell sx={styles.cellHead}>Detalles del Articulo</TableCell>
                      <TableCell sx={styles.cellHead} width={'10%'}>
                        Cantidad
                      </TableCell>
                      <TableCell sx={styles.cellHead}>Tarifa</TableCell>
                      <TableCell sx={styles.cellHead}>Descuento</TableCell>
                      <TableCell>Impuesto</TableCell>
                      <TableCell>Importe</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell sx={styles.cell}>{index + 1}</TableCell>
                        <TableCell sx={styles.cell}>
                          <ProductInput />
                        </TableCell>
                        <TableCell sx={styles.cell}>
                          <QuantityInput />
                        </TableCell>
                        <TableCell sx={styles.cell}>
                          <RateInput />
                        </TableCell>
                        <TableCell sx={styles.cell}>
                          <DiscountInput />
                        </TableCell>
                        <TableCell sx={styles.cell}>
                          <TaxInput />
                        </TableCell>
                        <TableCell sx={styles.cell}>{row.product.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button variant='contained' color='primary'>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
        <Button onClick={newRow}>Agregar Producto</Button>
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
    borderBottomWidth: 1
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
