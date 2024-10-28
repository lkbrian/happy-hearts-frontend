import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import axiosInstance from "./axiosInstance"; // Adjust the path as necessary

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [userId, setUserId] = useState(
    sessionStorage.getItem("userId") || null
  );
  const [userRole, setUserRole] = useState(
    sessionStorage.getItem("userRole") || null
  );
  const navigate = useNavigate();

  const setAuthData = (token, userId, userRole) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("userRole", userRole);
    setToken(token);
    setUserId(userId);
    setUserRole(userRole);
    setIsAuthenticated(true); // Update isAuthenticated after setting token
  };

  const login = async (email, password, account_type) => {
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
        account_type,
      });

      if (response.status === 200) {
        const data = response.data;
        toast.success(data.msg || "Login successful", {
          position: "top-right",
          autoClose: 6000,
          style: {
            borderRadius: "10px",
            background: "#101f3c",
            color: "#fff",
          },
        });
        setAuthData(data.token, data.id, data.role);
        sessionStorage.setItem("userEmail", data.email);

        // Navigate based on user role
        if (data.role === "parent") {
          navigate(`/${data.role}s/portal/dashboard`);
        } else if (data.role === "provider" || data.role === "nurse") {
          navigate(`/providers/portal/dashboard`);
        } else {
          navigate(`/users/portal/dashboard`);
        }
      }
    } catch (error) {
      // Display a toast notification based on the error type
      if (error.response) {
        // Server responded with a status code out of the 2xx range
        const errorMessage = error.response.data.msg || "An error occurred";
        toast.error(`Error ${error.response.status}: ${errorMessage}`, {
          position: "top-right",
          autoClose: 6000,
          style: {
            borderRadius: "10px",
            background: "#101f3c",
            color: "#fff",
          },
        });
      } else if (error.request) {
        // Request was made, but no response received
        toast.error("Network error. Please check your connection.", {
          position: "top-right",
          autoClose: 6000,
          style: {
            borderRadius: "10px",
            background: "#101f3c",
            color: "#fff",
          },
        });
      } else {
        // Something else caused the error
        toast.error(`Unexpected error: ${error.message}`, {
          position: "top-right",
          autoClose: 6000,
          style: {
            borderRadius: "10px",
            background: "#101f3c",
            color: "#fff",
          },
        });
      }
    }
  };

  const logout = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      // Token doesn't exist, clear session and navigate
      setToken(null);
      setUserId(null);
      setUserRole(null);
      sessionStorage.clear(); // Clear all session storage
      toast.info("You are already logged out", {
        position: "top-right",
        autoClose: 6000,
        style: {
          borderRadius: "10px",
          background: "#101f3c",
          color: "#fff",
        },
      });
      navigate("/login");
      return;
    }

    try {
      const response = await axiosInstance.delete("/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;

        // Clear session and state
        setToken(null);
        setUserId(null);
        setUserRole(null);
        setIsAuthenticated(false);
        sessionStorage.clear(); // Clear session storage completely

        // Show success message and navigate to login page
        toast.success(data.msg || "Logout successful", {
          position: "top-right",
          autoClose: 6000,
          style: {
            borderRadius: "10px",
            background: "#101f3c",
            color: "#fff",
          },
        });
        navigate("/login");
      } else {
        const errorData = response.data;

        // Show error message and navigate to login page
        toast.error(errorData.msg || "Logout failed. Redirecting to login...", {
          position: "top-right",
          autoClose: 6000,
          style: {
            borderRadius: "10px",
            background: "#101f3c",
            color: "#fff",
          },
        });
        sessionStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Network error. Logging you out.", {
        position: "top-right",
        autoClose: 6000,
        style: {
          borderRadius: "10px",
          background: "#101f3c",
          color: "#fff",
        },
      });
      sessionStorage.clear();
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, userId, userRole, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
