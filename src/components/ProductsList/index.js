import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { getProducts } from 'src/api/products.api'
import tableState from 'src/contexts/tableState'
import focusedState from 'src/contexts/inputs/focusedState'

export const ProductsList = ({ index }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState(null)

  const [products, setProducts] = useState([])
  const {items, setItems, rates,tableIndex,
    setRates, productInputs, setProductInputs} = tableState()

  function handleClick(product) {
    setIsFocused(false)
    setItems(items.concat(product.id))
    setRates(rates.concat(product.price))
    setProductInputs(tableIndex, productInputs.concat(product.name))
  }

  useEffect(() => {
    async function loadProducts() {
      const res = await getProducts()
      setProducts(res.data)
    }
    loadProducts()
  }, [])
  return (
    <>
{products
  .filter(product => {
    if (productInputs[tableIndex]) {
      return product.name.toLowerCase().includes(productInputs[tableIndex].toLowerCase());
    }
    return true;
  })
  .map(product => (
          <div

            onMouseOver={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
            style={{
              ...styles.product,
              backgroundColor: hoveredProduct === product.id ? '#DADADA' : 'white'
            }}
            key={product.id}
            value={product.id}
            onClick={() => handleClick(product)}
          >
            <Typography>{product.name}</Typography>
            <Typography>{product.price}</Typography>
          </div>
        ))}
    </>
  )
}
const styles = {
  product: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 15,
    borderBottom: 'solid 1px #e0e0e0',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#756767'
    }
  }
}
