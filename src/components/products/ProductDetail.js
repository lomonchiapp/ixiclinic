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
import { doc, updateDoc, getDocs, collection } from 'firebase/firestore'
// ** Global State
// ** Icons
import Close from 'mdi-material-ui/Close'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useSelectedProduct } from 'src/contexts/useSelectedProduct'

export const ProductDetail = ({ open, setOpen }) => {
  // ** Global State
  const { product, setProduct } = useSelectedProduct()
  // ** Categories and Providers
  const [categories, setCategories] = useState([])
  const [providers, setProviders] = useState([])

  // ** Editable Fields and Toggle States
  const [editableFields, setEditableFields] = useState({
    name: product.name,
    category: product.category,
    provider: product.provider,
    stock: product.stock,
    price: product.price,
    cost: product.cost,
    description: product.description
  });

  const [toggle, setToggle] = useState({
    name: false,
    category: false,
    provider: false,
    stock: false,
    price: false,
    cost: false,
    description: false
  });

  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, 'product_categories'));
        const categories = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    const fetchProviders = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, 'product_providers'));
        const providers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProviders(providers);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };
  
    fetchCategories();
    fetchProviders();
  }, []);
  
  const handleFieldChange = (field, value) => {
    setEditableFields(prevState => ({ ...prevState, [field]: value }));
  };
  
  const handleToggle = field => {
    setToggle(prevState => ({ ...prevState, [field]: !prevState[field] }));
  };
  
  const handleCategoryChange = async categoryId => {
    const selectedCategory = categories.find(category => category.id === categoryId);
    if (!selectedCategory) {
      console.error('Selected category not found');
      return;
    }
    setEditableFields(prevState => ({ ...prevState, category: selectedCategory }));
    try {
      await updateDoc(doc(database, 'products', product.id), { category: selectedCategory });
      setProduct(prevProduct => ({ ...prevProduct, category: selectedCategory }));
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };
  
  const handleProviderChange = async providerId => {
    const selectedProvider = providers.find(provider => provider.id === providerId);
    if (!selectedProvider) {
      console.error('Selected provider not found');
      return;
    }
    setEditableFields(prevState => ({ ...prevState, provider: selectedProvider }));
    try {
      await updateDoc(doc(database, 'products', product.id), { provider: selectedProvider });
      setProduct(prevProduct => ({ ...prevProduct, provider: selectedProvider }));
    } catch (error) {
      console.error('Error updating provider:', error);
    }
  };

  const handleCancelChanges = () => {
    setEditableFields({
      name: product.name,
      category: product.category,
      provider: product.provider,
      stock: product.stock,
      price: product.price,
      cost: product.cost,
      description: product.description
    });
  }

  const handleSave = () => {
    setToggle({
      name: false,
      category: false,
      provider: false,
      stock: false,
      price: false,
      cost: false,
      description: false
    });
  }

  const fieldLabels = {
    name: 'Nombre de Producto',
    category: 'Categoría',
    provider: 'Proveedor',
    stock: 'Cant. en Almacen',
    price: 'Precio',
    cost: 'Costo',
    description: 'Descripción'
  };
  

  return (
    <Card>
    <CardHeader title={editableFields.name} />
    <Divider />
    <CardContent>
      <Close onClick={() => setOpen(false)} sx={styles.closeIcon} />
      <Divider />
      <Grid sx={styles.formContainer} container spacing={2}>
        {Object.keys(editableFields).map(field => (
          <Grid key={field} sx={styles.div} item>
            <Typography sx={styles.label}>{fieldLabels[field]}</Typography>
            {toggle[field] ? (
              field === 'category' ? (
                <Select
                  value={editableFields.category.id}
                  onChange={e => handleCategoryChange(e.target.value)}
                  onBlur={() => handleToggle(field)}
                  fullWidth
                >
                  {categories.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              ) : field === 'provider' ? (
                <Select
                  value={editableFields.provider.id}
                  onChange={e => handleProviderChange(e.target.value)}
                  onBlur={() => handleToggle(field)}
                  fullWidth
                >
                  {providers.map(provider => (
                    <MenuItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <TextField
                  autoFocus
                  value={editableFields[field]}
                  onChange={e => handleFieldChange(field, e.target.value)}
                  onBlur={() => handleToggle(field)}
                  size='small'
                  sx={styles.textField}
                  label={fieldLabels[field]}
                />
              )
            ) : (
              <Typography onClick={() => handleToggle(field)} sx={styles.value}>
                {editableFields[field]?.name || editableFields[field]}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
      <Button startIcon={<CheckOutlinedIcon />} sx={{ marginRight: 2 }} variant='contained' onClick={() => handleSave()}>
        Guardar
      </Button>
    </CardContent>
  </Card>
);
}

const styles = {
  label: {
    fontWeight: 600,
    fontSize: 14
  },
  formContainer:{
    display:'flex',
    flexDirection:'column',
    minWidth:350,
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
