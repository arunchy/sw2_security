import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Details from './pages/Details';
import AdminRoutes from './admin/AdminRoutes';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';
import Otp from './pages/Otp';
import Search from './pages/Search';
import Product from './pages/Product';
import Category from './pages/Category';
import Logout from './pages/Logout';
import EditProduct from './vendor/EditProduct';
import VendorSignup from './vendor/Signup';
import VendorOtp from './vendor/Otp';
import VendorLogin from './vendor/VendorLogin';
import VendorHome from './vendor/Home';
import Crud from './vendor/AddProduct';
import VendorProduct from './vendor/Product';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <ToastContainer> </ToastContainer>
      <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/cart' element={<Cart></Cart>}></Route>
      <Route path='/signup' element={<Signup></Signup>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/profile' element={<Profile></Profile>}></Route>
      <Route path='/details' element={<Details></Details>}></Route>
      <Route path='/otp' element={<Otp></Otp>}></Route>
      <Route path='/search' element={<Search></Search>} ></Route>
      <Route path='/product' element={<Product></Product>}></Route>
      <Route path='/category/:category' element={<Category></Category>}></Route>
      <Route path='/logout' element={<Logout></Logout>}></Route>
      <Route path='/vendor/signup' element={<VendorSignup></VendorSignup>}></Route>
      <Route path='/vendor/otp' element={<VendorOtp></VendorOtp>}></Route>
      <Route path='/vendor/addProduct' element={<Crud></Crud>}></Route>
      <Route path='/vendor/editProduct/:id' element={<EditProduct></EditProduct>}></Route>
      <Route path='vendor/view/:id' element={<VendorProduct></VendorProduct>}></Route>
      <Route path='/vendor/login' element={<VendorLogin></VendorLogin>}></Route>
      <Route path='/vendor/home' element={<VendorHome></VendorHome>}></Route>
     
      </Routes>
     
    </Router> 
    </Provider> 
  );
}

export default App;
