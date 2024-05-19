import tableState from 'src/contexts/tableState'
import ProductInput from 'src/components/inputs/ProductInput'
import QuantityInput from 'src/components/inputs/tableInputs'
import RateInput from 'src/components/inputs/tableInputs'
import DiscountInput from 'src/components/inputs/tableInputs'
import TaxInput from 'src/components/inputs/tableInputs'
import { TableRow, TableCell } from '@mui/material'



export function newRow(index) {

  return (
    <TableRow key={index}>
      <TableCell sx={styles.cell}>{index + 1}</TableCell>
      <TableCell sx={styles.cell}>
        <ProductInput />
      </TableCell>
      <TableCell sx={styles.cell}>
        <QuantityInput />
      </TableCell>
      <TableCell sx={styles.cell}>
        <RateInput />
      </TableCell>
      <TableCell sx={styles.cell}>
        <DiscountInput />
      </TableCell>
      <TableCell sx={styles.cell}>
        <TaxInput />
      </TableCell>
    </TableRow>
  )

}

const styles = {
  cell: {
    border: 'solid 1px #E7E7E7',
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 1
  }
}
