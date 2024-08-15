// ** React Imports
import { useState, useEffect } from 'react'
// ** Next Import
import { useRouter } from "next/router";
// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete';
// ** Firestore Imports
import { database } from 'src/firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import Edit from '@mui/icons-material/Edit';
// ** Custom Components
import { EditProductDrawer } from './EditProductDrawer';
import { sProductState } from 'src/contexts/sProductState'
const columns = [
  { id: 'name', label: 'Nombre del Producto', minWidth: 170 },
  { id: 'category', label: 'Categoría', minWidth: 170, align: 'right'},
  { id: 'stock', label: 'Cantidad', minWidth: 170, align: 'right'},
  { id: 'price', label: 'Precio', minWidth: 170, align: 'right'},
  { id: 'actions', label: 'Acciones', minWidth: 170, align: 'right'}
]
function createData(name, category, stock ,price, actions) {
  return { name, category, stock, price, actions }
}

export const ProductsList = ({drawerIsOpen}) => {
  // ** States
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const router = useRouter()

  const {setProduct} = sProductState()

  // ** Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleProductSelect = (product) => {
    setProduct(product)
    console.log(product)
    setOpenEditDrawer(true)
  }

  const handleClickDelete = async (id) => {
    if (window.confirm('Seguro de eliminar este producto?')) {
      await deleteDoc(doc(database, 'products', id))
      setProducts(products.filter(product => product.id !== id))
    }
  }

  // ** UseEffect
  useEffect(() => {
    if (!drawerIsOpen) {
      const fetchProducts = async () => {
        const querySnapshot = await getDocs(collection(database, 'products'))
        const products = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
        })
        setProducts(products)
      }
      fetchProducts()
    }
  }, [drawerIsOpen])

  useEffect(() => {
    const formattedProducts = products.map(product => {
      return createData( product.name, product.category.name, product.stock, product.price, (
        <Box>
        <DeleteIcon
        color='#535353'
        sx={{ cursor: 'pointer' }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#f44336'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#535353'}
        onClick={() => handleClickDelete(product.id)}
      />
      <Edit
        color='#535353'
        sx={{ cursor: 'pointer', marginLeft: '0.5rem' }}
        onClick={() => handleProductSelect(product)}
      />

      </Box>
      ))
    })
    setRows(formattedProducts)
  }, [products])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
      <EditProductDrawer open={openEditDrawer} setOpen={setOpenEditDrawer} product={selectedProduct} />
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}





