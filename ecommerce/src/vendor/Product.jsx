import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProductByIdApi } from '../api/api';
import NavBar from './NavBar';

function VendorProduct() {
    console.log("In the view....")    
    const { id } = useParams(); // Extract the product ID from the URL parameters
    const navigate = useNavigate();
    const [productData, setProductData] = useState(null);

    // Fetch product details by ID
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductByIdApi(id); // Replace with your API call
                setProductData(response.data);
            } catch (error) {
                toast.error('Error fetching product details');
                navigate('/'); // Redirect if product not found
            }
        };
        fetchProduct();
    }, []);

    // const addToCart = async (e) => {
    //     const productId = e.target.value;
    //     const formData = new FormData();
    //     formData.append('product_details', productId);

    //     try {
    //         const response = await addToCartApi(formData);
    //         if (response.status === 201) {
    //             toast.success('Product added to cart.');
    //         }
    //     } catch (error) {
    //         toast.error('Error while adding to cart. Please relogin.');
    //         navigate('/login');
    //     }
    // };

    if (!productData) {
        return <div>Loading...</div>; // Show a loader while product data is being fetched
    }

    return (
        <div className="container-fluid">
            <NavBar></NavBar>
            <div className="row" style={{ marginTop: '120px' }}>
                {/* Product Image Section */}
                <div className="col-md-4">
                    <img
                        src={`http://localhost:8000/${productData.product_display_picture}`}
                        alt="Product Display"
                        height={400}
                        width={400}
                        className="img-fluid rounded"
                    />
                </div>

                {/* Product Details Section */}
                <div className="col-md-5">
                    <h2 className="fw-bold">{productData.product_brand}</h2>
                    <p className="text-muted">{productData.product_name}</p>
                    <h5 className="text-primary">{`Rs. ${productData.product_price}`}</h5>
                    <p>{productData.product_description}</p>
                    <p><strong>Color:</strong> {productData.product_color}</p>
                    <p><strong>Sizes:</strong> {productData.product_size}</p>
                    <p><strong>Audience:</strong> {productData.product_audience}</p>

                    {/* <button
                        className="btn btn-dark mt-3"
                        value={productData.id}
                        onClick={addToCart}
                    >
                        <i className="bi bi-bag"></i> Add To Cart
                    </button> */}
                </div>

                {/* Vendor Details Section */}
                <div className="col-md-3 text-center">
                    <div className="card shadow-sm p-3">
                        <img
                            src={`http://localhost:8000/${productData.vendor.vendor_logo}`}
                            alt="Vendor Logo"
                            className="card-img-top img-fluid"
                            style={{ maxHeight: '100px', objectFit: 'contain' }}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{productData.vendor_name}</h5>
                            <p className="card-text"><i className="bi bi-geo-alt"></i> {productData.vendor.shop_location}</p>
                            <p className="card-text"><i className="bi bi-telephone"></i> {productData.vendor.contact_number}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Extra Product Images */}
            <div className="row mt-4">
                <div className="col-md-4">
                    <img
                        src={`http://localhost:8000/${productData.product_extra_picture_1}`}
                        height={300}
                        width={300}
                        alt="Extra 1"
                        className="img-fluid rounded"
                    />
                </div>
                {productData.product_extra_picture_2 && (
                    <div className="col-md-4">
                        <img
                            src={`http://localhost:8000/${productData.product_extra_picture_2}`}
                            height={300}
                            width={300}
                            alt="Extra 2"
                            className="img-fluid rounded"
                        />
                    </div>
                )}
                {productData.product_extra_picture_3 && (
                    <div className="col-md-4">
                        <img
                            src={`http://localhost:8000/${productData.product_extra_picture_3}`}
                            height={300}
                            width={300}
                            alt="Extra 3"
                            className="img-fluid rounded"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default VendorProduct;
