import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material'
import { database } from 'src/firebase'
import { doc, getDoc, query, onSnapshot } from 'firebase/firestore'

const ProductPage = ({ id }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async (id) => {
      const productRef = doc(database, 'products', id);
      const productSnap = await getDoc(productRef);
      setProduct(productSnap.data());
      console.log(productSnap.data());
    }
    fetchProduct();
  }
  , [id]);


    return (
      <Card>
        <CardHeader title={product.name} />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h6">Categoría</Typography>
              <Typography>{product.category}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">Cantidad</Typography>
              <Typography>{product.stock}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">Precio</Typography>
              <Typography>{product.price}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
}

export default ProductPage
