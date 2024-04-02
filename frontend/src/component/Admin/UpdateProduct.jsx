import React, { useEffect, useState, Fragment } from "react";
import "./newProduct.css";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  clearErrors,
  getProductDetails,
} from "../../actions/ProductActions";
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { UPDATE_PRODUCT_RESET } from "../../constants/ProductConstants";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    error: updateError,
    loading,
    isUpdated,
  } = useSelector((state) => state.product);
  const { error, product } = useSelector((state) => state.productDetails);
  const { productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [Stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [images, setImages] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!product || product?._id !== productId) {
        dispatch(getProductDetails(productId));
      } else {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setStock(product?.Stock);
        if (
          product.images &&
          Array.isArray(product.images) &&
          product.images.length > 0
        ) {
          setOldImages([...product.images]); // Set oldImages as a copy of product.images array
        } else {
          setOldImages([]); // Set oldImages as an empty array
        }
      }
    };

    fetchData();

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, navigate, productId, isUpdated, error, updateError, product ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Update Product" />

      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={updateProductImagesChange}
              />
            </div>
            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
