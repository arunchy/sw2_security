import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { addFriendApi } from '../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Search() {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.search.results); // Assuming user ID is stored in localStorage
   const navigate=useNavigate();
  


  return (
    <div className='container-fluid'>
    <NavBar isFocus={true} />
    <div className="row" style={{marginTop:"120px"}}>
      <div className="col-sm-12">
        <h2>Search Results:</h2>
      </div>
    </div>

    <div className="row mt-4">
      {results && results.length > 0 ? (
        results.map((item) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={item.id}>
            <div className='card overflow-hidden border'>
              <img
                src={`http://localhost:8000/${item.product_display_picture}`}
                height={260}
                width={280}
                alt={item.product_name}
              />
              <div className='card-body'>
                <h5 className='card-title'>{item.product_name}</h5>
                <p className='card-text'>{item.product_description}</p>
                <div>
                  <button
                    className='btn'
                    value={item.id}
                    id={`btn${item.id}`}
                  >
                    <label className='bi bi-cart lead' htmlFor={`btn${item.id}`}></label>
                  </button>
                  <button
                    className='btn'
                    value={item.id}
                    id={`view${item.id}`}
                   
                  >
                    <label className='bi bi-eye lead' htmlFor={`view${item.id}`}></label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="row d-flex justify-content-center align-items-center" style={{height:"100vh",width:"100vw"}}>
          <div className='col-sm-3 d-flex flex-column align-items-center'>
             <img src={`${process.env.PUBLIC_URL}/sad_face.png`} alt='sadface' height={200} width={200}></img>
             <p className='text-danger'>No Result Found</p>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}

export default Search;
