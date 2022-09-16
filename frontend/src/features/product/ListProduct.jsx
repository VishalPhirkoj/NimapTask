import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  const fetchProducts = async () => {
    try {
      const getProducts = await axios.get("http://localhost:4000/getProducts");
      console.log(getProducts.data.result);
      setProducts(getProducts.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      fetchProducts();
    } catch (error) {
      throw error;
    }
  }, []);

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const deletedId = event.target.id;
      const resp = await axios.post(`http://localhost:4000/deleteProduct`, {
        productId: deletedId,
      });
      console.log(resp);
      if (resp.data.status === true) {
        toast(resp.data.message);
        fetchProducts();
      }
    } catch (error) {
      throw error;
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  console.log(currentProducts);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumber.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <div className="display-5 text-center">Product List</div>
      <div className="container">
        <div className="row">
          <div className="mx-auto col-sm-8">
            <table className="table table-bordered table-striped table-responsive">
              <thead>
                <tr>
                  <th>SrNo</th>
                  <th>Product Name</th>
                  <th>Product Id</th>
                  <th>Category Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((item, index) => (
                  <tr key={index} value={item.CategoryId}>
                    <td>{index + 1}</td>
                    <td>{item.ProductName}</td>
                    <td>{item.ProductId}</td>
                    <td>{item.CategoryName}</td>
                    <td>
                      <Link
                        to={`product/${item.ProductId}`}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={handleDelete}
                        id={item.ProductId}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav>
              <ul className="pagination">
                {pageNumber.map((number) => (
                  <li key={number} className="page-item">
                    <a onClick={() => paginate(number)} className="page-link">
                      {number}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProduct;
