import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Food from "../../images/Blogs/Food.WebP";
import Grooming from "../../images/Blogs/grooming.WebP";

function BlogEnable({ loginStatus }) {
    const navigate = useNavigate();
    
    useEffect(() => {
        const imgFood = new Image();
        imgFood.src = Food;
        const imgGrooming = new Image();
        imgGrooming.src = Grooming;
            if (!loginStatus) {
                navigate("/login");
            }
    }, [loginStatus, navigate]);

    return localStorage.getItem('loginStatus') ? <BlogsPage /> : null;
}

function BlogsPage() {
    return (
        <>    
            <h1 style={{ textAlign:'center', marginTop:'4.6%' }}>Blogs</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ width: '50%', padding: '10px' }}>
                    <Link to="/blogs/grooming"><img src={Grooming} alt="Grooming" style={{ width: '100%', marginTop:'5%', }} /></Link>
                    <h3 style={{ marginTop:'2%' }}>GROOMING</h3>
                    <h2 style={{ marginTop:'2%', marginBottom:'10%' }}>The Importance of Pet Grooming and Choosing Safe Products</h2>
                </div>
                <div style={{ width: '50%', padding: '10px' }}>
                    <Link to="/blogs/food"><img src={Food} alt="Food" style={{ width: '100%', marginTop:'5%' }} /></Link>
                    <h3 style={{ marginTop:'2%' }}>FOOD</h3>
                    <h2 style={{ marginTop:'2%', marginBottom:'10%' }}>Tips for Dog Owners: Choosing Safe and Nutritious Pet Food</h2>
                </div>
            </div>
        </>
    );
}

export default BlogEnable;
