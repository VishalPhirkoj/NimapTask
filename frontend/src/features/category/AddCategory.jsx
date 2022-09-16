import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddCategory = () => {
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  const handleClear = () => {
    setCategory("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://localhost:4000/addCategory", {
        categoryName: category,
      });
      console.log(resp);
      if (resp.data.status === true) {
        toast(resp.data.message);
        setCategory("");
      }
      if (resp.data.status == "exist") {
        toast(resp.data.message);
        // setCategory("");
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
      <div className="display-4 text-center">Add Category</div>
      <div className="container">
        <div className="row">
          <div className="col-6 m-auto shadow rounded">
            <form action="POST" className="form p-4">
              <div class="mb-3">
                <label htmlFor="CategoryName" className="form-label">
                  Category Name
                </label>
                <input
                  type="text"
                  name="CategoryName"
                  id="CategoryName"
                  className="form-control"
                  onChange={handleChange}
                  value={category}
                />
              </div>

              <button
                type="submit"
                className="btn btn-dark mx-2"
                onClick={handleSubmit}
              >
                Add
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

export default AddCategory;
