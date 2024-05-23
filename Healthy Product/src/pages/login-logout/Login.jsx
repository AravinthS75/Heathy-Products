import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import loginImg from "../../images/Cover/login_img.WebP";
import { useNavigate } from "react-router-dom";

function Login({ setLoginStatus }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginImgLoaded, setLoginImgLoaded] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = loginImg;
    img.onload = () => {
      setLoginImgLoaded(true);
    };
    img.onerror = () => {
      console.error("Error loading login image");
    };
  }, []);

  if (!loginImgLoaded) {
    return <div style={{cursor:'wait'}}>Loading...
    </div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const database = localStorage.getItem('database');
    const data = JSON.parse(database);
    if(formData.email === data.email && formData.password === data.password){
      setLoginStatus(true); 
      localStorage.setItem("loginStatus", true);
      navigate("/home");
    }
    else {
      alert("Wrong Email or Password!");
      setFormData({ email: "", password: "" });
      setLoginStatus(false);
      localStorage.setItem("loginStatus", false);
    }
  //   const url = "https://reqres.in/api/login";

  //   const option = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   };

  //   fetch(url, option)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.token === "QpwL5tke4Pnpja7X4") {
  //         setLoginStatus(true);
  //         localStorage.setItem("loginStatus", true);
  //         localStorage.setItem("Token", "QpwL5tke4Pnpja7X4");
  //         navigate("/home");
  //       } else {
  //         alert("Wrong Email or Password!");
  //         setFormData({ email: "", password: "" });
  //         setLoginStatus(false);
  //         localStorage.setItem("loginStatus", false);
  //       }
  //     });
  // 
};

  return (
    <div className={styles.loginPageWrapper}>
    <div className={styles.content}> 
      <div className={styles.loginContainer}>
        <div className={styles.img}>
        <img src={loginImg} alt="Nature" style={{height:'69.9%', width:'100%', marginTop:'11px', paddingRight:'1%'}} />
        </div>
        <div>
          <div className={styles.loginTxt}>
            <h1>Login</h1>
          </div>
          <div className={styles.contentInput}>
            <form onSubmit={handleSubmit}>
            &nbsp;&nbsp;<label>Email:</label><br/>
            <input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                placeholder="Email"
                autoFocus
                onChange={handleChange}
                required
                autoComplete="on"
                style={{marginLeft:'9px'}}
              />
              <br />
              <br />
              &nbsp;&nbsp;<label>Password:</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                required
                style={{marginLeft:'9px'}}
                autoComplete="on"
              />
              <br />
              <br />
              <div className={styles.contentButton}>
                <input type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Login;
