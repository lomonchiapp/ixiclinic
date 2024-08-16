import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

export function ViewDialog({ open, handleClose, children, title}) {


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
      {children}
      </DialogContent>
    </Dialog>
  )
}
