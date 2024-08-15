// ** REACT IMPORTS
import React from 'react'
import { useState, useEffect } from 'react'

// ** MATERIAL UI IMPORTS
import { Box, FormControl, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'

// ** FireStore
import { database } from 'src/firebase'
import { collection, getDocs } from 'firebase/firestore'

// ** GLOBAL STATE
import { useRecordState } from '../../contexts/recordState'


export function ProductBox({ product, products}) {
  const { prodList, setProdList, qties, setQties } = useRecordState()
  const [inputValue, setInputValue] = useState('')

  const addProductToList = (product) => {
    const productIndex = prodList.findIndex(prod => prod.id === product.id)
    if (productIndex !== -1) {
      const newQties = [...qties]
      newQties[productIndex] += 1
      setQties(newQties)
      setInputValue('')
    } else {
    setProdList([...prodList, product])
    setQties([...qties, 1])
    setInputValue('')
    }
  }

  return (
    <Box>
      <FormControl fullWidth>
        <Autocomplete
          id='product-autocomplete'
          options={products}
          getOptionLabel={option => `${option.name}`}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue); // Update input value as user types
          }}
          value={products.find(prod => prod.id === product) || null} //prov is provider
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={params => <TextField {...params} label='Elija los Productos'/>}
          sx={{ minWidth: 345 }}
          size='small'
          onChange={(event, newValue) => {
            addProductToList(newValue)
          }}
        />
      </FormControl>
    </Box>
  )
}
