import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null
  );

  const navigate = useNavigate();

  const setAuthData = (token, userId, userRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userRole", userRole);
    setToken(token);
    setUserId(userId);
    setUserRole(userRole);
  };

  const logout_url = "/api/logout";
  const login_url = "/api/login";


  const login = async (email, password, account_type) => {
    try {
      const response = await fetch(login_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, account_type }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.msg || "Login successful", {
          position: "top-right",
          autoClose: 6000,
          style: {
            borderRadius: "10px",
            background: "#101f3c",
            color: "#fff",
          },
        });

  navigate(`/${data.role}_portal/dashboard`);

        setAuthData(data.token, data.id, data.role);
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "An error occurred", {
          position: "top-right",
          autoClose: 6000,
          style: {
            borderRadius: "10px",
            background: "#101f3c",
            color: "#fff",
          },
        });
        throw new Error(errorData.msg || "An error occurred");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return { success: false, message: "Invalid username or password" };
    }
  };

const logout = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  try {
    const response = await fetch(logout_url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setToken(null);
      setUserId(null);
      setUserRole(null);
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('userRole ')
      toast.success(data.msg || "Logout successful", {
        position: "top-right",
        autoClose: 6000,
        style: {
          borderRadius: "10px",
          background: "#101f3c",
          color: "#fff",
        },
      });
      navigate('/login')
    } else {
      const errorData = await response.json();
      console.log(errorData.msg);
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
};


  useEffect(() => {
    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(logout,60 * 60 * 1000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, []);
  return (
    <AuthContext.Provider value={{ token, userId, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
