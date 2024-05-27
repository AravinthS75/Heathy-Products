import styles from "./AboutPage.module.css";
import img from "../../Aravinth S.WebP";
import FB from "../../images/Logo/FB.WebP";
import IG from "../../images/Logo/IG.WebP";
import TWT from "../../images/Logo/TWT.WebP";
import LI from "../../images/Logo/LI.WebP";
import { useNavigate } from "react-router-dom";
import { useEffect, memo } from "react";

function AboutEnable({ loginStatus }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginStatus) {
      navigate("/login");
    }
    const mainImage = new Image();
    mainImage.src = img;
    const icons = [FB, IG, TWT, LI];
    const iconImages = [];
    icons.forEach(iconPath => {
      const icon = new Image();
      icon.src = iconPath;
      iconImages.push(icon);
    });
    return () => {
      mainImage.onload = null;
      iconImages.forEach(icon => {
        icon.onload = null;
      });
    };
  }, [loginStatus, navigate]);

  return localStorage.getItem('loginStatus') ? <AboutPage /> : null;
}

function AboutPage() {
  const person = {
    name: "Aravinth Sivasubramani S",
    age: 23,
    location: "Chennai, India.",
    native: "Karur",
    occupation: "FullStack Developer",
    skills: ["HTML", "CSS", "Java", "React", "SQL"],
    certificates: ["Java", "Python", "C & C++", "Java FullStack"],
    education: {
      degree: "Bachelor of Technology in IT",
      institution: "M.Kumarasamy College of Engineering",
      year: "2019-2023"
    }
  };
  const link = {
    Ig: "https://www.instagram.com/aravsiva_?igsh=MW43bzd6MHc4OGV1NQ==",
    Fb: "https://www.facebook.com/share/GDtmDPKd3r53Uogr/?mibextid=qi2Omg",
    Li: "https://www.linkedin.com/in/aravinth-s-931045221",
    Twt: "https://x.com/AravinthSiva95?t=PeKnXKWQGIMxlBI3BR074g&s=08"
  };

  return (
    <>
      <div className={styles.imageContainer}>
        <img fetchPriority="high" src={img} alt={person.name} className={styles.img} />
        <h2 className={styles.nameMobile}>S.Aravinth Sivasubramani</h2>
      </div>
      <div className={styles.content}>
        <h1 style={{ textDecoration: "underline", fontSize: "35px", paddingTop: "15%" }}>About Me</h1>
        <div className={styles.txt}>
          <p><b>Name:</b> {person.name}</p>
          <p><b>Age:</b> {person.age}</p>
          <p><b>Location:</b> {person.location}</p>
          <p><b>Native:</b> {person.native}</p>
          <p><b>Occupation:</b> {person.occupation}</p>
          <p><b>Skills:</b> {person.skills.join(", ")}</p>
          <p><b>Certificates:</b> {person.certificates.join(", ")}</p>
          <p><b>Education:</b></p>
          <ul>
            <li><b>Degree:</b> {person.education.degree}</li>
            <li><b>Year:</b> {person.education.year}</li>
            <li><b>Institute:</b> {person.education.institution}</li>
          </ul>
          <p><b>Connect:</b> </p>
          <div className={styles.logo}>
            <a href={link.Fb} target="_blank" rel="noopener noreferrer"><img src={FB} className={styles.conect}></img></a>
            <a href={link.Ig} target="_blank" rel="noopener noreferrer"><img src={IG} className={styles.conect} style={{ marginLeft: '5px' }}></img></a>
            <a href={link.Li} target="_blank" rel="noopener noreferrer"><img src={LI} className={styles.conect} style={{ marginLeft: '5px' }}></img></a>
            <a href={link.Twt} target="_blank" rel="noopener noreferrer"><img src={TWT} className={styles.conect} style={{ marginLeft: '5px' }}></img></a>
          </div>
          </div>
    </div>
    <div className={styles.h2}>
      <h2>S. Aravinth Sivasubramani</h2>
    </div>
  </>
);
}

export default memo(AboutEnable);
