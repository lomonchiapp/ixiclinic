import axios from 'axios'

export const getInvoices = () =>  {
  try {
    return axios.get('http://localhost:8000/clients/api/v1/clients/')
  } catch (error) {
    console.error(error)
  }
}

export const createInvoice = (invoice) => {
  return axios.post('http://localhost:8000/clients/api/v1/clients/', invoice)
}
