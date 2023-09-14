import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import { Toaster } from "react-hot-toast";
// import Footer from "./components/Footer";
// using react-router-dom
// "/editor/:roomId" => here roomId is dynamic for room id denoted by ':'

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
          <Route path="*" element={<h2>Not found!</h2>} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
