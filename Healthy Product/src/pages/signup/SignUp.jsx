import { useState, useEffect } from "react";
import styles from "./SignUp.module.css";
import loginImg from "../../images/Cover/login_img.WebP";

function SignUp() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loginImgLoaded, setLoginImgLoaded] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [createdUsername, setCreatedUsername] = useState("");

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
    return <div style={{ cursor: 'wait' }}>Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Ddata = localStorage.getItem('database');
    const dataInDatabase = Ddata ? JSON.parse(Ddata) : null;

    if (!dataInDatabase || dataInDatabase.email !== formData.email) {
      const data = JSON.stringify(formData);
      localStorage.setItem('database', data);
      setCreatedUsername(formData.username);
      setAccountCreated(true);
    } else {
      alert('Account already present');
    }

    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div className={styles.content}>
      <div className={styles.loginContainer}>
        <div className={styles.img}>
          <img src={loginImg} alt="Nature" style={{ height: '69.9%', width: '100%', marginTop: '11px', paddingRight: '1%' }} />
        </div>
        <div>
          <div className={styles.loginTxt}>
            <h1>Sign Up</h1>
          </div>
          <div className={styles.contentInput}>
            <form onSubmit={handleSubmit}>
              &nbsp;&nbsp;<label>UserName:</label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                placeholder="Username"
                autoFocus
                onChange={handleChange}
                required
                autoComplete="on"
                style={{ marginLeft: '10px' }}
              />
              <br />
              <br />
              &nbsp;&nbsp;<label>Email:</label><br />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
                required
                autoComplete="on"
                style={{ marginLeft: '10px' }}
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
                style={{ marginLeft: '10px' }}
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
      {accountCreated && <p className={styles.message}>Hi {createdUsername}, Your account has been created.<br/>Proceed to login!</p>}
    </div>
  );
}

export default SignUp;
