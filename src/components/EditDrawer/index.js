import * as React from 'react';

import Drawer from '@mui/material/Drawer';

import { ServiceDetail } from "./ServiceDetail";

export const EditDrawer = ({open, setOpen, children}) => {


 // const toggleDrawer = (newOpen) => () => {
 //   setOpen(newOpen);
 // };

  return (
    <div>
      <Drawer
      anchor='right'
      open={open} onClose={setOpen}>
        {children}
      </Drawer>
    </div>
  );
}

