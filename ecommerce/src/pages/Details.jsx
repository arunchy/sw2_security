import React, { useState } from 'react';
import NavBar from '../components/NavBar';
function Details() {
  

  // Dummy shoe data to replace backend API data
  const [shoeData] = useState({
    shoeId: 1,
    shoeBrand: { brandName: 'Nike' },
    shoeName: 'Air Max 90',
    shoePrice: 12000,
    shoeDescription: 'The Nike Air Max 90 stays true to its OG roots with the iconic Waffle sole, stitched overlays, and classic TPU accents.',
    shoeColor: 'Red',
    shoeDisplayPicture: 'https://cdn-images.farfetch-contents.com/17/67/69/95/17676995_36975923_1000.jpg', // Placeholder image
    shoeExtraPicture1: 'https://cdn-images.farfetch-contents.com/24/34/53/05/24345305_54740736_1000.jpg',
    shoeExtraPicture2: 'https://cdn-images.farfetch-contents.com/24/38/71/94/24387194_54379911_1000.jpg',
    shoeExtraPicture3: 'https://cdn-images.farfetch-contents.com/24/71/27/19/24712719_54730366_1000.jpg',
  });

  const handleAddToCart = (e) => {
    const shoeId = e.target.value;
    // Simulate adding to cart
    // console.log('Added to cart:', shoeId);
    // history.push('/Cart'); // Redirect to Cart page
  };

  return (
    <div className="container-fluid">
      <NavBar />
      <div className="row my-5 d-flex flex-column-reverse flex-md-row">
        <div className="col-md-4">
          <img src={shoeData.shoeDisplayPicture} alt="Shoe Display" height={550} width={500} />
        </div>
        <div className="col-md-4">
          <img src={shoeData.shoeExtraPicture1} alt="Shoe Extra" height={550} width={500} />
        </div>
        <div className="col-sm-4">
          <div className="my-4">
            <h2>{shoeData.shoeBrand.brandName}</h2>
            <p>{shoeData.shoeName}</p>
            <br />
            <h4>{`Rs. ${shoeData.shoePrice}`}</h4>
            <p>{shoeData.shoeDescription}</p>
            <div className="row d-flex justify-content-center">
              <p>Colors</p>
              <ul>
                <li>{shoeData.shoeColor}</li>
              </ul>
              <p>Sizes</p>
              <ul>
                <li>S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
              </ul>
            </div>

            <button
              className="btn btn-dark"
              value={shoeData.shoeId}
              onClick={handleAddToCart}
              id={`btn${shoeData.shoeId}`}
            >
              <label className="bi bi-bag" htmlFor={`btn${shoeData.shoeId}`}>
                {"  "} Add To Cart
              </label>
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <img src={shoeData.shoeExtraPicture2} alt="Shoe Extra 2" height={550} width={500} />
        </div>
        <div className="col-md-4">
          <img src={shoeData.shoeExtraPicture3} alt="Shoe Extra 3" height={550} width={500} />
        </div>
      </div>
    </div>
  );
}

export default Details;
