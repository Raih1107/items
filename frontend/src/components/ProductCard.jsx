import React, { useState } from "react";
import { Button, Box, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme, useMediaQuery } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useProductStore } from "../store/product";
import { useSnackbar } from 'notistack';  // Import Notistack hook

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // For responsive layouts

  const { deleteProduct, updateProduct } = useProductStore();
  const { enqueueSnackbar } = useSnackbar();  // Use the Notistack hook
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      enqueueSnackbar(message, { variant: 'error' });  // Show error toast
    } else {
      enqueueSnackbar(message, { variant: 'success' });  // Show success toast
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    setOpenModal(false);
    if (!success) {
      enqueueSnackbar(message, { variant: 'error' });  // Show error toast
    } else {
      enqueueSnackbar("Product updated successfully", { variant: 'success' });  // Show success toast
    }
  };

  return (
    <Box
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'all 0.3s',
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <img src={product.image} alt={product.name} style={{ height: '200px', width: '100%', objectFit: 'cover' }} />

      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {product.name}
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          ${product.price}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton onClick={() => setOpenModal(true)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteProduct(product._id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Modal to update product */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            fullWidth
            value={updatedProduct.name}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            value={updatedProduct.price}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Image URL"
            fullWidth
            value={updatedProduct.image}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleUpdateProduct(product._id, updatedProduct)} color="primary">
            Update
          </Button>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductCard;
