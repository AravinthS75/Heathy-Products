import { Link, useNavigate } from "react-router-dom";
import { useEffect, memo } from "react";
import Food from "../../images/Blogs/Food.WebP";
import Grooming from "../../images/Blogs/grooming.WebP";
import styles from "./BlogsPage.module.css"; 

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
            <h1 style={{ textAlign: 'center', marginTop: '4.6%' }}>Blogs</h1>
            <div className={styles.blogContainer}>
                <div className={styles.blogItem}>
                    <Link to="/blogs/grooming"><img src={Grooming} alt="Grooming" className={styles.blogImage} /></Link>
                    <h3>GROOMING</h3>
                    <h2>The Importance of Pet Grooming and Choosing Safe Products</h2>
                </div>
                <div className={styles.blogItem}>
                    <Link to="/blogs/food"><img src={Food} alt="Food" className={styles.blogImage} /></Link>
                    <h3>FOOD</h3>
                    <h2>Tips for Dog Owners: Choosing Safe and Nutritious Pet Food</h2>
                </div>
            </div>
        </>
    );
}

export default memo(BlogEnable);
