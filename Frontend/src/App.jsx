import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/custom/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto px-3 pt-14 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
