import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { addToCartApi, getProductByCategoryApi } from '../api/api';
import { toast } from 'react-toastify';
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import { RemoveRedEye, ShoppingBag, ShoppingCart } from '@mui/icons-material';

const Category = () => {
  const navigate = useNavigate();
  const { category } = useParams(); // Get category from URL
  const [products, setProducts] = useState([]); // State to hold the products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  
  function getFullImageUrl(imagePath) {
    const baseUrl = "http://localhost:8000";

    if (imagePath.startsWith("/")) {
        // If the path is relative, prepend the base URL
        return `${baseUrl}${imagePath}`;
    }

    // If the path is already a full URL, return it as is
    return imagePath;
}
  // Fetch products based on category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await getProductByCategoryApi(category);
        if (response.data && response.data.length > 0) {
          setProducts(response.data); // Update products state
        } else {
          setProducts([]); // No products found
        }
        setLoading(false); // Stop loading
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, [category]);

  const addToCart = async (productId) => {
    const formData = new FormData();
    formData.append('product_details', productId);
    try {
      const response = await addToCartApi(formData);
      if (response.status === 201) {
        toast.success('Product added to cart!');
      }
    } catch (error) {
      toast.error('Error occurred while adding to cart.please re login');
      navigate("/login");
    }
  };

  const handleProductView = (productIndex) => {
    const productData = products[productIndex];
    if (productData) {
      navigate('/product', { state: { productData } });
    }
  };

  return (
    <>
      <div className="container-fluid">
        <NavBar />
        <div className="container" style={{ marginTop: '120px' }}>

          {loading && <div className="text-center">Loading...</div>}

          {error && <div className="alert alert-danger text-center">{error}</div>}

          {/* No Products Found */}
          {!loading && !error && products.length === 0 && (
            <div className="row d-flex justify-content-center align-items-center" >
              <div className="col-sm-3 d-flex flex-column align-items-center">
                <img
                  src={`${process.env.PUBLIC_URL}/sad_face.png`}
                  alt="sad face"
                  height={200}
                  width={200}
                />
                <p className="text-danger">No Result Found</p>
              </div>
            </div>
          )}

          {/* Render Products */}
          {!loading && !error && products.length > 0 && (
            <div className="row">
              {products.map((product, index) => (
                <div className="col-5 col-md-3" key={product.id}>

<Card sx={{ maxWidth: 345, margin: '20px auto', boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="250"
        image={getFullImageUrl(product.product_display_picture)}
        alt="Sample Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.product_brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.product_description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={()=>addToCart(product.id)}>
          <ShoppingCart></ShoppingCart>
        </Button>
        <Button size="small" variant="outlined" onClick={()=>handleProductView(product.id)}>
         <RemoveRedEye></RemoveRedEye>
        </Button>
      </CardActions>
    </Card>













                  {/* <div className="card overflow-hidden">
                    <img
                      src={`http://localhost:8000/${product.product_display_picture}`}
                      height={260}
                      width={280}
                      alt={product.product_name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.product_name}</h5>
                      <p className="card-text">{product.product_description}</p>
                      <div>
                        <button
                          className="btn"
                          value={product.id}
                          onClick={addToCart}
                          id={`btn${product.id}`}
                        >
                          <label className="bi bi-cart lead" htmlFor={`btn${product.id}`} />
                        </button>
                        <button
                          className="btn"
                          value={index}
                          onClick={handleProductView}
                          id={`view${index}`}
                        >
                          <label className="bi bi-eye lead" htmlFor={`view${index}`} />
                        </button>
                      </div>
                    </div>
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
