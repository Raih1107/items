import { Box, Button, Container, Typography, TextField, useTheme, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useProductStore } from '../store/product';
import { Link } from 'react-router-dom';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const { createProduct } = useProductStore();
  const theme = useTheme();

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      setSnackbarMessage('Please fill out all fields');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const { success, message } = await createProduct(newProduct);
    setSnackbarMessage(message);
    setSnackbarSeverity(success ? 'success' : 'error');
    setOpenSnackbar(true);

    if (success) {
      setNewProduct({ name: '', price: '', image: '' }); // Clear form after submission
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Create New Product
        </Typography>

        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(3),
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <form>
            <TextField
              label="Product Name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <TextField
              label="Price"
              fullWidth
              margin="normal"
              variant="outlined"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <TextField
              label="Image URL"
              fullWidth
              margin="normal"
              variant="outlined"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <Link to="/">
              <Button variant="contained" color="primary" onClick={handleAddProduct} fullWidth>
              Add Product
            </Button>
            </Link>
            
          </form>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Container>
  );
};

export default CreatePage;
