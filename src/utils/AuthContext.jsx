import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
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
  };

  const logout_url = "/api/logout";
  const login_url = "/api/login";

  const login = async (email, password, account_type) => {
    console.log(email, account_type, password);
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
        if (data.role == "parent") {
          navigate(`/${data.role}_portal/dashboard`);
        } else if (data.role === "provider" || data.role === "nurse") {
          navigate(`/provider_portal/dashboard`);
        } else {
          navigate(`/user_portal/dashboard`);
        }

        setAuthData(data.token, data.id, data.role);
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg, "at else" || "An error occurred", {
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
    const token = sessionStorage.getItem("token");

    if (!token) {
      // Token doesn't exist, proceed to clear session and navigate
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
      // Indicate the start of a logout process (e.g., loading spinner or message)
      const response = await fetch(logout_url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Clear session and state
        setToken(null);
        setUserId(null);
        setUserRole(null);
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
        const errorData = await response.json();

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
        localStorage.removeItem("selectedItem");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);

      // Handle network or server error and navigate to login page
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
      localStorage.removeItem("selectedItem");
    }
  };

  return (
    <AuthContext.Provider value={{ token, userId, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
