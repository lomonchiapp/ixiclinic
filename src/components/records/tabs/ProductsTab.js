import React, { useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { RecordProdSelect } from '../../inputs/RecordProdSelect'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { AddProductDrawer } from '../../products/AddProductDrawer'
import { ProdList } from '../ProdList'
import { useRecordState } from 'src/contexts/recordState'

export function ProductsTab({ product, products, setProducts, newProduct, setNewProduct }) {
  const { prodTotal } = useRecordState()

  return (
    <Grid sx={styles.tabContainer}>
      <Box sx={styles.selectContainer}>
        <RecordProdSelect />
        <AddProductDrawer open={newProduct} setOpen={setNewProduct} />
        <AddCircleIcon color='primary' sx={{ cursor: 'pointer' }} onClick={() => setNewProduct(true)} />
      </Box>
      <Grid item xs={12} md={8} lg={6} xl={6}>
        <ProdList />
        <Box sx={styles.totalContainer}>
              <Box sx={styles.subTotalContainer}>
              <Typography sx={styles.subTotalLabel}>Total en agregados:</Typography>
              <Typography sx={styles.total}>
                ${typeof variationsTotal === 'number' ? variationsTotal.toFixed(2) : '0.00'}
              </Typography>
              </Box>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                <Typography sx={styles.totalLabel}>Total:</Typography>
              <Typography sx={styles.total}>
                ${typeof prodTotal === 'number' ? prodTotal.toFixed(2) : '0.00'}
              </Typography>
              </Box>
              
            </Box>
      </Grid>
    </Grid>
  )
}
const styles = {
  tabContainer: {
    paddingTop:5
  },
  selectContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 2
  },
  subTotalLabel: {
    fontSize: 12,
    marginRight: 2
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00A99D'
  },
  subTotalContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 1
  },
  totalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: 5,
    paddingRight: 5,
    paddingBottom:2.5,
    paddingTop:2.5,
    border: '1px solid #00A99D'
  },
}
