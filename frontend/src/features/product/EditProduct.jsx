import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProduct = (props) => {
  const [categories, setCategories] = useState([]);
  // const [product, setProduct] = useState([]);
  const [categoryId, setCategoryId] = useState(1);
  const { id } = useParams("");
  const [productName, setProductName] = useState("");

  useEffect(() => {
    try {
      const fetchCategories = async () => {
        try {
          const getCategories = await axios.get(
            "http://localhost:4000/getCategories"
          );
          // console.log(getCategories.data.result);
          setCategories(getCategories.data.result);
        } catch (err) {
          console.log(err);
        }
      };
      const fetchProduct = async () => {
        try {
          const getProduct = await axios.get(
            `http://localhost:4000/getProduct/${id}`
          );
          // console.log(getProduct.data.result);
          // setProduct(getProduct.data.result);
          // console.log(getProduct.data.result);
          setCategoryId(getProduct.data.result.CategoryId);
          setProductName(getProduct.data.result.ProductName);
        } catch (err) {
          console.log(err);
        }
      };
      fetchCategories();
      fetchProduct();
    } catch (error) {
      throw error;
    }
  }, []);

  console.log(productName);
  const handleChange = (e) => {
    setProductName(e.target.value);
  };
  const handleClear = () => {
    setProductName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.put("http://localhost:4000/updateProduct", {
        productName: productName,
        categoryId: categoryId,
        productId: id,
      });
      console.log(resp);
      if (resp.data.status === true) {
        toast(resp.data.message);
        setProductName("");
      }
      if (resp.data.status === "exist") {
        toast(resp.data.message);
        // setProductName("");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="display-4 text-center">Edit Product</div>
      <div className="container">
        <div className="row">
          <div className="col-6 m-auto shadow rounded">
            <form action="POST" className="form p-4">
              <div className="mb-3">
                <label htmlFor="CategoryName" className="form-label">
                  CategoryName
                </label>

                <select
                  className="form-select"
                  value={categoryId}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    setCategoryId(selectedId);
                  }}
                >
                  {categories.map((item) => (
                    <option key={item.CategoryId} value={item.CategoryId}>
                      {item.CategoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="ProductName" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  name="ProductName"
                  id="ProductName"
                  className="form-control"
                  onChange={handleChange}
                  value={productName}
                />
              </div>
              <button
                type="submit"
                className="btn btn-dark mx-2"
                onClick={handleSubmit}
              >
                Update
              </button>
              <button type="reset" className="btn  mx-2" onClick={handleClear}>
                Clear
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
