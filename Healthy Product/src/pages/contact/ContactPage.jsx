import styles from "./ContactPage.module.css";
import PH from "../../images/Logo/PH.WebP";
import ML from "../../images/Logo/ML.WebP";
import { useNavigate } from "react-router-dom";
import { useEffect, memo } from "react";

function ContactEnable({loginStatus}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!loginStatus) {
        navigate("/login");
    }
  }, [loginStatus, navigate]);
  return localStorage.getItem('loginStatus') ? <ContactPage /> : null;
}

function ContactPage() {
  const emailId = 'aravinthsivavadivu@gmail.com';
  const phoneNumber = 8838615817;

  useEffect(() => {
    const imgPH = new Image();
    imgPH.src = PH;
    const imgML = new Image();
    imgML.src = ML;
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.displayBox}>
        <h1 style={{ textAlign: 'center', backgroundColor: 'black', color: 'whitesmoke' }}>Contact</h1>
        <div className={styles.display}>
          <img src={PH} className={styles.img} style={{ marginTop: '5%' }} alt="PH" /><br /><br />
          <p style={{ textDecoration: 'underline 2px', fontSize: '25px' }}>Call</p><br />
          <a href={`tel:${phoneNumber}`} style={{ textDecoration: 'none', fontSize: '25px' }}><span className={styles.txt}>Ph: </span>{phoneNumber}</a>
        </div>

        <div className={styles.display}>
          <img src={ML} className={styles.img} alt="ML" /><br /><br />
          <p style={{ textDecoration: 'underline 2px', fontSize: '25px' }}>Mail To</p><br />
          <a href={`mailto:${emailId}`} style={{ textDecoration: 'none', fontSize: '25px' }}><span className={styles.txt}>Mail: </span>{emailId}</a>
        </div>
      </div>
    </div>
  );
}

export default memo(ContactEnable);
