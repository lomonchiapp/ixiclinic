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

import { getClients } from 'src/api/clients.api'


const columns = [
  { id: 'company', label: 'Empresa', minWidth: 170 },
  { id: 'displayname', label: 'Nombre para Mostrar', minWidth: 100 },
  { id: 'phone', label: 'No. de Contacto', minWidth: 170, align: 'right'},
  { id: 'email', label: 'E-mail', minWidth: 170, align: 'right'},
  { id: 'amount_due', label: 'Deuda', minWidth: 170, align: 'right'}
]
function createData(company, displayname, phone, email, amount_due) {

  return { company, displayname, phone, email, amount_due }
}





export function ClientList() {
  useEffect(()=>{
   async function loadClients(){
      const res = await getClients();
      console.log(res)
    }
    loadClients()
  },[])

  return (
    <ClientsTable />
  )}

var rows = []

getClients().then((res) => {
  console.log(res.data)
  rows = res.data.map((client) => {
    return createData(client.company, client.displayname, client.phone, client.email, client.amount_due)
  })
})

const ClientsTable = () => {
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

export default ClientsTable
