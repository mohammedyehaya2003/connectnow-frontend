import { useState } from "react";
import axios from "axios";

function Login() {

  const [email] = useState("");
  const [password] = useState("");

  const handleLogin = async () => {

  try {

    const res = await axios.post(
      "https://connectnow-backend-bk7y.onrender.com/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem(
  "token",
  res.data.token
);

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

console.log("Login successful ✅");

console.log(res.data);

window.location.href = "/chat";

  } catch (error) {

    console.log(error.response.data);

  }

};

  return (

  <div
    style={{
      minHeight: "100vh",

      maxWidth:"1400px",

      padding:"0 70px",

      background:
"radial-gradient(circle at top left,#0ea5e9 0%,#020617 38%,#020617 100%)",

      display: "flex",

      flexDirection: "row",

      justifyContent: "center",

     alignItems: "center",
    }}
  >


  <div
  style={{
    position: "absolute",

    width: "420px",

    height: "420px",

    background: "rgba(6,182,212,0.38)",

    filter:
      "blur(170px)",

    borderRadius: "50%",

    top: "80px",

    left: "120px",
  }}
></div>

<div
  style={{
    position:"absolute",

    width:"220px",

    height:"220px",

    borderRadius:"32px",

    background:
      "rgba(255,255,255,0.06)",

    top:"120px",

    right:"180px",

    backdropFilter:
      "blur(24px)",

    transform:
      "rotate(28deg)",
  }}
></div>

<div
  style={{
    position:"absolute",

    width:"150px",

    height:"150px",

    borderRadius:"50%",

    background:
      "rgba(96,165,250,0.18)",

    bottom:"90px",

    left:"220px",

    filter:
      "blur(40px)",
  }}
></div>

 <div
  style={{
    width: "420px",

    color: "white",

    marginRight: "50px",
  }}
>

  <h1
    style={{
      fontSize: "72px",

      fontWeight: "900",

      lineHeight: "1.1",

      marginBottom: "20px",
    }}
  >
    ConnectNow
  </h1>

  <p
    style={{
      fontSize: "24px",

      color:
        "rgba(255,255,255,0.75)",

      lineHeight: "1.8",
    }}
  >

    Real-Time Chat Platform

    <br/>

    Multi-Room • Images • Docs • Emoji
  </p>

  <div
  style={{
    display: "flex",

    alignItems: "center",

    gap: "12px",

    marginTop: "28px",

    marginBottom: "28px",
  }}
>

  <div
    style={{
      width: "12px",

      height: "12px",

      borderRadius: "50%",

      background: "#22d3ee",

      boxShadow:
        "0 0 18px #22d3ee",
    }}
  ></div>

  <span
    style={{
      color:
        "rgba(255,255,255,0.86)",

      fontSize: "16px",
    }}
  >
    Live users connected
  </span>

</div>

  <div
  style={{
    marginTop: "35px",

    display: "flex",

    gap: "14px",

    flexWrap: "wrap",
  }}
>

  <span
    style={{
      padding: "10px 18px",

      borderRadius: "999px",

      background:
        "rgba(255,255,255,0.08)",

      color: "white",

      fontSize: "14px",
    }}
  >
    ⚡ Real-Time
  </span>

  <span
    style={{
      padding: "10px 18px",

      borderRadius: "999px",

      background:
        "rgba(255,255,255,0.08)",

      color: "white",

      fontSize: "14px",
    }}
  >
    🖼️ Media Share
  </span>

</div>

</div>



    <div
  style={{
    background: "linear-gradient(180deg,rgba(2,6,23,0.92),rgba(15,23,42,0.88))",

    padding: "55px 48px",

    borderRadius: "32px",

    width: "460px",

    position: "relative",

    backdropFilter:
      "blur(18px)",

    boxShadow: "0 0 80px rgba(6,182,212,0.22)",

    border: "1px solid rgba(34,211,238,0.34)"

  }}
>

      <h1
  style={{

    color: "white",

    fontSize: "42px",

    fontWeight: "800",

    marginBottom: "12px",

    textAlign: "center",

  }}
>

  ConnectNow 🚀

</h1>

<p
  style={{

    color:
      "rgba(255,255,255,0.7)",

    textAlign: "center",

    marginBottom: "32px",

    fontSize: "15px",

  }}
>

  Real-Time Chat Platform

</p>


<div
  style={{
    position:"relative",

    marginBottom:"18px",
  }}
>

  <span
    style={{
      position:"absolute",

      left:"16px",

      top:"16px",

      color:"#22d3ee",

      fontSize:"18px",
    }}
  >
    ✉
  </span>

  <input
    type="email"
    placeholder="Enter email"

    style={{
      width:"340px",

      padding:"16px 16px 16px 50px",

      borderRadius:"16px",

      border:
        "1px solid rgba(34,211,238,0.24)",

      background:
        "rgba(2,6,23,0.92)",

      color:"white",

      boxShadow:
"inset 0 0 18px rgba(6,182,212,0.10)",

      outline:"none",

      fontSize:"16px",
    }}
  />

</div>

      <div
  style={{
    position:"relative",

    marginBottom:"18px",
  }}
>

  <span
    style={{
      position:"absolute",

      left:"16px",

      top:"16px",

      color:"#22d3ee",

      fontSize:"18px",
    }}
  >
    🔒
  </span>

  <input
    type="password"
    placeholder="Enter password"

    style={{
      width:"340px",

      padding:"16px 16px 16px 50px",

      borderRadius:"16px",

      border:
        "1px solid rgba(34,211,238,0.24)",

      background:
        "rgba(2,6,23,0.92)",

      color:"white",

      boxShadow:
"inset 0 0 18px rgba(6,182,212,0.10)",

      outline:"none",

      fontSize:"16px",
    }}
  />

</div>
      

      <button
  onClick={handleLogin}

  style={{

    width: "100%",

    padding: "16px",

    border: "none",

    letterSpacing:"1px",

    transform: "translateY(-2px)",

    borderRadius: "16px",

    background: "linear-gradient(135deg,#06b6d4,#2563eb,#7c3aed)",

    color: "white",

    fontSize: "17px",

    fontWeight: "700",

    cursor: "pointer",

    boxShadow: "0 0 40px rgba(6,182,212,0.45)",

    marginTop: "12px",
  }}
>

  Login

</button>

<p
  style={{
    color:
      "rgba(255,255,255,0.72)",

    textAlign:"center",

    marginTop:"22px",

    fontSize:"15px",
  }}
>

  Don't have an account?

  <span

     onClick={() =>
  window.location.href =
    "/register"
} 

    style={{
      color:"#22d3ee",

      cursor:"pointer",

      fontWeight:"700",

      marginLeft:"8px",
    }}
  >

    Register →

  </span>

</p>

    </div>
  </div>

);

}

export default Login;