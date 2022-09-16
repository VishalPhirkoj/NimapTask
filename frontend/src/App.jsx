import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddCategory from "./features/category/AddCategory";
import HeadNav from "./features/headNav/HeadNav";
import AddProduct from "./features/product/AddProduct";
import ListProduct from "./features/product/ListProduct";
import EditProduct from "./features/product/EditProduct";

function App() {
  return (
    <>
      <HeadNav />
      <div className="text-center">
        <div className="display-1">I N D I A 🇮🇳</div>
      </div>
      <Routes>
        <Route exact path="/addCategory" element={<AddCategory />} />
        <Route exact path="/addProduct" element={<AddProduct />} />
        <Route exact path="/" element={<ListProduct />} />
        <Route exact path="/product/:id" element={<EditProduct />} />
        {/*<Route exact path="/product/:id" element={<Product />} /> */}
      </Routes>
    </>
  );
}

export default App;
