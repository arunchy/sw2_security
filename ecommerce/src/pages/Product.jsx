import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { toast } from 'react-toastify';
import { addToCartApi, createReviewApi } from '../api/api';
import { Button, TextField } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

function Product() {
    const location = useLocation();
    const { productData } = location.state || {};
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const navigate = useNavigate();
    const baseUrl = "http://localhost:8000";

    useEffect(() => {
        // Fetch reviews for the product
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/api/reviews?productId=${productData.id}`);
                setReviews(response.data.reviews || []);
            } catch (error) {
                toast.error("Failed to fetch reviews.");
            }
        };
        fetchReviews();
    }, [productData.id]);

    const getFullImageUrl = (imagePath) => {
        if (!imagePath) {
            return undefined;
        }
        if (imagePath.startsWith("/")) {
            return `${baseUrl}${imagePath}`;
        }
        return imagePath;
    };
    const addToCart = async (productId) => {
        const formData = new FormData();
        formData.append("product_details", productId);
        try {
            const response = await addToCartApi(formData);
            if (response.status === 201) {
                toast.success("Product added to cart!");
            }
        } catch (error) {
            toast.error("Error occurred while adding to cart. Please re-login.");
            navigate("/login");
        }
    };

    const submitReview = async () => {
        if (!newReview.trim()) {
            toast.error("Review cannot be empty!");
            return;
        }
        try {
            const data={
                   product: productData.id,
                    comment: newReview,
                
            }
            const response = await createReviewApi(data)
            console.log("response: ",response)
            if (response.status !== 201) {
               toast.error(response.data.message) 
            }
            toast.success("Review submitted!");
                setReviews([...reviews, response.data.review]);
                setNewReview("");
        } catch (error) {
            toast.error("Failed to submit review.");
        }
    };

    return (
        <div className='container-fluid'>
            <NavBar />
            <div className='row' style={{ marginTop: "120px" }}>
                {/* Product Image Section */}
                <div className='col-md-4'>
                    <img
                        src={getFullImageUrl(productData.product_display_picture)}
                        alt='Product Display'
                        className="img-fluid rounded shadow-sm"
                        height={400}
                        width={400}
                    />
                </div>

                {/* Product Details Section */}
                <div className='col-md-5'>
                    <h2 className="fw-bold">{productData.product_brand}</h2>
                    <p className="text-muted">{productData.product_name}</p>
                    <h4 className="text-primary">{`Rs. ${productData.product_price}`}</h4>
                    <p>{productData.product_description}</p>
                    <p><strong>Color:</strong> {productData.product_color}</p>
                    <p><strong>Sizes:</strong> {productData.product_size}</p>
                    <p><strong>Audience:</strong> {productData.product_audience}</p>

                    <Button color='primary' variant='contained' onClick={() => addToCart(productData.id)}>
                        <ShoppingCart /> Add to Cart
                    </Button>
                </div>

                {/* Vendor Details Section */}
                <div className='col-md-3'>
                    <div className="card shadow-sm p-3 text-center">
                        <img
                            src={getFullImageUrl(productData.vendor.vendor_logo)}
                            alt="Vendor Logo"
                            className="card-img-top img-fluid"
                            style={{ maxHeight: '100px', objectFit: 'contain' }}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{productData.vendor_name}</h5>
                            <p className="card-text">
                                <i className="bi bi-geo-alt"></i> {productData.vendor.shop_location}
                            </p>
                            <p className="card-text">
                                <i className="bi bi-telephone"></i> {productData.vendor.contact_number}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Extra Product Images */}
            <div className='row mt-4'>
                {productData.product_extra_picture_1 && (
                    <div className='col-md-4'>
                        <img
                            src={getFullImageUrl(productData.product_extra_picture_1)}
                            height={300}
                            width={300}
                            alt='Extra 1'
                            className="img-fluid rounded shadow-sm"
                        />
                    </div>
                )}
                {productData.product_extra_picture_2 && (
                    <div className='col-md-4'>
                        <img
                            src={getFullImageUrl(productData.product_extra_picture_2)}
                            height={300}
                            width={300}
                            alt='Extra 2'
                            className="img-fluid rounded shadow-sm"
                        />
                    </div>
                )}
                {productData.product_extra_picture_3 && (
                    <div className='col-md-4'>
                        <img
                            src={getFullImageUrl(productData.product_extra_picture_3)}
                            height={300}
                            width={300}
                            alt='Extra 3'
                            className="img-fluid rounded shadow-sm"
                        />
                    </div>
                )}
            </div>

            {/* Reviews Section */}
            <div className="row mt-5">
                <div className="col-md-8">
                    <h3 className="fw-bold">Reviews</h3>
                    <ul className="list-group mb-4">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <li key={index} className="list-group-item">
                                    <strong>{review.user}</strong>: {review.text}
                                </li>
                            ))
                        ) : (
                            <p>No reviews yet. Be the first to review!</p>
                        )}
                    </ul>

                    {/* Add Review Form */}
                    <h4 className="fw-bold">Add Your Review</h4>
                    <div className="input-group mb-3">
                        <TextField
                            variant="outlined"
                            label="Write your review"
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            fullWidth
                        />
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={submitReview}
                            style={{ marginLeft: '10px' }}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
