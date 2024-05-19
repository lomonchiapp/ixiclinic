import React from 'react'

export const QuantityInput = ({index}) => {
  return (
    <input
      placeholder='1.00'
      type='text'
      inputMode='numeric'
      style={{
        height: '3rem',
        width: '100%',
        WebkitAppearance: 'none',
        padding: '0.5rem',
        border: 'none',
        borderRadius: '5px',
        '::placeholder': {
          color: 'red'
        }
      }}
    />
  )
}
export const RateInput = ({index}) => {
  return (
    <input
      placeholder='1.00'
      type='text'
      inputMode='numeric'
      style={{
        height: '3rem',
        width: '100%',
        WebkitAppearance: 'none',
        padding: '0.5rem',
        border: 'none',
        borderRadius: '5px',
        '::placeholder': {
          color: 'red'
        }
      }}
    />
  )
}
export const DiscountInput = ({index}) => {
  return (
    <input
      placeholder='1.00'
      type='text'
      inputMode='numeric'
      style={{
        height: '3rem',
        width: '100%',
        WebkitAppearance: 'none',
        padding: '0.5rem',
        border: 'none',
        borderRadius: '5px',
        '::placeholder': {
          color: 'red'
        }
      }}
    />
  )
}

export const TaxInput = ({index}) => {
  return (
    <input
      placeholder='1.00'
      type='text'
      inputMode='numeric'
      style={{
        height: '3rem',
        width: '100%',
        padding: '0.5rem',
        WebkitAppearance: 'none',
        border: 'none',
        borderRadius: '5px',
        color: 'lightgrey',
        '::placeholder': {
          color: 'red'
        }
      }}
    />
  )
}
