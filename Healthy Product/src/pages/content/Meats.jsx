import { useNavigate } from "react-router-dom";
import Beef from "../../images/Meat/Beef.WebP";
import Chicken from "../../images/Meat/Chicken.WebP";
import Fish from "../../images/Meat/Fish.WebP";
import Mutton from "../../images/Meat/Mutton.WebP";
import Pork from "../../images/Meat/Pork.WebP";
import styles from "./Meats.module.css";
import { useEffect, useState } from "react";

function MeatsEnable({ loginStatus }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('loginStatus')) {
            navigate("/login");
        }
      }, [loginStatus, navigate]);

    return localStorage.getItem('loginStatus') ? <Meats /> : null;
}


function Meats(){
    const [imagesLoaded, setImagesLoaded] = useState(false);
    useEffect(() => {
        const preloadImages = [Beef, Chicken, Fish, Mutton, Pork];
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
    const Meat = [{
        name: "Beef",
        img: Beef,
        usefulness: ["Beef is an excellent source of protein.",
            "It supplies 10 essential nutrients including B-vitamins, zinc, and iron that support an active and healthy lifestyle.",
            "The nutrients in beef provide our bodies with the strength to thrive throughout all stages of life."
        ]
    },{
        name: "Chicken",
        img: Chicken,
        usefulness: ["chicken contains vitamin B12 and choline, which together may promote brain development in children, help the nervous system function properly and aid cognitive performance in older adults.",
            "Chicken is a source of high-quality dietary protein. 30 grams of protein per meal could benefit muscle growth."
        ]
    },{
        name: "Fish",
        img: Fish,
        usefulness: ["Fish is filled with omega-3 fatty acids and vitamins such as D and B2 (riboflavin).",
            "Fish is rich in calcium and phosphorus and a great source of minerals, such as iron, zinc, iodine, magnesium, and potassium."
        ]
    },{
        name: "Mutton",
        img: Mutton,
        usefulness: ["It contains high amounts of iron, It contains high levels of vitamin B12, It contains very little cholesterol and hence may be consumed regularly.",
            "It is said to contain proteins that act as hunger-suppressing agents, thus keeping you full for longer."
        ]
    },{
        name: "Pork",
        img: Pork,
        usefulness: ["Pork is naturally rich in protein. Protein contributes to the maintenance and growth in muscle mass and is needed for normal growth and development of children’s bones.",
        "Pork is a source of zinc, selenium and vitamins B12 and B6, these help the immune system to work normally.",
        "Pork is a source of vitamins B12, B6, Niacin and Riboflavin – B vitamins that help reduce tiredness and fatigue as part of a healthy balanced diet and lifestyle."]
    }]
    return<>
    <h1 className={styles.name}>Meats</h1>
    <div className={styles.Container}>
        {Meat &&
            Meat.map((value)=>{
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

export default MeatsEnable