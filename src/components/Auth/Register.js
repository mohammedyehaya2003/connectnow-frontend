import { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    setLoading(true);

  try {

    const res = await axios.post(
      "https://connectnow-backend-bk7y.onrender.com/api/auth/register",
      {
        name,
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
  JSON.stringify(
    res.data.user
  )
); 
    


window.location.href = "/";

setLoading(false);

  } catch (error) {

    setLoading(false);

    console.log(error);

  }

};

return (

  <div
    style={{
      minHeight:"100vh",

      background:
"radial-gradient(circle at top left,#8b5cf6 0%,#111827 42%,#030712 100%)",

      display:"flex",

      justifyContent:"center",

      alignItems:"center",
    }}
  >

    <div
      style={{
        position:"absolute",

        width:"420px",

        height:"420px",

        background:
"rgba(168,85,247,0.28)",

        filter:"blur(170px)",

        borderRadius:"50%",

        top:"80px",

        left:"120px",
      }}
    ></div>

    <div
      style={{
        background:
"linear-gradient(180deg,#1e1b4b,#111827)",

        padding:"40px 48px",

        borderRadius:"32px",

        width:"460px",

        backdropFilter:
"blur(18px)",

        boxShadow:
"0 0 80px rgba(168,85,247,0.22)",

        border:
"1px solid rgba(168,85,247,0.45)",
      }}
    >

      <h1
        style={{
          color:"white",

          fontSize:"42px",

          fontWeight:"800",

          textAlign:"center",

          marginBottom:"12px",
        }}
      >

        Create Your ConnectNow Account

      </h1>

      <p
        style={{
          color:
"rgba(255,255,255,0.7)",

          textAlign:"center",

          marginBottom:"32px",

          fontSize:"15px",
        }}
      >

        Start collaborating with your team in minutes.

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

            color:"#c084fc",

            fontSize:"18px",
          }}
        >
          👤
        </span>

        <input
          type="text"

          placeholder="Enter name"

          value={name}

          onChange={(e)=>
            setName(e.target.value)
          }

          style={{
            width:"340px",

            padding:
"16px 16px 16px 50px",

            borderRadius:"16px",

            border:
"1px solid rgba(192,132,252,0.35)",

            background:
"rgba(2,6,23,0.92)",

            color:"white",

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

            color:"#c084fc",

            fontSize:"18px",
          }}
        >
          ✉
        </span>

        <input
          type="email"

          placeholder="Enter email"

          value={email}

          onChange={(e)=>
            setEmail(e.target.value)
          }

          style={{
            width:"340px",

            padding:
"16px 16px 16px 50px",

            borderRadius:"16px",

            border:
"1px solid rgba(192,132,252,0.35)",

            background:
"rgba(2,6,23,0.92)",

            color:"white",

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

            color:"#c084fc",

            fontSize:"18px",
          }}
        >
          🔒
        </span>

        <span

  onClick={() =>
    setShowPassword(
      !showPassword
    )
  }

  style={{
    position:"absolute",

    right:"16px",

    top:"16px",

    color:"#c084fc",

    cursor:"pointer",

    fontSize:"18px",
  }}
>

  {
    showPassword
      ? "🙈"
      : "👁️"
  }

</span>

        <input
          type={ showPassword
                  ? "text"
                  : "password"
}

          placeholder="Enter password"

          value={password}

          onChange={(e)=>
            setPassword(e.target.value)
          }

          style={{
            width:"340px",

            padding:
"16px 16px 16px 50px",

            borderRadius:"16px",

            border:
"1px solid rgba(192,132,252,0.35)",

            background:
"rgba(2,6,23,0.92)",

            color:"white",

            outline:"none",

            fontSize:"16px",
          }}
        />

      </div>

      <button
        onClick={handleRegister}

        disabled={loading}

        style={{
          width:"100%",

          padding:"16px",

          border:"none",

          borderRadius:"16px",

          background:
"linear-gradient(135deg,#8b5cf6,#7c3aed,#ec4899)",

          color:"white",

          fontSize:"17px",

          fontWeight:"700",

          cursor:"pointer",

          boxShadow:
"0 0 45px rgba(168,85,247,0.45)",

          marginTop:"12px",

          opacity: loading ? 0.75 : 1,
        }}
      >

        {
  loading
    ? "Creating Account..."
    : "Register"
}

      </button>

      <p
        style={{
          color:
"rgba(255,255,255,0.72)",

          textAlign:"center",

          marginTop:"12px",

          fontSize:"15px",
        }}
      >

        Already have an account?

        <span

          onClick={() =>
            window.location.href =
              "/login"
          }

          style={{
            color:"#c084fc",

            cursor:"pointer",

            fontWeight:"700",

            marginLeft:"8px",
          }}
        >

          Login →

        </span>

      </p>

    </div>

  </div>

);

}

export default Register;