import React, { useEffect, useState } from 'react';
import { delteProductByIdApi, getProductByVendorApi } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IconButton } from '@mui/material';
import { Delete, ModeEdit, RemoveRedEye } from '@mui/icons-material';
import NavBar from './NavBar';

const VendorHome = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const getProductByVendor = async () => {
    try {
      const response = await getProductByVendorApi();
      if (response.status !== 200) {
        toast.error('Please login as vendor');
        // navigate('/vendor/login/');
      }
      setProducts(response.data.data);
    } catch (error) {
      toast.error('Please login as vendor');
      // navigate('/vendor/login/');
    }
  };

  useEffect(() => {
    getProductByVendor();
  }, []);

  const redirectView=(id)=>{
    navigate(`/vendor/view/${id}`);
  }
  const redirectEdit=(id)=>{
    navigate(`/vendor/editproduct/${id}`);
  }
  const deleteProductById=async(id)=>{
    try{
      const response=await delteProductByIdApi(id);
      console.log("response delete: ",response);
      if(response.status!==204){
       toast.error("error while deleting product try relogin.")
      //  navigate("/vendor/login");
      }
      toast.success("product deleted successfully...")
      getProductByVendor();
    }catch(error){
      toast.error("error while deleting product try relogin.")
      navigate("/vendor/login");
    }
  }

  return (
    <div className="container-fluid">
      <NavBar></NavBar>
      <div className="row" style={{marginTop:"120px"}}>
        <h5 className="text-center">Your Products</h5>
      </div>
      <div className="row">
        <div className="col-sm-8">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Product Image</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Brand</th>
                <th scope="col">Total Sales</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={`http://localhost:8000/${product.product_display_picture}`}
                        alt={product.product_name}
                        style={{ width: '50px', height: '50px' }}
                      />
                    </td>
                    <td>{product.product_name}</td>
                    <td>{product.product_brand}</td>
                    <td>{product.product_description}</td>
                    <td>
                      <IconButton onClick={()=>redirectView(product.id)} >
                        <RemoveRedEye ></RemoveRedEye>
                      </IconButton>
                      <IconButton onClick={()=>redirectEdit(product.id)}>
                        <ModeEdit color='primary'></ModeEdit>
                      </IconButton>
                      <IconButton onClick={()=>deleteProductById(product.id)}>
                        <Delete color='error'></Delete>
                      </IconButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    You have not added any product
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
};

export default VendorHome;
