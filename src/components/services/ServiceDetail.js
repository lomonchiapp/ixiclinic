//** React Imports*/
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// ** MUI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem
} from '@mui/material'
// ** Firebase Imports
import { database } from 'src/firebase'
import { doc, getDoc, query, onSnapshot, updateDoc, getDocs, collection } from 'firebase/firestore'
// ** Global State
import { sProductState } from 'src/contexts/sServiceState'
// ** Icons
import Close from 'mdi-material-ui/Close'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export const ProductDetail = ({ open, setOpen }) => {
  // ** Global State
  const { product, setProduct } = sProductState()
  // ** Categories
  const [categories, setCategories] = useState([])
  // ** Providers
  const [providers, setProviders] = useState([])
  // ** Editing States
  const [toggleName, setToggleName] = useState(false)
  const [toggleCategory, setToggleCategory] = useState(false)
  const [toggleProvider, setToggleProvider] = useState(false)
  const [toggleStock, setToggleStock] = useState(false)
  const [togglePrice, setTogglePrice] = useState(false)
  const [toggleCost, setToggleCost] = useState(false)
  const [toggleDescription, setToggleDescription] = useState(false)

  // ** Editable Fields States
  const [nameEdit, setNameEdit] = useState(product.name)
  const [categoryEdit, setCategoryEdit] = useState(product.category)
  const [providerEdit, setProviderEdit] = useState(product.provider)
  const [stockEdit, setStockEdit] = useState(product.stock)
  const [priceEdit, setPriceEdit] = useState(product.price)
  const [costEdit, setCostEdit] = useState(product.cost)
  const [descriptionEdit, setDescriptionEdit] = useState(product.description)
  //** Router */
  const router = useRouter()

  // ** UseEffect to fetch categories and providers
  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(query(collection(database, 'product_categories')))
      let categories = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      setCategories(categories)
    }
    const fetchProviders = async () => {
      const querySnapshot = await getDocs(query(collection(database, 'product_providers')))
      let providers = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      setProviders(providers)
    }
    fetchCategories()
    fetchProviders()
  }, [])
  const handleCategoryChange = async categoryId => {
    // Assuming categories is an array of category objects and you can find one by its id
    const selectedCategory = categories.find(category => category.id === categoryId)

    if (!selectedCategory) {
      console.error('Selected category not found')
      return
    }

    setCategoryEdit(selectedCategory)

    try {
      await updateDoc(doc(database, 'products', product.id), { category: selectedCategory })
      setProduct({ ...product, category: selectedCategory })
    } catch (error) {
      console.log(error)
    }
  }

  const handleProviderChange = async providerId => {
    // Assuming providers is an array of provider objects and you can find one by its id
    const selectedProvider = providers.find(provider => provider.id === providerId)
    if (!selectedProvider) {
      console.error('Selected provider not found')
      return
    }
    setProviderEdit(selectedProvider)
    try {
      await updateDoc(doc(database, 'products', product.id), { provider: selectedProvider })
      setProduct({ ...product, provider: selectedProvider })
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = e => {
    setNameEdit(e.target.value)
  }
  const handleCancelChanges = () => {
    setNameEdit(product.name)
    setCategoryEdit(product.category.name)
    setProviderEdit(product.provider.name)
    setStockEdit(product.stock)
    setPriceEdit(product.price)
    setCostEdit(product.cost)
    setDescriptionEdit(product.description)
  }

  const handleSave = () => {
    setToggleName(false)
    setToggleCategory(false)
    setToggleProvider(false)
    setToggleStock(false)
    setTogglePrice(false)
    setToggleCost(false)
    setToggleDescription(false)
    router.reload()
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleBlur = async (fieldName, newValue) => {
    // Determine which toggleEdit function to call based on fieldName
    switch (fieldName) {
      case 'name':
        setToggleName(!toggleName)
        break
      case 'category':
        setToggleCategory(!toggleCategory)
        break
      case 'provider':
        setToggleProvider(!toggleProvider)
        break
      case 'stock':
        setToggleStock(!toggleStock)
        break
      case 'price':
        setTogglePrice(!togglePrice)
        break
      case 'cost':
        setToggleCost(!toggleCost)
        break
      case 'description':
        setToggleDescription(!toggleDescription)
        break
      default:
        console.log('Unknown field')
    }

    if (product[fieldName] !== newValue) {
      try {
        await updateDoc(doc(database, 'products', product.id), { [fieldName]: newValue })
        setProduct({ ...product, [fieldName]: newValue })
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Card sx={{ maxWidth: 400, minWidth: 400 }}>
      <CardHeader title='Información del Producto' />
      <Close onClick={() => handleClose()} sx={styles.closeIcon} />
      <Divider />
      <CardContent>
        <Grid spacing={2}>
          <Grid container spacing={2}>
            <Grid sx={styles.div} item>
              <Typography sx={styles.label}>Nombre del Producto</Typography>
              {toggleName ? (
                <TextField
                  autoFocus
                  value={nameEdit}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name', nameEdit)}
                  size='small'
                  sx={styles.textField}
                />
              ) : (
                <Typography onClick={() => setToggleName(!toggleName)} sx={styles.value}>
                  {product.name}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid sx={styles.div} item>
              <Typography sx={styles.label}>Categoría</Typography>
              {toggleCategory ? (
                <Select
                  autoFocus
                  defaultOpen
                  defaultValue={product.category.name}
                  size='small'
                  onChange={e => handleCategoryChange(e.target.value)}
                  onBlur={() => handleBlur('category', categoryEdit)}
                >
                  {categories.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <Typography onClick={() => setToggleCategory(!toggleCategory)} sx={styles.value}>
                  {product.category.name}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid sx={styles.div} item>
              <Typography sx={styles.label}>Proveedor</Typography>
              {toggleProvider ? (
                <Select
                  autoFocus
                  defaultValue={product.provider.name}
                  size='small'
                  onChange={e => handleProviderChange(e.target.value)}
                  onBlur={() => handleBlur('provider', providerEdit)}
                >
                  {providers.map(provider => (
                    <MenuItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <Typography sx={styles.value} onClick={() => setToggleProvider(!toggleProvider)}>
                  {product.provider.name}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid sx={styles.div} item>
              <Typography sx={styles.label}>Cantidad</Typography>
              {toggleStock ? (
                <TextField
                  autoFocus
                  defaultValue={product.stock}
                  size='small'
                  onChange={e => setStockEdit(e.target.value)}
                  onBlur={() => handleBlur('stock', stockEdit)}
                  sx={styles.textField}
                />
              ) : (
                <Typography sx={styles.value} onClick={() => setToggleStock(!toggleStock)}>
                  {product.stock}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid sx={styles.div} item>
              <Typography sx={styles.label}>Precio</Typography>
              {togglePrice ? (
                <TextField
                  autoFocus
                  defaultValue={product.price}
                  size='small'
                  onChange={e => setPriceEdit(e.target.value)}
                  onBlur={() => handleBlur('price', priceEdit)}
                  sx={styles.textField}
                />
              ) : (
                <Typography sx={styles.value} onClick={() => setTogglePrice(!togglePrice)}>
                  {product.price}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid sx={styles.div} item>
              <Typography sx={styles.label}>Costo</Typography>
              {toggleCost ? (
                <TextField
                  autoFocus
                  defaultValue={product.cost}
                  size='small'
                  onChange={e => setCostEdit(e.target.value)}
                  onBlur={() => handleBlur('cost', costEdit)}
                  sx={styles.textField}
                />
              ) : (
                <Typography sx={styles.value} onClick={() => setToggleCost(!toggleCost)}>
                  {product.cost}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid sx={styles.div} item>
              <Typography sx={styles.label}>Descripcion</Typography>
              {toggleDescription ? (
                <TextField
                  autoFocus
                  defaultValue={product.description}
                  size='small'
                  onChange={e => setDescriptionEdit(e.target.value)}
                  onBlur={() => handleBlur('description', descriptionEdit)}
                  sx={styles.textField}
                />
              ) : (
                <Typography sx={styles.value} onClick={() => setToggleDescription(!toggleDescription)}>
                  {product.description || 'Sin descripcion'}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Button startIcon={<CheckOutlinedIcon/>} sx={{ marginRight: 2 }} variant='contained' onClick={() => handleSave()}>
          Guardar
        </Button>
      </CardContent>
    </Card>
  )
}

const styles = {
  label: {
    fontWeight: 600,
    fontSize: 14
  },
  div: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  value: {
    border: '1px dashed #C9C9C9',
    fontSize: 12,
    paddingY: 2,
    paddingX: 1,
    minWidth: 200,
    '&:hover': {
      cursor: 'pointer',
      border: '1px dashed #00A99D'
    }
  },
  textField: {
    minWidth: 200,
    border: '1px dashed #C9C9C9',
    borderRadius: 2
  },
  closeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
    cursor: 'pointer'
  }
}
