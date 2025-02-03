import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { createBillApi, getCartDataApi } from '../api/api';
import { toast } from 'react-toastify';

export default function Cart() {
  const [buyingData, setBuyingData] = useState({});
  const [index, setIndex] = useState(0);
  const [isBuy, setIsBuy] = useState(false);
  const [cartId, setCartId] = useState(0);
  const [quantityData, setQuantityData] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const getCartData = async () => {
      try {
        const response = await getCartDataApi();
        if (response.status === 200) {
          setCartData(response.data);
          setQuantityData(response.data.map(() => 1)); // Default quantity of 1 for each item
          setProductSize(response.data.map(item => item.product_details.product_size || 'size_S')); // Default size from product or 'S'
        }
      } catch (error) {
        console.log("Error while fetching cart data", error);
      }
    };
    getCartData();
  }, []);

  const handleQuantityChange = (event, index) => {
    const newQuantity = parseInt(event.target.value);
    const newQuantityData = [...quantityData];
    newQuantityData[index] = newQuantity;
    setQuantityData(newQuantityData);
  };

  const handleSizeChange = (event, index) => {
    const newSize = event.target.value;
    const newSizeData = [...productSize];
    newSizeData[index] = newSize;
    setProductSize(newSizeData);
  };

  const handleBuy = async(event, index) => {
    const cartId = event.target.value;
    const foundItem = await cartData.find(item => item.cart_id === parseInt(cartId));
    setIndex(index);
    setCartId(cartId);
    setSize(productSize[index]);
    setQuantity(quantityData[index]);

    const buyingItem = {
      productId: foundItem && foundItem.product_details.id,
      productName:foundItem && foundItem.product_details.product_name,
      productPrice: foundItem && foundItem.product_details.product_price,
      productDisplayPicture:  foundItem && foundItem.product_details.product_display_picture,
    };
    setBuyingData(buyingItem);
    setIsBuy(true);
  };

  const handleProceedToPay = async() => {
    const totalPrice = buyingData.productPrice * quantity;
    try{
      const data={"quantity":parseInt(quantity),"prize":parseInt(totalPrice),"size":size,"product_details":buyingData.productId,"cart_id":cartId}
      console.log("data: ",data)
      console.log("buying data: ",buyingData)
     const response=await createBillApi(data);
     if(response.status===201){
       toast.success("you purchase successfully..");
       const getCartData = async () => {
        try {
          const response = await getCartDataApi();
          if (response.status === 200) {
            setCartData(response.data);
            setQuantityData(response.data.map(() => 1)); // Default quantity of 1 for each item
            setProductSize(response.data.map(item => item.product_details.product_size || 'S')); // Default size from product or 'S'
          }
        } catch (error) {
          console.log("Error while fetching cart data", error);
        }
      };
      getCartData();

     }
    }catch(error){
        toast.error("error while purchasing try after relogin..")
    }

   

    // Dummy action for proceeding to payment
    setIsBuy(false);
  };
  console.log("cartData: ",cartData)
  return (
    <>
      <main>
        <div className='container-fluid'>
          <NavBar />
          <div className='row' style={{ marginTop: "120px" }}>
            <h3 className='text-center'>
              <span className='bi bi-bag'>
                <b>My Cart</b>
              </span>
            </h3>
          </div>
          <div className='row d-flex flex-column-reverse flex-lg-row my-auto'>
            <div className='col-lg-8 col-12'>
              {cartData.map((item, index) => (
                <div className='row border' key={index}>
                  <div className='col-md-7 d-flex align-items-center'>
                    <img
                      src={item.product_details.product_display_picture}
                      alt='product'
                      height={200}
                      width={180}
                    />
                    <div className='mx-sm-2'>
                      <h5>{item.product_details.product_brand}</h5>
                      <p>{item.product_details.product_name}</p>
                      <select
                        className='form-select form-select-sm'
                        onChange={(event) => handleSizeChange(event, index)}
                        value={productSize[index]}>
                        <option value='size_S'>S</option>
                        <option value='size_L'>L</option>
                        <option value='size_M'>M</option>
                        <option value='size_XL'>XL</option>
                        <option value='size_XXL'>XXL</option>
                      </select>
                    </div>
                  </div>
                  <div className='col-md-5 d-flex flex-column'>
                    <div className='d-flex justify-content-between'>
                      <p>Each</p>
                      <p>Quantity</p>
                      <p>Total</p>
                    </div>
                    <div className='d-flex justify-content-between'>
                      <p>{item.product_details.product_price}</p>
                      <select
                        className='form-select form-select-sm'
                        style={{ height: '40px', width: '100px' }}
                        onChange={(event) => handleQuantityChange(event, index)}
                        value={quantityData[index]}
                      >
                        {[...Array(5)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                      <p className='text-primary'>
                        {item.product_details.product_price * quantityData[index]}
                      </p>
                    </div>
                    <div className='mx-auto my-auto'>
                      <button
                        className='btn btn-outline-dark'
                        value={item.cart_id}
                        onClick={(event) => handleBuy(event, index)}
                        id={`btn${item.cart_id}`}
                      >
                        <label htmlFor={`btn${item.cart_id}`}>Buy</label>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='col-lg-4 col-12'>
              {isBuy && (
                <div className='row d-flex justify-content-center'>
                  <p className='text-center text-black-50'>Counter</p>
                  <h6 className='text-center'>{buyingData.productName}</h6>
                  <div className='row d-flex align-items-center'>
                    <div className='col-sm-6'>
                      <img
                        src={`http://localhost:8000/${buyingData.productDisplayPicture}` &&  buyingData.productDisplayPicture}
                        height={180}
                        width={150}
                        alt='product'
                      />
                    </div>
                    <div className='col-sm-6'>
                      <p>Size: {size}</p>
                      <p>Quantity: {quantity}</p>
                      <p>Total: {quantity * buyingData.productPrice}</p>
                    </div>
                    <div className='mx-auto' style={{ width: '180px' }}>
                      <button
                        className='btn btn-outline-dark mx-auto'
                        onClick={handleProceedToPay}
                      >
                        Proceed to pay
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
