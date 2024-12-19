import { useEffect, useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate,Navigate } from "react-router-dom";
import axios from "./Axios/Axios";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
// import Auth from "./Pages/Auth/Auth";
// import Profile from "./Pages/Profile/Profile";
import LandingPage from "./Components/LandingPage/LandingPage";
import AskQuestion from './Pages/AskQuestion/AskQuestion'
import AnswerPage from "./Pages/AnswerPage/AnswerPage";
import LoginSignup from "./Pages/Auth/LoginSignup";
import Loading from './assets/image/loadingicon.gif'


export const AppState = createContext();
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [user, setUser] = useState(null); // State to store the authenticated user
  const [loading, setLoading] = useState(true); // State for loading status
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        setLoading(false); // If no token, stop loading
        return;
      }
      try {
        const { data } = await axios.get("api/users/check", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        });
        setUser(data); // Set the authenticated user data
      } catch (error) {
        console.error(error.response); // Log any errors
        navigate("/auth"); // Redirect to login if token is invalid
      } finally {
        setLoading(false); // Stop loading
      }
    };

    checkUser();
  }, [navigate]);

  if (loading) {
    return <h1><img src={Loading} alt="" /></h1>; // Render loading screen while user is being verified
  }

  return (
    <AppState.Provider value={{ user, setUser, loading }}>
      {/* Pass user and loading state to Header */}
      <Header user={user} loading={loading} />
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route path="/" element={<LoginSignup />} />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginSignup />} />

          {/* <Route path="/auth/*" element={<Auth />} /> */}
          <Route path="/questionpage" element={<AskQuestion />} />
          <Route path="home/answerpage/:questionid" element={<AnswerPage />} />
          {/* <Route path="/profile/:userid" element={<Profile />} /> */}
        </Route>
      </Routes>
    </AppState.Provider>
  );
}

export default App;
