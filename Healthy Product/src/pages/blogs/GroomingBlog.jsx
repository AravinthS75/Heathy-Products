import style from "./GroomingBlog.module.css";
import Grooming from "../../images/Blogs/grooming.WebP";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function GroomingEnable({ loginStatus }) {
    const navigate = useNavigate();
    
    useEffect(() => {
        const imgGrooming = new Image();
        imgGrooming.src = Grooming;
            if (!loginStatus) {
                navigate("/login");
            }
    }, [loginStatus, navigate]);

    return localStorage.getItem('loginStatus') ? <GroomingBlog /> : null;
}
 
function GroomingBlog() {
    return (
        <div>
            <h1 style={{textAlign:'center', marginTop:'2%', fontSize:'250%'}}>The Importance of Pet Grooming and Choosing Safe Products</h1>
            <p style={{textAlign:'center', marginTop:'1%', fontSize: '150%'}}>5 min read</p>
            <img src={Grooming} alt="Grooming" className={style.img}></img>
            <h2 className={style.h2}>Why is Pet Grooming Necessary?</h2>
            <div className={style.ul}>
                <ul style={{ listStyleType: 'disc' }}>
                    <li>Pet grooming is an essential aspect of caring for our furry friends. It involves the regular cleaning, maintenance, and overall well-being of our pets' physical appearance.</li>
                    <li>While grooming may vary depending on the type of pet, there are several reasons why it is necessary for all pets.</li>
                    <li>Firstly, grooming helps maintain the cleanliness of our pets. Regular bathing removes dirt, debris, and odors from their fur, which not only keeps them smelling fresh but also prevents skin irritations and infections.</li>
                    <li>Additionally, grooming includes brushing their fur, which helps to remove loose hair and prevent matting, keeping their coat healthy and shiny.</li>
                    <li>Secondly, grooming helps to monitor and maintain the health of our pets. During the grooming process, we can inspect their skin for any abnormalities, such as rashes, lumps, or parasites.</li>
                    <li>Early detection of such issues allows for timely treatment, preventing them from worsening or causing discomfort to our pets.</li>
                    <li>Regular grooming also includes checking their ears, eyes, and teeth, ensuring they are clean and free from any infections or dental problems.</li>
                    <li>Furthermore, grooming promotes a strong bond between pets and their owners.</li>
                    <li>The physical contact and attention that grooming provides can be a soothing and enjoyable experience for pets, strengthening the bond of trust and love between them and their owners</li>
                    <li>It also allows owners to spend quality time with their pets, providing them with the care and attention they need.</li>
                </ul>
            </div>
            <h2 className={style.h2}>Things to Note About Grooming Products</h2>
            <div className={style.ul}>
                <ul style={{ listStyleType: 'disc' }}>
                    <li>Before using grooming products on our pets, there are several important factors to consider to ensure their safety and well-being</li>
                    <li>Firstly, it is crucial to choose grooming products that are specifically formulated for pets. Human products, such as shampoos or soaps, may contain ingredients that can be harmful to animals.</li>
                    <li>Pet-specific products are designed to meet the unique needs of different pets, taking into account their skin sensitivity and coat type.</li>
                    <li>Always read the labels and choose products that are suitable for your pet's specific requirements.</li>
                    <li>Secondly, it is important to be cautious of any potential allergies or sensitivities your pet may have. Some pets may have allergic reactions to certain ingredients in grooming products.</li>
                    <li>It is advisable to perform a patch test before using a new product, applying a small amount on a small area of their skin and monitoring for any adverse reactions.</li>
                    <li>If any signs of irritation or discomfort occur, discontinue use immediately and consult a veterinarian.</li>
                    <li>Additionally, it is essential to follow the instructions provided by the manufacturer when using grooming products.</li>
                    <li>Each product may have specific directions for use, including the recommended amount to use, duration of application, and rinsing instructions.</li>
                    <li>Adhering to these instructions ensures the product's effectiveness and prevents any potential harm to your pet.</li>
                    <li>In conclusion, pet grooming is necessary for maintaining the cleanliness, health, and overall well-being of our pets. It helps prevent skin irritations, infections, and promotes a strong bond between pets and their owners.</li>
                    <li>When using grooming products, it is important to choose pet-specific products, be cautious of any allergies or sensitivities, and follow the manufacturer's instructions.</li>
                    <li>By prioritizing proper grooming practices and using safe products, we can ensure our pets are happy, healthy, and well-cared for.</li>
                </ul>
            </div>
        </div>
    );
}

export default GroomingEnable;
