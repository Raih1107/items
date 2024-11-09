import { Container, Grid, Typography, Stack, Button } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
// hi 
const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <Container maxWidth="xl" sx={{ py: 12 }}>
      <Stack spacing={8} alignItems="center">
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(to right, cyan, blue)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textAlign: "center",
          }}
        >
          Current Products 🚀
        </Typography>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 10,
          }}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Grid>

        {products.length === 0 && (
          <Typography
            variant="h6"
            align="center"
            fontWeight="bold"
            sx={{ color: "gray.500" }}
          >
            No products found 😢{" "}
            <Link to="/create">
              <Button sx={{ color: "blue", textDecoration: "underline" }}>
                Create a product
              </Button>
            </Link>
          </Typography>
        )}
      </Stack>
    </Container>
  );
};

export default HomePage;
