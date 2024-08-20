// ** Next & React Imports
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

// ** MUI Imports
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// ** Global States
import { useProductStore } from 'src/hooks/globalStates/useProductStore'
import { useGlobalStore } from 'src/contexts/useGlobalStore'

// ** Icons Imports
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Close from '@mui/icons-material/Close'

// ** Hooks
import { newProduct } from 'src/hooks/products/newProduct'

// ** Custom Components
import { CategoryFormDialog } from './CategoryFormDialog'
import { ProvFormDialog } from './providers/ProvFormDialog'
import { Select } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

export const ProductForm = ({ open, setOpen }) => {
  // ** Local States
  const [newCategory, setNewCategory] = useState(false)
  const [newProvider, setNewProvider] = useState(false)
  const { product, setProduct } = useProductStore()
  const { fetchProdCategories, fetchProdProviders, fetchProducts, productCategories, productProviders } = useGlobalStore()
  const [note, setNote] = useState(false)

  // ** UseEffect
  useEffect(() => {
    fetchProdCategories()
    fetchProdProviders()
  }, [])

  const handleSubmit = async () => {
    await newProduct(product)
    setOpen(false)
    fetchProducts()
  }

  // ** Handlers
  const handleNameChange = value => setProduct({ ...product, name: value })
  const handlePriceChange = value => setProduct({ ...product, price: value })
  const handleCostChange = value => setProduct({ ...product, cost: value })
  const handleStockChange = value => setProduct({ ...product, stock: value })
  const handleDescriptionChange = value => setProduct({ ...product, description: value })

  return (
    <Card sx={{ minWidth: 450, maxWidth: 450 }}>
      <form onSubmit={handleSubmit}>
        <CardHeader title='Agregar Producto' titleTypographyProps={{ variant: 'h6' }} />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                size='large'
                id='name'
                name='name'
                autoFocus
                type='text'
                sx={{ width: '60%', marginRight: 2, marginBottom: 4 }}
                label='Nombre de Producto'
                placeholder='Nombre del Producto'
                value={product.name}
                onChange={e => handleNameChange(e.target.value)}
              />
              <TextField
                size='large'
                value={product.stock}
                type='number'
                id='stock'
                name='stock'
                onChange={e => handleStockChange(e.target.value)}
                sx={{ width: '30%', marginRight: 2 }}
                label='Cant en Almacén'
                placeholder='Cant. en Almacén'
              />
            </Grid>
            <Grid sx={{ alignItems: 'center', marginBottom: 4 }} container item>
              <Typography sx={styles.label}>Seleccione una Categoría:</Typography>
              <Select
                size='large'
                sx={{ width: '80%' }}
                value={product.category}
                onChange={e => setProduct({ ...product, category: e.target.value })}
              >
                {productCategories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              <AddCircleIcon
                onClick={() => setNewCategory(true)}
                fontSize='medium'
                color='primary'
                sx={{ cursor: 'pointer', marginLeft: 2 }}
              />
              <CategoryFormDialog setProduct={setProduct} open={newCategory} setOpen={setNewCategory} />
            </Grid>
            <Grid sx={{ alignItems: 'center' }} container item>
              <Typography sx={styles.label}>Seleccione un Proveedor:</Typography>

              <Select
                size='large'
                sx={{ width: '80%' }}
                value={product.provider || ''}
                onChange={e => setProduct({ ...product, provider: e.target.value })}
              >
                {productProviders.map(provider => (
                  <MenuItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </MenuItem>
                ))}
              </Select>
              <AddCircleIcon
                onClick={() => setNewProvider(true)}
                fontSize='medium'
                color='primary'
                sx={{ cursor: 'pointer', marginLeft: 2 }}
              />
              <ProvFormDialog
                setProduct={setProduct}
                open={newProvider}
                setOpen={setNewProvider}
              />
            </Grid>
            <Grid sx={{ marginTop: 4, alignItems: 'center' }} item container>
              <TextField
                size='large'
                value={product.price}
                type='number'
                id='price'
                name='price'
                onChange={e => handlePriceChange(e.target.value)}
                sx={{ width: '40%', marginRight: 2 }}
                label='Precio de Venta'
                placeholder='En cuanto lo vendes...'
              />
              <TextField
                size='large'
                value={product.cost}
                type='number'
                id='cost'
                name='cost'
                onChange={e => handleCostChange(e.target.value)}
                sx={{ width: '40%' }}
                label='Precio de Costo'
                placeholder='Cuanto te cuesta...'
              />
            </Grid>
            <Grid sx={{ marginTop: 4 }} container item>
              {note ? (
                <>
                  <TextField
                    size='large'
                    multiline
                    rows={4}
                    value={product.description}
                    type='text'
                    id='description'
                    name='description'
                    onChange={e => handleDescriptionChange(e.target.value)}
                    sx={{ width: 345 }}
                    label='Notas del Producto (uso interno)'
                    placeholder='¿Alguna nota al producto?...'
                  />
                  <Close onClick={() => setNote(false)} />
                </>
              ) : (
                <Button
                  onClick={() => setNote(true)}
                  sx={{ marginTop: 2, alignSelf: 'center' }}
                  variant='contained'
                  size='small'
                  color='secondary'
                >
                  Agregar Nota al Producto
                </Button>
              )}
            </Grid>
            <Grid sx={{ marginTop: 5 }} container item spacing={2}>
              <Button
                sx={{ marginRight: 2 }}
                onClick={handleSubmit}
                type='button'
                variant='contained'
                size='large'
                startIcon={<AddCircleIcon />}
              >
                Agregar
              </Button>
              <Button
                onClick={() => setOpen(false)}
                type='button'
                color='secondary'
                variant='outlined'
                size='large'
                startIcon={<ArrowBack />}
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
  label: {
    fontSize: 14
  }
}
