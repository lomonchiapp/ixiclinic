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
import { useSelectedService } from 'src/contexts/useSelectedService'
// ** Icons
import Close from 'mdi-material-ui/Close'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
// ** Hooks
import { getServiceCategories } from 'src/hooks/services/categories/getServiceCategories'

export const ServiceDetail = ({ open, setOpen }) => {
  // ** Global State
  const { service, setService } = useSelectedService()
  // ** Categories
  const [categories, setCategories] = useState([])

  // ** Toggle Edit States
  const [editableFields, setEditableFields] = useState({
    name: service.name,
    category: service.category,
    description: service.description,
    price: service.price,
    cost: service.cost,
    duration: service.duration
  });

  const [toggle, setToggle] = useState({
    name: false,
    category: false,
    description: false,
    price: false,
    cost: false,
    duration: false
  });
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getServiceCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories: ', error);
      }
    };
    fetchCategories();
  }, []);

  const handleFieldChange = (field, value) => {
    setEditableFields(prevState => ({ ...prevState, [field]: value }));
  };

  const handleToggle = field => {
    setToggle(prevState => ({ ...prevState, [field]: !prevState[field] }));
  };

  const handleBlur = async (field, newValue) => {
    handleToggle(field);
    if (service[field] !== newValue) {
      try {
        await updateDoc(doc(database, 'services', service.id), { [field]: newValue });
        setService(prevService => ({ ...prevService, [field]: newValue }));
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }
  };

  const handleSave = () => {
    setToggle({
      name: false,
      category: false,
      description: false,
      price: false,
      cost: false,
      duration: false
    });
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Card sx={{ maxWidth: 400, minWidth: 400 }}>
      <CardHeader title='Información del Producto' />
      <Close onClick={handleClose} sx={styles.closeIcon} />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          {Object.keys(editableFields).map(field => (
            <Grid key={field} sx={styles.div} item>
              <Typography sx={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</Typography>
              {toggle[field] ? (
                field === 'category' ? (
                  <Select
                    autoFocus
                    value={editableFields.category}
                    onChange={e => handleFieldChange('category', e.target.value)}
                    onBlur={() => handleBlur('category', editableFields.category)}
                    size='small'
                    sx={styles.textField}
                  >
                    {categories.map(category => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <TextField
                    autoFocus
                    value={editableFields[field]}
                    onChange={e => handleFieldChange(field, e.target.value)}
                    onBlur={() => handleBlur(field, editableFields[field])}
                    size='small'
                    sx={styles.textField}
                  />
                )
              ) : (
                <Typography onClick={() => handleToggle(field)} sx={styles.value}>
                  {editableFields[field]}
                </Typography>
              )}
            </Grid>
          ))}
        </Grid>
        <Button startIcon={<CheckOutlinedIcon />} sx={{ marginRight: 2 }} variant='contained' onClick={handleSave}>
          Guardar
        </Button>
        <Button startIcon={<Close />} variant='outlined' onClick={handleClose}>
          Salir
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
