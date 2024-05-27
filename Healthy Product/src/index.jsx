import React, { useEffect, useState, Suspense } from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./index.module.css";
import f_img from "./images/field.WebP";
const Footer = React.lazy (()=>import("./components/Footer"));
const Header = React.lazy (()=>import("./components/Header"));
const Login = React.lazy (()=>import("./pages/login-logout/Login"));
const Nopage  = React.lazy (()=>import( "./pages/nopage/Nopage"));
const HomeEnable = React.lazy (()=>import( './pages/home/HomePage'));
const ContactEnable  = React.lazy (()=>import( "./pages/contact/ContactPage"));
const AboutEnable = React.lazy (()=>import( "./pages/about/AboutPage"));
const FoodEnable = React.lazy (()=>import( "./pages/blogs/FoodBlog"));
const GroomingEnable = React.lazy (()=>import( "./pages/blogs/GroomingBlog"));
const BlogEnable = React.lazy (()=>import( "./pages/blogs/BlogsPage"));
const FruitsEnable = React.lazy (()=>import( "./pages/content/Fruits"));
const VegetablesEnable = React.lazy (()=>import( "./pages/content/Vegetables"));
const MeatsEnable = React.lazy (()=>import( "./pages/content/Meats"));
const SignUp = React.lazy (()=>import( "./pages/signup/SignUp"));
const StoreEnable = React.lazy (()=>import( "./pages/store/Store"));
const OrderEnable = React.lazy (()=>import( "./pages/order/Order"));
const CheckoutEnable = React.lazy (()=>import( "./pages/checkout/Checkout"));
const Test = React.lazy (()=>import( "./pages/test/Test"));

function MasterPage() {

  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    checkLoginStatus();
    preloadImages();
    const data = [{}]
    localStorage.setItem('database',JSON.stringify(data));
  }, []);

  const checkLoginStatus = () => {
    if (localStorage.getItem('loginStatus')) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  };
  const preloadImages = () => {
    const images = [f_img]; 
    images.forEach((image) => {
      new Image().src = image;
    });
  };
 
  return ( 
    <Suspense fallback={<div style={{padding:'50%'}}>Loading...</div>}>
    <BrowserRouter>
      <Header loginStatus = {loginStatus} setLoginStatus={setLoginStatus} />
      <Routes>
        <Route path="/" element={<LandingContent />} />
        <Route path="/home" element={<HomeEnable loginStatus={loginStatus}/>} />
        <Route path="/about" element={<AboutEnable loginStatus={loginStatus}/>} />
        <Route path="/contact" element={<ContactEnable loginStatus={loginStatus}/>} />
        <Route path="/login" element={<Login loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>} />
        <Route path="/blogs" element={<BlogEnable loginStatus={loginStatus}/>} />
        <Route path="/home/fruits" element={<FruitsEnable loginStatus={loginStatus}/>} />
        <Route path="/home/vegetables" element={<VegetablesEnable loginStatus={loginStatus}/>} />
        <Route path="/home/meats" element={<MeatsEnable loginStatus={loginStatus}/>} />
        <Route path="/blogs/grooming" element={<GroomingEnable loginStatus={loginStatus}/>} />
        <Route path="/blogs/food" element={<FoodEnable loginStatus={loginStatus}/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/myorder" element={<OrderEnable loginStatus={loginStatus}/>}/>
        <Route path="/store" element={<StoreEnable loginStatus={loginStatus}/>} />
        <Route path="/checkout" element={<CheckoutEnable loginStatus={loginStatus}/>} />
        <Route path="*" element={<Nopage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </Suspense>
  );
}


function LandingContent() {
  return (<>
  <div className={styles.content}>
    <h1 style={{textAlign:"center", paddingTop:"2%", textDecoration:"underline"}}>Healthy Products Website</h1>
    <img className={styles.fimg} src={f_img} ></img>
    <div className={styles.contentText}>
      <h1>Welcome to Healthy Products Website!</h1>
      <p>This is a website that explains about the benefits of 5 products in "Fruits", "Vegetables" and "Meats".</p>
      <p>Please Login and hop into the website by accessing webpages through the navigation bar.</p>
      <p>We also have 3 herbal products, You can purchase them in store.</p>
    </div>
  </div>
    </>
  );
} 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MasterPage />
  </React.StrictMode>
);
  

export default MasterPage;
