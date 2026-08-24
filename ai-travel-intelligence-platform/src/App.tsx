import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import City from "./pages/City.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:cityName" element={<City />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
