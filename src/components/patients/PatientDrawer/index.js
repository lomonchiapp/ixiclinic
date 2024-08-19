import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, IconButton, Tooltip } from '@mui/material'
import { set } from 'nprogress'

export const PatientDrawer = ({ open, setOpen, children}) => {


  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          maxWidth:550,
          boxSizing: 'border-box'
        }
      }}
    >
      {children}
    </Drawer>
  )
}
