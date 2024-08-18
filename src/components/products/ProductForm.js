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

// ** Global States
import { useProductState } from 'src/contexts/productState'

// ** Icons Imports
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Close from '@mui/icons-material/Close'

// ** Hooks
import { newProduct } from 'src/hooks/products/newProduct'
import { getProductCategories } from 'src/hooks/products/categories/getProductCategories'
import { getProductProviders } from 'src/hooks/products/providers/getProductProviders'

// ** Custom Components
import { CategoryFormDialog } from './CategoryFormDialog'
import { ProvFormDialog } from './providers/ProvFormDialog'
import { ProductCategorySelect } from 'src/components/inputs/ProductCategorySelect'
import { ProvidersSelect } from 'src/components/inputs/ProvidersSelect'


export const ProductForm = ({ open, setOpen }) => {
  // ** Local States
  const [newCategory, setNewCategory] = useState(false)
  const [newProvider, setNewProvider] = useState(false)
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: 0,
    cost: 0,
    provider: '',
    stock: 0,
    description: '',
    note: '',
    createdAt: new Date(),
  })
  const [providers, setProviders] = useState([])
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [note, setNote] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getProductCategories()
      setCategories(categories)
    }
    const fetchProviders = async () => {
      const providers = await getProductProviders()
      setProviders(providers)
    }
    fetchCategories()
    fetchProviders()
  }, [categories, providers])

  // ** Destructuring product
  const router = useRouter()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const productRef = await newProduct(product)
      console.log('Product added: ', productRef)
      setOpen(false)
    } catch (error) {
      console.error('Error creating new product: ', error)
    }
  }

  // ** Handlers
  const handleNameChange = value => setName(value)
  const handlePriceChange = value => setPrice(value)
  const handleCostChange = value => setCost(value)
  const handleStockChange = value => setStock(value)
  const handleDescriptionChange = value => setDescription(value)


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
                value={name}
                onChange={e => handleNameChange(e.target.value)}
              />
              <TextField
                size='large'
                value={stock}
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
              <ProductCategorySelect
                productCategory={category}
                setProductCategory={setCategory}
                isDialogOpen={newCategory}
              />
              <AddCircleIcon
                onClick={() => setNewCategory(true)}
                fontSize='medium'
                color='primary'
                sx={{ cursor: 'pointer', marginLeft: 2 }}
              />
              <CategoryFormDialog update={fetchCategories} open={newCategory} setOpen={setNewCategory} />
            </Grid>
            <Grid sx={{ alignItems: 'center' }} container item>
              <ProvidersSelect
                provider={provider}
                setProvider={setProvider}
                isDialogOpen={newProvider}
              />
              <AddCircleIcon
                onClick={() => setNewProvider(true)}
                fontSize='medium'
                color='primary'
                sx={{ cursor: 'pointer', marginLeft: 2 }}
              />
              <ProvFormDialog setProviders={setProviders} open={newProvider} setOpen={setNewProvider} />
            </Grid>
            <Grid sx={{ marginTop: 4, alignItems: 'center' }} item container>
              <TextField
                size='large'
                value={price}
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
                value={cost}
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
                    value={description}
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
                <Button onClick={() => setNote(true)} sx={{ marginTop: 2, alignSelf:'center' }} variant='contained' size='small' color='secondary'>
                  Agregar Nota al Producto
                </Button>
              )}
            </Grid>
            <Grid sx={{ marginTop: 5 }} container item spacing={2}>
              <Button
                sx={{ marginRight: 2 }}
                onClick={handleSubmit}
                type='submit'
                variant='contained'
                size='large'
                startIcon={<AddCircleIcon />}
              >
                Agregar
              </Button>
              <Button
                onClick={() => setOpen(false)}
                type='button'
                variant='outlined'
                size='large'
                startIcon={<AddCircleIcon />}
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
