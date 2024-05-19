import { FloatingWindow } from '../FloatingWindow'
import React, { useState, useEffect, useRef } from 'react'
import { Grid } from '@mui/material'
import tableState from 'src/contexts/tableState'
import focusedState from 'src/contexts/inputs/focusedState'

export const ProductInput = ({ index }) => {

  //Estados Globales
  const {tableIndex, setTableIndex, productInputs, setProductInputs} = tableState()
  const {isFocused, setIsFocused} = focusedState()
  //Estados Locales


  // Referencia del input
  const ref = useRef()

  // Funciones del input


  function handleFocus() {
    setIsFocused(true)
  }
  function handleBlur() {
    setIsFocused(false)

  }
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsFocused(false)

    }
  }

  // Fin de las funciones

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsFocused])

  return (
    <Grid
      container
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
      }}
    >

      <input
        id={'product-' + tableIndex}
        type='text'
        onClick={handleFocus}
        onFocusOut={handleBlur}
        value={productInputs[tableIndex]}
        onChange={e => setProductInputs(tableIndex, e.target.value)}
        placeholder='Buscar Producto...'
        style={{
          height: '3rem',
          width: '100%',
          padding: '0.5rem',
          border: 'none',
          borderRadius: '5px',
          '::placeholder': {
            color: 'red'
          }
        }}
      />
      {isFocused && <FloatingWindow />}
    </Grid>
  )
}

const styles = {

  FloatingNewProduct: {
    position: 'absolute',
    width: '150%',
    top: 240,
    backgroundColor: 'white',
    border: 'solid 1px #e0e0e0',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)'
  }
}
