// ** React Imports
import { useState, useEffect } from 'react'
// ** Next Import
import { useRouter } from 'next/router'
// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
// ** Global States
import { useSearchStore } from 'src/hooks/globalStates/useSearchStore'
import { useSelectedProduct } from 'src/contexts/useSelectedProduct'
// ** MUI Icons
import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import Visibility from '@mui/icons-material/Visibility'

// ** Custom Components
import { EditDrawer } from '../EditDrawer'
import { ViewDialog } from '../ViewDialog'
import { ProductDetail } from './ProductDetail'
// ** Hooks
import { getProducts } from 'src/hooks/products/getProducts'
import { deleteProduct } from 'src/hooks/products/deleteProduct'

const columns = [
  { id: 'name', label: 'Nombre del Producto', minWidth: 170 },
  { id: 'category', label: 'Categoría', minWidth: 170, align: 'right' },
  { id: 'stock', label: 'Cantidad', minWidth: 170, align: 'right' },
  { id: 'price', label: 'Precio', minWidth: 170, align: 'right' },
  { id: 'cost', label: 'Costo', minWidth: 170, align: 'right' },
  { id: 'actions', label: 'Acciones', minWidth: 170, align: 'right' }
]
export const ProductsTable = () => {
  // ** States
  const [products, setProducts] = useState([])
  const { product, setProduct } = useSelectedProduct()
  const [page, setPage] = useState(0)
  const { searchText } = useSearchStore()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  //Modes
  const [editMode, setEditMode] = useState(false)
  const [viewMode, setViewMode] = useState(false)

  const filteredProducts = products.filter(product => {
    const searchLower = searchText.toLowerCase()
    const nameMatch = product.name.toLowerCase().includes(searchLower)
    return nameMatch
  })

  // ** Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const editProduct = product => {
    setProduct(product)
    setEditMode(true)
  }
  const viewProduct = product => {
    setPatient(product)
    setViewMode(true)
  }

  const handleDelete = id => {
    deleteProduct(id)
    setProducts(products.filter(product => product.id !== id))
  }

  // ** UseEffect
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts()
      setProducts(products)
    }
    fetchProducts()
  }, [])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(product => (
              <TableRow hover sx={styles.row} key={product.id} tabIndex={-1}>
                <TableCell component='th' scope='row'>
                  {product.name}
                </TableCell>
                <TableCell align='right'>{product.category.name}</TableCell>
                <TableCell align='right'>{product.stock}</TableCell>
                <TableCell align='right'>{product.price}</TableCell>
                <TableCell align='right'>{product.cost}</TableCell>
                <TableCell
                  align='right'
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}
                >
                  <Grid sx={styles.btnContainer}>
                    <Grid item>
                      <Edit onClick={() => editProduct(product)} sx={styles.actionButton} />
                      <EditDrawer open={editMode} setOpen={setEditMode}>
                        <ProductDetail setOpen={setEditMode} />
                      </EditDrawer>
                    </Grid>
                    <Grid item>
                      <Visibility onClick={() => viewProduct(product)} sx={styles.actionButton} />
                      <ViewDialog setOpen={setViewMode} open={viewMode}></ViewDialog>
                    </Grid>
                    <Grid>
                      <DeleteIcon sx={styles.deleteButton} onClick={() => handleDelete(product.id)} />
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

const styles = {
  actionButton: {
    cursor: 'pointer',
    p: 1,
    border: '1px solid #00A99D',
    color: '#00a99d',
    BorderRadius: 1,
    transition: 'all 0.5s ease',
    '&:hover': {
      transition: 'all 0.5s ease',
      backgroundColor: '#00A99D',
      color: 'white',
      borderRadius: 2,
      border: '1px solid #00a99d'
    }
  },
  deleteButton: {
    cursor: 'pointer',
    p: 1,
    border: '1px solid #E10D00',
    color: '#E10D00',
    BorderRadius: 1,
    transition: 'all 0.5s ease',
    '&:hover': {
      transition: 'all 0.5s ease',
      backgroundColor: '#E10D00',
      color: 'white',
      borderRadius: 2,
      border: '1px solid '
    }
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 2
  },
  row: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f0f0f0'
    }
  }
}
