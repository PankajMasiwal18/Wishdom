import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/productSlice";
import styleComp from "./ProductDetail.module.scss";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [productDetail, setProductDetail] = useState({});
  const fetchProductDetail = async () => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${id}`
      ).then((response) => response.json());

      setProductDetail(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  return (
    <div>
      <Header />
      <div className={styleComp.container}>
        <img src={productDetail?.image} alt="" width={200} height={200} />
        <div>
          <p className={styleComp.title}>{productDetail?.title}</p>
          <p className={styleComp.discription}>{productDetail?.description}</p>
          <p style={{ textAlign: "left" }}>
            <span style={{ fontWeight: "600" }}>Price:- </span>₹{" "}
            {productDetail?.price}
          </p>
          <p style={{ textAlign: "left" }}>
            {" "}
            <span style={{ fontWeight: "600" }}>Count :- </span>{" "}
            {productDetail?.rating?.count}
          </p>
          <p style={{ textAlign: "left" }}>
            {" "}
            <span style={{ fontWeight: "600" }}>Rating:- </span>
            {productDetail?.rating?.rate}
          </p>
        </div>
        <button
          onClick={() => {
            dispatch(addToCart(productDetail));
          }}
          className={styleComp.btn}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
