import style from "./FoodBlog.module.css";
import Food from "../../images/Blogs/Food.WebP";
import { useNavigate } from "react-router-dom";
import { useEffect, memo } from "react";

function FoodEnable({ loginStatus }) {
    const navigate = useNavigate();
    
    useEffect(() => {
        const imgFood = new Image();
        imgFood.src = Food;
            if (!loginStatus) {
                navigate("/login");
            }
    }, [loginStatus, navigate]);

    return localStorage.getItem('loginStatus') ? <FoodBlog /> : null;
}

function FoodBlog() {
    return (
        <>    
            <h1 style={{textAlign:'center', marginTop:'2%', fontSize:'250%'}}>Tips for Dog Owners: Choosing Safe and Nutritious Pet Food</h1>
            <p style={{textAlign:'center', marginTop:'1%', fontSize: '150%'}}>5 min read</p>
            <img src={Food} alt="Grooming" className={style.img}></img>
            <h2 className={style.h2}>Tips for Dog Owners to Avoid Mistakes in Choosing Pet Food</h2>
            <div className={style.ul}>
                <h3>As a responsible dog owner, it is crucial to ensure that the food you provide for your furry friend is safe and nutritious. Making mistakes in selecting pet food can have detrimental effects on your dog's health.<br/>Here are some essential tips to help you avoid making mistakes when choosing food products for your pets:</h3>
                <ol style={{ listStyleType: 'roman' }}>
                    <br/><li><h4>Read the Ingredients List Carefully:</h4></li>
                    <p>When purchasing dog food, take the time to read and understand the ingredients list. Look for high-quality protein sources, such as chicken, beef, or fish, listed as the main ingredient. Avoid products that contain fillers, artificial preservatives, and additives. Opt for natural and wholesome ingredients that provide the necessary nutrients for your dog's well-being.</p><br/>
                    <li><h4>Consider Your Dog's Specific Needs:</h4></li>
                    <p>Every dog has unique dietary requirements based on factors like age, breed, size, and health conditions. Consult with your veterinarian to determine the appropriate type of food for your pet. Puppies, adult dogs, and senior dogs have different nutritional needs, and it is essential to select food that meets these requirements.</p>
                    <p>If your dog has any specific health issues, such as allergies or sensitivities, choose a specialized diet that addresses these concerns. Some dogs may require grain-free or hypoallergenic formulas to prevent adverse reactions.</p><br/>
                    <li><h4>Avoid Harmful Ingredients:</h4></li>
                    <p>There are certain ingredients that can be harmful or toxic to dogs. Avoid feeding your pet foods that contain chocolate, onions, garlic, grapes, raisins, or artificial sweeteners like xylitol. These substances can cause serious health issues, including kidney failure, anemia, or even death. Familiarize yourself with the list of foods that are toxic to dogs and ensure they are not present in the products you choose.</p>
                    <p>Additionally, be cautious about the use of excessive salt, sugar, and fat in your dog's diet. These can lead to weight gain, diabetes, and other health problems. Opt for low-sodium and low-fat options when available.</p><br/>
                    <li><h4>Choose Trusted Brands:</h4></li>
                    <p>When it comes to pet food, not all brands are created equal. It is essential to choose reputable and trusted brands that prioritize quality and safety. Look for brands that have undergone rigorous testing and have a good track record of producing reliable products. Research online reviews and consult with your veterinarian for recommendations.</p><br/>
                    <li><h4>Gradually Introduce New Foods:</h4></li>
                    <p>If you decide to switch your dog's food, do it gradually to prevent digestive upset. Sudden changes in diet can cause gastrointestinal issues like diarrhea or vomiting. Gradually introduce the new food by mixing it with the old one over a period of 7-10 days. This will allow your dog's digestive system to adjust to the new food gradually.</p><br/>
                    <li><h4>Conclusion:</h4></li>
                    <p>Choosing the right food for your dog is a crucial aspect of responsible pet ownership. By reading ingredient lists, considering your dog's specific needs, avoiding harmful ingredients, choosing trusted brands, and introducing new foods gradually, you can ensure that your furry friend receives the nutrition they need without any harm. Remember to consult with your veterinarian for personalized advice and recommendations for your dog's diet.</p>

                </ol>
            </div>
        </>
    );
}

export default memo(FoodEnable);
