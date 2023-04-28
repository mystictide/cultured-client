import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CharacterBrowser from "./components/main/characterBrowser";
import CharactersByCategory from "./components/main/charactersByCategory";
import ViewCharacter from "./components/main/viewCharacter";
import Home from "./pages/main/home";

function App() {
  return (
    <>
      <Router>
        <div className="page-container">
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:name" element={<CharactersByCategory />} />
            <Route path="/browse/:name" element={<CharacterBrowser />} />
            <Route path="/c/:name" element={<ViewCharacter />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
}

export default App;
