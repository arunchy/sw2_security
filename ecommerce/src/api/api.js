import {getCookie} from '../helper/getCookie';
import axios from "axios"


const Api=axios.create({
    baseURL:"http://localhost:8000",
    withCredentials:true,
    headers:{
        "Content-Type":"multipart/form-data"
    }
});

Api.interceptors.request.use(
    (config)=>{
        const accessToken=localStorage.getItem("token")
        if(accessToken){
            config.headers['Authorization']=`Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);
const sendOTPApi=(data)=>Api.post('/account/otp/',data);
const signupApi=(data)=>Api.post('/account/signup/',data);
const loginApi=(data)=>Api.post('/account/login/',data);
const getLatestProductApi=()=>Api.get('/product/latest-product/');
const getBrandsApi=()=>Api.get('/product/get-product-brands/');
const getProductByBrand=(brand)=>Api.get(`/product/get-products-by-brand/?brand=${brand}`);
const getMenProductsApi=()=>Api.get('/product/get-male-products/');
const getFemaleProductApi=()=>Api.get('/product/get-female-products/');
const createProductApi=(data)=>Api.post('/product/products/',data);
const searchProductsApi=(query)=>Api.get(`/product/search/?query=${query}`);
const addToCartApi=(data)=>Api.post('/product/carts/',data);
const getCartDataApi=()=>Api.get('/product/carts/');
const createBillApi=(data)=>Api.post('/product/bills/',data);
const userDetailsApi=()=>Api.get('/account/user-details/');
const getAllProductApi=()=>Api.get('/product/products/');
const updateProfileApi=(data)=>Api.put('/account/update-profile/',data);
const getBillApi=(c)=>Api.get('/product/bills/');
const getProductByCategoryApi=(category)=>Api.get(`/product/type/${category}/`);
const vendorLoginApi=(data)=>Api.post('/account/login/',data);
const vendorSingupApi=(data)=>Api.post('/account/signup/',data);
const vendorSendOtpApi=(data)=>Api.post('/account/otp/',data);
const getProductByVendorApi=()=>Api.get('/product/get-products-by-vendor/',);
const getProductByIdApi=(product_id)=>Api.get(`product/get-product-by-id/${product_id}/`);
const delteProductByIdApi=(product_id)=>Api.delete(`product/delete-by-id/${product_id}/`);
const createReviewApi=(data)=>Api.post('/product/review/',data);
const getReviewsApi=(product_id)=>Api.get(`/product/review/${product_id}`)
export{
    sendOTPApi,
    signupApi,
    loginApi,
    getLatestProductApi,
    getBrandsApi,
    getProductByBrand,
    getMenProductsApi,
    getFemaleProductApi,
    createProductApi,
    searchProductsApi,
    addToCartApi,
    getCartDataApi,
    createBillApi,
    userDetailsApi,
    getAllProductApi,
    updateProfileApi,
    getBillApi,
    getProductByCategoryApi,
    vendorLoginApi,
    vendorSendOtpApi,
    vendorSingupApi,
    getProductByVendorApi,
    getProductByIdApi,
    delteProductByIdApi,
    createReviewApi,
    getReviewsApi,
}