import axios from 'axios'

export const getProducts = () =>  {
  try {
    return axios.get('http://localhost:8000/products/api/v1/products/')
  } catch (error) {
    console.error(error)
  }
}

export const createProduct = (product) => {
  return axios.post('http://localhost:8000/products/api/v1/products/', product)
}
