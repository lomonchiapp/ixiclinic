import axios from 'axios'

export const getClients = () =>  {
  try {
    return axios.get('http://localhost:8000/clients/api/v1/clients/')
  } catch (error) {
    console.error(error)
  }
}

export const createClient = (client) => {
  return axios.post('http://localhost:8000/clients/api/v1/clients/', client)
}
