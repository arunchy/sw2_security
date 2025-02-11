import React, {  useEffect, useState } from 'react';
import styles from '../styles/Homepage.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { addToCartApi, getAllProductApi, getBrandsApi, getFemaleProductApi, getLatestProductApi, getMenProductsApi, getProductByBrand } from '../api/api';
import { toast } from 'react-toastify';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { RemoveRedEye,  ShoppingCart } from '@mui/icons-material';
import { useSelector } from 'react-redux';

 
export default function Home() {
  //  const authData=useSelector((state)=>state.auth);
  //  console.log("auth data: ",authData)
  //  useEffect(() => {
  //   if (!authData.is_authenticated) {
  //     navigate("/login");
  //   }
  // }, [authData.is_authenticated]);
   const [latestProduct,setLatestProduct]=useState({});
   const [productBrands,setProductBrand]=useState([]);
   const [productsByBrands,setProductsByBrand]=useState([]);
   const [maleProducts,setMaleProducts]=useState([]);
   const [femaleProducts,setFemaleProducts]=useState([]);
   
   useEffect(()=>{
    const getAllProducts=async()=>{
     try{
      const response=await getAllProductApi();
      console.log("get all product response: ",response);
      if(response.status===200){
        setProductsByBrand(response.data);
      }
     }catch(error){
      toast.error("error fetching products.please restart the servers")
     }
    }
    getAllProducts();
   },[])

   function getFullImageUrl(imagePath) {
    const baseUrl = "http://localhost:8000";

    if (imagePath.startsWith("/")) {
        // If the path is relative, prepend the base URL
        return `${baseUrl}${imagePath}`;
    }

    // If the path is already a full URL, return it as is
    return imagePath;
}


    const male = [
        {
            shoeDisplayPicture: 'https://cdn-images.farfetch-contents.com/22/90/24/57/22902457_52938675_1000.jpg',
            shoeName: 'Male Shoe 1',
            shoeBrand: { brandName: 'Brand 1' },
            shoeId: 2,
        },
        {
            shoeDisplayPicture: 'https://cdn-images.farfetch-contents.com/22/24/59/41/22245941_52161603_1000.jpg',
            shoeName: 'Male Shoe 2',
            shoeBrand: { brandName: 'Brand 3' },
            shoeId: 6,
        },
        {
            shoeDisplayPicture: 'https://cdn-images.farfetch-contents.com/22/90/24/57/22902457_52938675_1000.jpg',
            shoeName: 'Male Shoe 1',
            shoeBrand: { brandName: 'Brand 1' },
            shoeId: 2,
        },
        {
            shoeDisplayPicture: 'https://cdn-images.farfetch-contents.com/22/24/59/41/22245941_52161603_1000.jpg',
            shoeName: 'Male Shoe 2',
            shoeBrand: { brandName: 'Brand 3' },
            shoeId: 6,
        },
        {
            shoeDisplayPicture: 'https://cdn-images.farfetch-contents.com/22/90/24/57/22902457_52938675_1000.jpg',
            shoeName: 'Male Shoe 1',
            shoeBrand: { brandName: 'Brand 1' },
            shoeId: 2,
        },
        {
            shoeDisplayPicture: 'https://cdn-images.farfetch-contents.com/22/24/59/41/22245941_52161603_1000.jpg',
            shoeName: 'Male Shoe 2',
            shoeBrand: { brandName: 'Brand 3' },
            shoeId: 6,
        }
    ];
    
   
    
   


  const navigate = useNavigate();

  useEffect(()=>{
    const fetchLatestProduct = async () => {
      try {
        const response = await getLatestProductApi();
        setLatestProduct(response.data); // Assuming response.data contains the latest product object
        console.log("response latest product: ",response.data);
      } catch (error) {
        console.error("Error fetching the latest product:", error);
      }
    };

    const getBrands=async()=>{
      try{
        const response=await getBrandsApi();
        if(response.status===200){
          setProductBrand(response.data.product_brands);
        }
      }catch(error){
       toast.error("error fetching brands..")
      }
    }

    
    const get_male_products=async()=>{
      try{
      const response=await getMenProductsApi();
      if(response.status===200){
        setMaleProducts(response.data);
      }
      }catch(error){
       toast.error("Error fetching the men product..")
      }
    }
    const get_female_products=async()=>{
       try{
       const response=await getFemaleProductApi();
       if(response.status===200){
        setFemaleProducts(response.data);
       }
       }catch(error){
         toast.error("Error fetching female product..")
       }
    }


    getBrands();
    fetchLatestProduct();
    get_male_products();
    get_female_products();
  },[])


 
  const fetchByBrand = async (e) => {
    const brand = e.target.value;
    try{
      const response=await getProductByBrand(brand);
      if(response.status===200){
       setProductsByBrand(response.data);
       console.log("products by brand: ",response.data)
      }else{
        toast.error("error fetching products by brand..")
      }
    }catch(error){
        toast.error("error fetching products by brand..")
    }
  }

  const addToCart = async (productId) => {
    const formData = new FormData();
    console.log("product: ",productId)
    formData.append("product_details", productId);
    try {
      const response=await addToCartApi(formData);
      if(response.status===201){
        toast.success("product added to cart..")
      }
    } catch (error) {
      toast.error("error occurs while adding to cart.please relogin as user");
      // navigate("/login");
    }
  }

   
  const handleBrandView=(index)=>{
      console.log("index: ",index);
      const productData=productsByBrands[index];
      navigate('/product',{state:{productData}});
  }
  const handleLatestProductView=()=>{ 
    navigate('/product',{state:{productData:latestProduct}})
  }
  const handleMenProductView=(index)=>{
    const productData=maleProducts[index];
    console.log("id: ",index)
    console.log("male product data view: ",productData)
    navigate('/product',{state:{productData}});
  }
  const handleFemaleProductView=(index)=>{
    const productData=maleProducts[index];
    navigate('/product',{state:{productData}});
  }




  return (
    <>
        <title>Home</title>
      <main>
        <div className='container-fluid'>
            <NavBar></NavBar>
          <div className={`${styles.backgroundImage} row d-flex flex-column flex-md-row`} style={{marginTop:"170px"}}>
            <div className='col-md-6 col-12 d-flex justify-content-center align-items-center'>
              <div className='row'>
                <div className={`${styles.cardShadow} card w-100 border`}>
                  <img src={`http://localhost:8000/${latestProduct.product_display_picture}`} width={300} height={300} alt={latestProduct.product_name} className='card-img-top' />
                  <div className='card-body'>
                    <p className='text-center text-dark'>New Available Product</p>
                    <h5 className='card-title'><b>{latestProduct.product_brand}</b></h5>
                    <p className='card-text'>{latestProduct.product_name}</p>
                    <p className='card-text fs-5'><span className='badge bg-dark'>Rs {latestProduct.product_price}</span></p>
                    <button className='btn btn-outline-dark mx-2' onClick={addToCart} value={latestProduct.id} id={`btn${latestProduct.id}`}><label className='bi bi-cart' id={`btn${latestProduct.id}`}></label></button>
                    <button className='btn btn-outline-dark mx-2' onClick={handleLatestProductView}><span className='bi bi-eye'></span></button>
                  </div>
                </div>
              </div>
            </div>
            <div className={` ${styles.newImage} col-12 col-md-6 d-flex justify-content-center`}>
              <div className='row' style={{ width: '400px' }}>
                {/* <img src={newImage} height={500} width={400} alt='new Available Shoes Image' /> */}
               

                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={`${male[0].shoeDisplayPicture}`} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={`${male[1].shoeDisplayPicture}`}  className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={`${male[2].shoeDisplayPicture}`}  className="d-block w-100" alt="..."/>
    </div>
  </div>
</div>

              </div>
            </div>
          </div>
          <div className='row d-flex' style={{marginTop:"100px"}}>
            <div className='col-sm-6 d-flex justify-content-end'>
              <p className='text-primary text-center'>Product by Brands</p>
            </div>
            <div className='col-sm-6 d-flex justify-content-end py-2'>
              <select className='form-select' style={{ width: '210px' }} onChange={fetchByBrand}>
                {
                  productBrands.map((brand,index)=>
                    (
                      <option value={brand} key={index}>{brand}</option>
                      
                    )
                  )
                }
                <option value="some value">some value</option>
              </select>
            </div>
          </div>
          <p><b></b></p>
          <div className='row'>
            {
              productsByBrands.map((item,index) => (
                <div className='col-sm-5 col-md-3' key={item.id}>
                   <Card sx={{ maxWidth: 345, margin: '20px auto', boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="250"
        image={getFullImageUrl(item.product_display_picture)}
        alt="Sample Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.product_brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.product_description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={()=>addToCart(item.id)}>
          <ShoppingCart></ShoppingCart>
        </Button>
        <Button size="small" variant="outlined" onClick={()=>handleBrandView(index)}>
         <RemoveRedEye></RemoveRedEye>
        </Button>
      </CardActions>
    </Card>

                </div>
              ))
            }
          </div>
          <p className='text-center text-primary' style={{marginTop:"50px",marginBottom:"30px"}}>Mens Section</p>
          <div className='row overflow-auto flex-nowrap'>
            {
              maleProducts.map((item,index) => (
                <div className='col-8 col-sm-6 col-md-3' key={item.id}>  

<Card sx={{ maxWidth: 345, margin: '20px auto', boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="250"
        image={getFullImageUrl(item.product_display_picture)}
        alt="Sample Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.product_brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.product_description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={()=>addToCart(item.id)}>
          <ShoppingCart></ShoppingCart>
        </Button>
        <Button size="small" variant="outlined" onClick={()=>handleMenProductView(index)}>
          <RemoveRedEye></RemoveRedEye>
        </Button>
      </CardActions>
    </Card>

                </div>
              ))
            }
          </div>
          <br />
          <p className='text-center text-primary' style={{marginTop:"50px"}}>Womens Section</p>
          <div className='row overflow-auto flex-nowrap'>
            {
              femaleProducts.map((item,index) => (
                <div className='col-5 col-md-3' key={item.id}>
                   
<Card sx={{ maxWidth: 345, margin: '20px auto', boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="250"
        image={getFullImageUrl(item.product_display_picture)}
        alt="Sample Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.product_brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.product_description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={()=>addToCart(item.id)}>
         <ShoppingCart></ShoppingCart>
        </Button>
        <Button size="small" variant="outlined" onClick={()=>handleFemaleProductView(index)}>
          <RemoveRedEye></RemoveRedEye>
        </Button>
      </CardActions>
    </Card>
                </div>
              ))
            }
          </div>
        </div>
      </main>
    </>
  );
}
