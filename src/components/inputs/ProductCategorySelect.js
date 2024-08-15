// ** React Imports
import * as React from 'react'
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

// ** Firestore Import
import { database } from 'src/firebase'
import { collection, getDocs } from 'firebase/firestore'

export function ProductCategorySelect({ isDialogOpen, productCategory, setProductCategory }) {
  // ** Local State
  const [productCategories, setProductCategories] = useState([])

  // ** Handlers
  const handleChange = (event) => {
    // Find the full category object based on the selected value (ID)
    const selectedCategory = productCategories.find(category => category.id === event.target.value);

    // Update the state with the full category object
    setProductCategory(selectedCategory);

    // Here you would also handle sending the selectedCategory object to Firestore
  }

  // ** UseEffect
  useEffect(() => {
    if (!isDialogOpen) {
      const fetchProductCategories = async () => {
        const querySnapshot = await getDocs(collection(database, 'product_categories'))
        let productCategories = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
        })
        setProductCategories(productCategories)

        // Set the last category added as value (now the first item after sorting)
        if (productCategories.length > 0) {
          setProductCategory(productCategories[0].id)
        }
      }
      fetchProductCategories()
    }
  }, [isDialogOpen, setProductCategory])
  const sortByDate = productCategories.sort((a, b) => {
    return (
      new Date(a.dateAdded) - new Date(b.dateAdded)
    )
  })
  return (
    <Box>
      <FormControl>
        <InputLabel id='demo-simple-select-label'>Seleccione una Categoria</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          sx={{ minWidth: 345 }}
          value={productCategory ? productCategory.id : ''}
          label='Categoria de Servicio'
          onChange={handleChange}
        >
          <MenuItem value=''>
            <em>Busque una categoria</em>
          </MenuItem>
          {productCategories.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)).map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
