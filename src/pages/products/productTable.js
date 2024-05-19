// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import { getProducts } from 'src/api/products.api'


const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'Nombre de Articulo', minWidth: 170 },
  { id: 'quantity', label: 'Cant en Stock', minWidth: 100 },
  { id: 'unit', label: 'Unidad', minWidth: 100 },
  { id: 'category', label: 'Categor&iacute;a', minWidth: 100 },
  { id: 'price', label: 'Precio de Venta', minWidth: 100 },
  { id: 'cost', label: 'Precio de Costo', minWidth: 170, align: 'right'},
]
function createData(id, name, quantity, unit, category, price, cost) {

  return { id, name, quantity, unit, category, price, cost }
}


export function ProductList() {
  useEffect(()=>{
   async function loadProducts(){
      const res = await getProducts();
      console.log(res)
    }
    loadProducts()
  },[])

  return (
    <ProductTable />
  )}

var rows = []

getProducts().then((res) => {
  console.log(res.data)
  rows = res.data.map((product) => {
    return createData(
      product.id,
      product.name,
      product.quantity,
      product.unit,
      product.category,
      product.price,
      product.cost)
  })
})

const ProductTable = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

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

export default ProductTable
