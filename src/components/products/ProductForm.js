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

// ** Firestore Imports
import {database} from 'src/firebase'
import {collection, addDoc, getDocs} from 'firebase/firestore'

// ** Custom Components
import { CategoryFormDialog } from './CategoryFormDialog'
import { ProvFormDialog } from './providers/ProvFormDialog'
import { ProductCategorySelect } from 'src/components/inputs/ProductCategorySelect'
import { ProvidersSelect } from 'src/components/inputs/ProvidersSelect'

export const ProductForm = ({ open, setOpen }) => {
  // ** Local States
  const [openDialog, setOpenDialog] = useState(false)
  const [newCategory, setNewCategory] = useState(false)
  const [newProvider, setNewProvider] = useState(false)
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: 0,
    cost: 0,
    provider: '',
    stock: 0,
    description: ''
  })
  const [providers, setProviders] = useState([])
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [note, setNote] = useState(false)
  // ** Global Product States
  const {
    name,
    category,
    setCategory,
    price,
    cost,
    provider,
    stock,
    setName,
    setPrice,
    setCost,
    description,
    setDescription,
    setProvider,
    setStock,
    reset
  } = useProductState()

  const fetchCategories = async () => {
    const querySnapshot = await getDocs(collection(database, 'product_categories'));
    const categories = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setCategories(categories);
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProviders = async () => {
      const querySnapshot = await getDocs(collection(database, 'product_providers'));
      const providers = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setProviders(providers);
    };

    fetchProviders();
  }, []);

  const router = useRouter()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const docRef = await addDoc(collection(database, 'products'), { // Im using Global state for this, just because...
        name: name,
        category: category,
        price: price,
        cost: cost,
        provider: provider,
        stock: stock,
        description: description
      })
      console.log('Document written with ID: ', docRef.id)
      reset()
      setOpen(false)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
};
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
