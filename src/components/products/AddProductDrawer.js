import * as React from 'react';

import Drawer from '@mui/material/Drawer';

import { ProductForm } from "./ProductForm";

export const AddProductDrawer = ({open, setOpen}) => {


 // const toggleDrawer = (newOpen) => () => {
 //   setOpen(newOpen);
 // };

  return (
    <div>
      <Drawer
      anchor='right'
      open={open} onClose={setOpen}>
        <ProductForm open={open} setOpen={setOpen} />
      </Drawer>
    </div>
  );
}

