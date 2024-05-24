import styles from "./HomePage.module.css"
import Fruits from "../../images/Cover/Fruits.WebP";
import Vegetables from "../../images/Cover/Vegetables.WebP"
import Meats from "../../images/Cover/Meats.WebP"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, memo } from "react";

function HomeEnable({ loginStatus }) {
    const navigate = useNavigate();
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
      const preloadImages = [Fruits, Vegetables, Meats];
      const imagePromises = preloadImages.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
  
      Promise.all(imagePromises)
        .then(() => setImagesLoaded(true))
        .catch((error) => console.error("Error preloading images:", error));
    }, []);
  
    useEffect(() => {
      if (!loginStatus) {
          navigate("/login");
      }
    }, [loginStatus, navigate]);
  
    return imagesLoaded && localStorage.getItem("loginStatus") ? (
      <HomePage />
    ) : null;
  }

function HomePage() {

    return <>
        <div className={styles.contentText}>
            <h1 className={styles.h1}>Select your topic!</h1>
            <h3 className={styles.h3}>Each topic has 5 healthy products and their benefits.</h3>
            <div className={styles.fimageContainer}>
                <Link to="/home/fruits"><img src={Fruits} className={styles.fruits} alt="Fruits"></img></Link>
                 <div className={styles.foverlayText}>Fruits</div>
            </div>
            <div className={styles.vimageContainer}>
                <Link to="/home/vegetables"><img src={Vegetables} className={styles.veges} alt="Vegetables"></img></Link>
                <div className={styles.voverlayText}>Vegetables</div>
            </div>
            <div className={styles.mimageContainer}>
                <Link to="/home/meats"><img src={Meats} className={styles.meats} alt="Fruits"></img></Link>
                <div className={styles.moverlayText}>Meats</div>
            </div>
            
        </div>
    </>
}

export default memo(HomeEnable);
