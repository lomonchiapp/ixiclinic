import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { ProductBox } from '../../inputs/ProductBox'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { AddProductDrawer } from '../../products/AddProductDrawer'

export function ProductsTab({
  product,
  products,
  setProducts,
  newProduct,
  setNewProduct,
}) {
  return (
    <Grid sx={{ alignItems: 'center', marginBottom: 10 }} container item>
      <ProductBox product={product} products={products} />
      <AddProductDrawer open={newProduct} setOpen={setNewProduct} />
      <AddCircleIcon color='primary' sx={{ cursor: 'pointer' }} onClick={() => setNewService(true)} />
    </Grid>
  )
}
