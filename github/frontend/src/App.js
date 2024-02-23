import './App.css';
import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Products from './Pages/Products';
import Contact from './Pages/Contact';
import SingleProduct from './Pages/SingleProduct';
import Cart from './Pages/Cart';
import ErrorPage from './Pages/ErrorPage';
import { GlobalStyle } from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Address from './Pages/Address';
import MyOrders from './Pages/MyOrders';

function App() {

  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29, 29, 29, .8)",
      white: "#fff",
      black: "#212529",
      helper: "#8490ff",

      bg:"rgb(188 189 220 / 40%);",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
      "linear-gradient(0deg,rgb(132 144 255) 0%, rgb(98 189 252) 100%",
      shadow:
      "rgba(0,0,0,0.02) 0px 1px 3px 0px, rgba(27,31,35,0.15) 0px 0px 0px 1px;",
      shadowSupport: "rgba(0,0,0,0.16) 0px 1px 4px",
    },
    media:{
      mobile: "768px",
      tab: "998px",
    }
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle/>
        <Header/>
        <Routes>
  
          <Route path='/' element={<Register/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/singleproduct/:id' element={<SingleProduct/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/address-component' element={<Address/>}/>
          <Route path='/my-orders' element={<MyOrders/>}/>
          <Route path='*' element={<ErrorPage/>}/>
         <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
        <Footer/>
      </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
