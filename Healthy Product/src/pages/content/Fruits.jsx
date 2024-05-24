import { useNavigate } from "react-router-dom";
import Apples from "../../images/Fruits/Apples.WebP";
import Elderberry from "../../images/Fruits/Elderberry.WebP";
import Kiwiberry from "../../images/Fruits/Kiwiberry.WebP";
import Papaya from "../../images/Fruits/Papaya.WebP";
import Watermelon from "../../images/Fruits/Watermelon.WebP";
import styles from "./Fruits.module.css";
import { useEffect, useState, memo } from "react";

function FruitsEnable({loginStatus}) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!loginStatus) {
            navigate('/login');
        }
    }, [loginStatus,navigate]);

    return localStorage.getItem('loginStatus') ? <Fruits /> : null;
}

function Fruits() {
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const preloadImages = [Apples, Elderberry, Kiwiberry, Papaya, Watermelon];
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
        return <div style={{ cursor: 'wait' }}>Loading...</div>;
    }

    const fruits = [
        {
            name: "Apple",
            img: Apples,
            usefulness: [
                "An apple a day may in fact keep your cardiologist away.",
                "Evidence has shown that frequent apple consumption may reduce total cholesterol, which can help reduce your risk of heart disease.",
                "That’s thanks to the phenolic compounds — antioxidant compounds that help to promote healthy cellular function and proper blood flow — found in apple skins.",
                "And there are so many ways to eat them, from simple slices dipped in nut butter or yogurt, to stuffed with nuts and raisins and baked, or even as part of a salad or sandwich."
            ]
        },
        {
            name: "Elderberry",
            img: Elderberry,
            usefulness: [
                "This is what your cold-busting elderberry syrup is made from, and the fruit itself has a sweet and tart flavor that's great on its own or as a compote or jam.",
                "Black elderberries are very high in anthocyanins, pigment-lending plant compounds that support heart and brain health as well as the immune system."
            ]
        },
        {
            name: "Kiwiberry",
            img: Kiwiberry,
            usefulness: [
                "This relative of the furry-fleshed kiwi is much smaller but just as nutritious.",
                "Smooth-skinned with the same sweet tartness as larger kiwis, the kiwiberry is a robust source of vitamin C and also contains lutein (a player in eye health), as well as other essential nutrients such as potassium, calcium and zinc."
            ]
        },
        {
            name: "Papaya",
            img: Papaya,
            usefulness: [
                "This tropical fruit boasts an impressive list of nutrients.",
                "Papaya is a good source of vitamins A, C and E, which play a role in immunity, skin health and heart health, as well as fiber (especially if you eat the seeds, which some people may find a bit bitter, but they're totally edible)."
            ]
        },
        {
            name: "Watermelon",
            img: Watermelon,
            usefulness: [
                "Watermelon is 92% water, making it a great choice for hydration.",
                "Your food provides about 20% of your fluid intake, and eating water-packed snacks like watermelon can help you avoid subtle, headache-spurring dehydration.",
                "What makes watermelon an extra great hydration helper is that it's also a source of potassium and magnesium, two minerals that function as electrolytes to help balance fluid levels and offset excess sodium in your diet."
            ]
        }
    ];

    return (
        <>
            <h1 className={styles.name}>Fruits</h1>
            <div className={styles.Container}>
                {fruits.map((fruit) => (
                    <div key={fruit.name}>
                        <img src={fruit.img} className={fruit.name === 'Apple' || fruit.name === 'Watermelon' ? styles.applW : styles.img} alt={fruit.name} />
                        <div className={fruit.name === 'Apple' || fruit.name === 'Watermelon' ? styles.applWtxt : styles.txt}>
                            <p><b>Name:</b> {fruit.name}</p>
                            <p><b>Benefits: </b></p>
                            <ul>
                                {fruit.usefulness.map((benefit, index) => (
                                    <li key={index}>{benefit}</li>
                                ))}
                            </ul>
                        </div>
                        <hr className={styles.hr} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default memo(FruitsEnable);
