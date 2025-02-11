import React, { useRef, useState } from 'react';
import styles from '../styles/Signup.module.css';
import { useFormik } from 'formik';
import { curdSchema } from '../schema/crud';
import { createProductApi } from '../api/api';
import { toast } from 'react-toastify';
import NavBar from './NavBar';

export default function Crud() {
  const noImage = `${process.env.PUBLIC_URL}/no_image.png`;
  const getMainImg = useRef();
  const getExtraImage1 = useRef();
  const getExtraImage2 = useRef();
  const getExtraImage3 = useRef();
  const [imageLink, setImageLink] = useState({
    mainImg: noImage,
    extraImg1: noImage,
    extraImg2: noImage,
    extraImg3:noImage,
  });



  const handleMainImg = (e) => {
    e.preventDefault();
    const{name}=e.target;
    if(e.target.type==="file"){
      const file=e.target.files[0];
      if(file){
        const objectUrl = URL.createObjectURL(file);
        setFieldValue("mainImg",e.target.files[0]);
        setImageLink((prevImageLink)=>({...prevImageLink,[name]:objectUrl}));
      }else{
        console.log("please select image file ...");
      }
     }

  };
  const handleExtraImage1 = (e) => {
    e.preventDefault();
    const {name}=e.target;
    if(e.target.type==="file"){
      const file=e.target.files[0];
      if(file){
        setFieldValue("extraImg1",e.target.files[0]);
        const objectUrl = URL.createObjectURL(file);
        setImageLink((prevImageLink)=>({...prevImageLink,[name]:objectUrl}));
      }else{
        console.log("please select image file ...")
      }
     }
  };
  const handleExtraImage2 = (e) => {
    e.preventDefault();
    const{name}=e.target;
    if(e.target.type==="file"){
      const file=e.target.files[0];
      if(file){
        const objectUrl = URL.createObjectURL(file);
        setFieldValue("extraImg2",e.target.files[0]);
        setImageLink((prevImageLink)=>({...prevImageLink,[name]:objectUrl}));
      }else{
        console.log("please select image file ...")
      }
     }
  };
  const handleExtraImage3 = (e) => {
    e.preventDefault();
    const{name}=e.target;
    if(e.target.type==="file"){
      const file=e.target.files[0];
      if(file){
        const objectUrl = URL.createObjectURL(file);
        setFieldValue("extraImg3",e.target.files[0]);
        setImageLink((prevImageLink)=>({...prevImageLink,[name]:objectUrl}));
      }else{
        console.log("please select image file ...")
      }
     }
  };



  const initialValues = {
    productName: '',
    productDescription: '',
    productBrand: '',
    productPrice: '',
    productColor: '',
    productType: '',
    productAudience: '',
    sizeS: '',
    sizeM: '',
    sizeL: '',
    sizeXL: '',
    sizeXXL: '',
    extraImg1:null,
    extraImg2:null,
    extraImg3:null,
    mainImg:null,
  };

const createProduct=async(formData)=>{
     try{
        const response=await createProductApi(formData);
        if(response.status!==201){
         toast.error("error while creating new product..");
        }
        toast.success("New product created successfully..")
        


     }catch(error){
        toast.error("error while creating new product...")
     }
}

  const { values, errors, handleBlur, handleChange, handleSubmit, touched,setFieldValue} = useFormik({
    initialValues:initialValues,
    validationSchema: curdSchema,
    onSubmit:(values,{resetForm})=>{
        // console.log("submit clicked...");
        // console.log(values);
        const formData=new FormData();
        formData.append("product_name",values.productName);
        formData.append("product_brand",values.productBrand);
        formData.append("product_description",values.productDescription);
        formData.append("product_color",values.productColor);
        formData.append("product_audience",values.productAudience);
        formData.append("product_price",values.productPrice);
        formData.append("product_type",values.productType);
        formData.append("product_display_picture",values.mainImg);
        formData.append("product_extra_picture_1",values.extraImg1);
        formData.append("product_extra_picture_2",values.extraImg2);
        formData.append("product_extra_picture_3",values.extraImg3);
        formData.append("size_S",values.sizeS);
        formData.append("size_XS",values.sizeXL);
        formData.append("size_M",values.sizeM);
        formData.append("size_L",values.sizeL);
        formData.append("size_XL",values.sizeXL);
        formData.append("size_XXL",values.sizeXXL);
        createProduct(formData);
        // resetForm();
        
        
     
    }
  });
  

  console.log("errors: ",errors)

 
  return (
    <div className={`container-fluid`} >
      <NavBar></NavBar>
      <div className={`${styles.model} row mt-5 d-flex align-items-center justify-content-center`} style={{marginTop:"130px"}}>
        <div className={`${styles.innerModel} `}>
          <h5 className='text-center text-dark my-4 fw-bold'>Add New Product</h5>
          <div className='container'>
          <form onSubmit={handleSubmit}>
            <div className='row d-flex justify-content-center'>
              <div className='col-md-4 col-sm-6'>
                <span className='small text-danger'>{touched.productName&&errors.productName}</span>
                <input type='text' className='form-control my-2' placeholder='Product FullName' name='productName' onChange={handleChange} onBlur={handleBlur} value={values.productName}></input>
                <input className='form-control' placeholder='Product Brand' name='productBrand' onChange={handleChange} onBlur={handleBlur}></input>
                <span className='small text-danger'>{touched.productBrand && errors.productBrand}</span>
                <br></br>
                <span className='text-black small'>Amount of Products</span>
                <div className='row d-flex justify-content-lg-between'>
                  <input className='form-control' placeholder='S' style={{width:'70px'}} name='sizeS' value={values.sizeS} onChange={handleChange} onBlur={handleBlur}></input>
                  <input className='form-control' placeholder='M' style={{width:'70px'}} name='sizeM' value={values.sizeM} onChange={handleChange} onBlur={handleBlur}></input>
                  <input className='form-control' placeholder='L' style={{width:'70px'}} name='sizeL' value={values.sizeL} onChange={handleChange} onBlur={handleBlur}></input>
                  <input className='form-control' placeholder='XL' style={{width:'70px'}} name='sizeXL' value={values.sizeXL} onChange={handleChange} onBlur={handleBlur}></input>
                  <input className='form-control' placeholder='XXL' style={{width:'70px'}} name='sizeXXL' value={values.sizeXXL} onChange={handleChange} onBlur={handleBlur}></input>
                </div>
                <span className='small text-danger'>{touched.sizeS && errors.sizeS}</span>
                <br></br>
                <span className='small text-danger'>{touched.sizeM && errors.sizeM}</span>
                <br></br>
                <span className='small text-danger'>{touched.sizeL && errors.sizeL}</span>
                <br></br>
                <span className='small text-danger'>{touched.sizeXL && errors.sizeXL}</span>
                <br></br>
                <span className='small text-danger'>{touched.sizeXXL && errors.sizeXXL}</span>

                <br></br> 
                 
                 
                <span className='small text-black'>Select Product Type</span>
                <select className='form-select' name='productType' onChange={handleChange} onBlur={handleBlur} value={values.productType}>
                  <option value='Jens'>Jens</option>
                  <option value='Tshirt'>Tshirt</option>
                  <option value='Shoes'>Shoes</option>
                  <option value='Dress'>Dress</option>
                  <option value='Skirt'>Skirt</option>
                  <option value='Shorts'>Shorts</option>
                  <option value='Jacket'>Jacket</option>
                  <option value='Activewear'>Activewear</option>
                </select>
                <span className='small text-danger'>{touched.productType && errors.productType}</span>
                <br />



                <span className='small text-black'>Select Product Audience</span>
                <select className='form-select' value={values.productAudience} name='productAudience' onChange={handleChange} onBlur={handleBlur}>
                  <option value='Men'>Men</option>
                  <option value='Women'>Women</option>
                  <option value="Unisex">Unisex</option>
                  <option value="">Children</option>

                </select>
                <span className='text-danger small'>{touched.productAudience && errors.productAudience}</span>
                <br></br>
               
                    <span className='text-primary small'>Select Main Picture</span>
                    <br></br>
                    <button onClick={(e) =>{
                       e.preventDefault();
                       getMainImg.current.click()
                    } } style={{height:'120px', width:'120px', overflow:'hidden'}} onBlur={handleBlur}>
                      <img src={imageLink.mainImg} alt='mainImage' height={120} width={120}></img>
                    </button>
                    <input type='file' className='d-none' name='mainImg' ref={getMainImg} onChange={handleMainImg} required></input>
                    <br></br>
                    <span className='text-danger small'>{errors.mainImg}</span>
              
              </div>
              <div className='col-md-4 col-sm-6'>
                <textarea className='form-control' placeholder='Product Description' name='productDescription' value={values.productDescription} onChange={handleChange}onBlur={handleBlur}></textarea>
                <span className='text-danger small'>{touched.productDescription && errors.productDescription}</span>
                <input className='form-control my-2' type='text' placeholder='Product Price' name='productPrice' value={values.productPrice} onChange={handleChange} onBlur={handleBlur}></input>
                <span className='text-danger small'>{touched.productPrice && errors.productPrice}</span>
                <input className='form-control' placeholder='Product Color' name='productColor' value={values.productColor} onChange={handleChange} onBlur={handleBlur}></input>
                <span className='text-danger small'>{touched.productColor&& errors.productColor}</span>
                 
                <div className='row'>
                  <div className='col-md-4 col-6 d-flex flex-column align-items-center'>
                   
                        <span className='text-primary my-3 small'>select Extra Picture1</span>
                        <button onClick={() => getExtraImage1.current.click()} style={{height:'120px', width:'120px', overflow:'hidden'}} onBlur={handleBlur}>
                          <img src={imageLink.extraImg1} alt='extraImage1' height={120} width={120}></img>
                        </button>
                        <input type='file' className='d-none' name='extraImg1' ref={getExtraImage1} onChange={handleExtraImage1} ></input>
                        <span className='text-danger small'>{errors.extraImg1}</span>

                        <br></br> 
                    
                  </div>
                  <div className='col-md-4 col-6 d-flex flex-column align-items-center'>
                    
                        <span className='text-primary my-3 small'>select Extra Picture2</span>
                        <button onClick={() => getExtraImage2.current.click()} style={{height:'120px', width:'120px', overflow:'hidden'}} onBlur={handleBlur}>
                          <img src={imageLink.extraImg2} alt='extraImage2' height={120} width={120}></img>
                        </button>
                        <input type='file' className='d-none' name='extraImg2' ref={getExtraImage2} onChange={handleExtraImage2} ></input>
                        <span className='text-danger small'>{errors.extraImg2}</span>
                        <br></br> 
                     
                  </div>

                  <div className='col-md-4 col-6 d-flex flex-column align-items-center'>
                    
                    <span className='text-primary my-3 small'>select Extra Picture3</span>
                    <button onClick={() => getExtraImage3.current.click()} style={{height:'120px', width:'120px', overflow:'hidden'}}>
                      <img src={imageLink.extraImg3} alt='extraImage3' height={120} width={120} onBlur={handleBlur}></img>
                    </button>
                    <input type='file' className='d-none' name='extraImg3' ref={getExtraImage3} onChange={handleExtraImage3}></input>
                    <span className='text-danger small'>{errors.extraImg3}</span>
                    <br></br> 
                 
              </div>


                </div>
                <div className='d-flex align-items-center justify-content-center my-4'>
                  <button type='submit' className='btn btn-primary my-2'  onClick={handleSubmit}>Add Product</button>
                </div>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}
