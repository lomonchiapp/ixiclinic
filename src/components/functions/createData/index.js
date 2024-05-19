import tableState from "src/contexts/tableState"

export function createData(product, description, quantity, rate, tax, amount, DeleteButton) {
  return { product, description, quantity, rate, tax, amount, DeleteButton }
}
