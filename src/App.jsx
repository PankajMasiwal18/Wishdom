import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./Pages/Login/Login";
import ProductList from "./Pages/ProductList/ProductList";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
