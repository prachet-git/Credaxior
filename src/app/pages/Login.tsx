import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (token && role) {
      navigate(`/${role.toLowerCase()}`);
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({ username, password });

      
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data.role);

      const rolePath = data.role.toLowerCase();
      
      window.location.href = `/${rolePath}`;


      
      switch (data.role) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "LENDER":
          navigate("/lender");
          break;
        case "BORROWER":
          navigate("/borrower");
          break;
        case "ANALYST":
          navigate("/analyst");
          break;
        default:
          navigate("/");
      }

    } catch (err: any) {
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Loan Management Login</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

//  Styles
const styles: any = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    padding: "30px",
    borderRadius: "10px",
    background: "white",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "300px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
    border: "none",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
  },
};