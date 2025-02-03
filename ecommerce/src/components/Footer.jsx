import React from 'react'
import styles from '../styles/Footer.module.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='row bg-dark'>
        <div className='col-sm-4 text-white'>
            <h5 className='text-center'> Connect with us</h5>
            <div className='d-flex justify-content-around'>
                <button className={`${styles.circular}  btn btn-secondary`}><span className='bi bi-facebook'></span></button>
                <button className={`${styles.circular}  btn btn-secondary`}><span className='bi bi-instagram'></span></button>
                <button className={`${styles.circular}  btn btn-secondary`}><span className='bi bi-twitter'></span></button>
              
            </div>
            <div className='d-flex justify-content-around my-2'>
            <button className={`${styles.circular}  btn btn-secondary`}><span className='bi bi-youtube'></span></button>
                <button className={`${styles.circular}  btn btn-secondary`}><span className='bi bi-envelope-at'></span></button>
                <button className={`${styles.circular}  btn btn-secondary`}><span className='bi bi-chat'></span></button>
            </div>
        </div>
        
        <div className='col-sm-4 text-white d-flex flex-column align-items-center mb-2'>
          <h5>About us</h5>  
          <p>
          Welcome to LaceUp, the ultimate destination for shoe enthusiasts! Our online ecommerce website is dedicated to bringing you a curated collection of stylish, high-quality shoes that will make your feet happy. Whether you're looking for the latest trends in sneakers, elegant formal shoes, comfortable athletic footwear, or anything in between, LaceUp has got you covered.
          </p>
         <div>
          <span className='badge bg-info'><span className='bi bi-arrow-right'></span></span>
         <Link href='/About'> About us</Link>
         </div>

        </div>
        <div className='col-sm-4 text-white d-flex flex-column align-items-center'>
          <h5>Help Center</h5>
          <p>
          Welcome to our Help Center, your one-stop destination for all your inquiries and assistance needs. We understand that navigating through a website or using an online service can sometimes raise questions or concerns. That's why we have developed our Help Center to provide you with comprehensive support and guidance every step of the way.
          </p>
          <div>
          <span className='badge bg-info'><span className='bi bi-arrow-right'></span></span>
         <Link href='/'>Help Center</Link>
         </div>
        </div>

        <div className='row text-white'>
         <span className='bi bi-c-circle'> 2023 LaceUp,Inc.All Rights Reversed</span>

          <p>Designed By: Shoes Hub Group</p>
        </div>
    </div>
  )
}

export default Footer