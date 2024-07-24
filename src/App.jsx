import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./Home";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;