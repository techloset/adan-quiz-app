"use client";
import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import axios from "axios";
import Loader from "@/components/Loader";

interface User {
  username: string;
  email: string;
  admin: boolean;
}
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<
  | [AuthContextType, React.Dispatch<React.SetStateAction<AuthContextType>>]
  | undefined
>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthContextType>({
    user: null,
    token: "",
    isLoading: true, // New loading state
  });

  // Default axios headers
  axios.defaults.headers.common["Authorization"] = auth.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = localStorage.getItem("auth");
        if (data) {
          const parseData = JSON.parse(data) as AuthContextType;
          setAuth({
            ...auth,
            user: parseData.user,
            token: parseData.token,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setAuth((prevAuth) => ({
          ...prevAuth,
          isLoading: false,
        }));
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {auth.isLoading ? (
        <div className="flex justify-center h-screen items-center flex-col">
        <Loader/>
      </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = (): [
  AuthContextType,
  React.Dispatch<React.SetStateAction<AuthContextType>>
] => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
