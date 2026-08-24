import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import City from "./pages/City.jsx";
import { BackgroundVideoProvider } from "./components/BackgroundVideoContext.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <BackgroundVideoProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:cityName" element={<City />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BackgroundVideoProvider>
    </BrowserRouter>
  );
}

