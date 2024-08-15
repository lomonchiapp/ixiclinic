import * as React from 'react';

import Drawer from '@mui/material/Drawer';

import { ProductDetail } from "./ProductDetail";

export const EditProductDrawer = ({open, setOpen, selectedProduct}) => {


 // const toggleDrawer = (newOpen) => () => {
 //   setOpen(newOpen);
 // };

  return (
    <div>
      <Drawer
      anchor='right'
      open={open} onClose={setOpen}>
        <ProductDetail product={selectedProduct} setOpen={setOpen} />
      </Drawer>
    </div>
  );
}

