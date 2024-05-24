import { useNavigate } from "react-router-dom";
import Beets from "../../images/Vegetables/Beets.WebP";
import Broccoli from "../../images/Vegetables/Broccoli.WebP";
import Carrot from "../../images/Vegetables/Carrot.WebP";
import GreenPeas from "../../images/Vegetables/GreenPeas.WebP";
import Spinach from "../../images/Vegetables/Spinach.WebP";
import styles from "./Vegetables.module.css";
import { useEffect, useState, memo } from "react";

function VegetablesEnable({ loginStatus }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!loginStatus) {
            navigate("/login");
        }
      }, [loginStatus, navigate]);

    return localStorage.getItem('loginStatus') ? <Vegetables /> : null;
}

function Vegetables(){
    const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = [Beets, Broccoli, Carrot, GreenPeas, Spinach];
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

  if (!imagesLoaded) {
    return <div style={{cursor:'wait'}}>Loading...
    </div>;
  }
    const veges = [{
        name: "Beets",
        img: Beets,
        usefulness: ["Beets are a vibrant, versatile root vegetable that packs fiber, folate, and manganese into each serving with very few caloriesTrusted Source.",
            "They’re also rich in nitrates, which your body converts into nitric oxide — a compound that can help dilate blood vessels.",
            "This may help reduce blood pressure and lower the chanceTrusted Source of developing heart disease."
        ]
    },{
        name: "Broccoli",
        img: Broccoli,
        usefulness: ["Just 1 cup (91 g)Trusted Source of raw broccoli provides 77% of the DV for vitamin K, 90% of the DV for vitamin C, and a good amount of folate, manganese, and potassium.",
            "Broccoli is rich in a sulfur-containing plant compound called glucosinolate, as well as its byproduct sulforaphane."
        ]
    },{
        name: "Carrot",
        img: Carrot,
        usefulness: ["Carrots are packed with vitamin A, delivering 119% of the DV in just 1 cup (128 g)Trusted Source. It also contains nutrients like vitamin C and potassium.",
            "They also contain beta-carotene, an antioxidant that providesTrusted Source them with a vibrant orange color. Your body converts it into vitamin A."
        ]
    },{
        name: "GreenPeas",
        img: GreenPeas,
        usefulness: ["Peas are a starchy vegetable, which means they have more carbs and calories than non-starchy veggies and may affect blood sugar levels when eaten in large amounts.",
            "Nevertheless, just 1 cup (160 g) Trusted Sourcecontains 9 g of fiber, 9 g of protein, and vitamins A, C, and K, as well as riboflavin, thiamine, niacin, and folate."
        ]
    },{
        name: "Spinach",
        img: Spinach,
        usefulness: ["This leafy green tops the chart as one of the most nutrient-dense vegetables.",
        "That’s because 1 cup (30 grams (g)) Trusted Sourceof raw spinach provides 16% of the Daily Value (DV) for vitamin A plus 120% of the DV for vitamin K — all for just 7 calories.",
        "Spinach also boasts antioxidants, which may helpTrusted Source reduce your chance of developing diseases such as cancer."]
    }]
    return<>
    <h1 className={styles.name}>Vegetables</h1>
    <div className={styles.Container}>
        {veges &&
            veges.map((value)=>{
                const {name,img,usefulness} = value;
                return<>
                <img src={img} className={styles.img} alt={name}></img>
                <div className={styles.txt}>
                <p><b>Name:</b> {name}</p>
                <p><b>Benefits: </b></p>
                <ul>
                {usefulness.map((value)=>{
                    return<>
                        <li>{value}</li>
                    </>
                })}
                </ul>
                </div>
                <hr className={styles.hr}/>
                </>
            })

        }
    </div>
    </>
}

export default memo(VegetablesEnable);
