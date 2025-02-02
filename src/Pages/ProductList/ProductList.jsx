import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styleComp from "./ProductList.module.scss";
import Header from "../Header/Header";
import { addToCart } from "../../redux/productSlice";
import { useDispatch } from "react-redux";

function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    size: 8,
  });

  const fetchProductList = async () => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=${
          pagination.size * pagination.current
        }`
      ).then((response) => response.json());

      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategoryList = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      ).then((response) => response.json());
      setCategoryList(["All", ...response]);
    } catch (error) {
      console.log(error);
    }
  };

  const filterProductList = (key) => {
    setSelectedCategory(key);
  };

  const searchByTitle = (value) => {
    setSearch(value);
  };

  const addToCartHandler = (item, event) => {
    event.stopPropagation();
    dispatch(addToCart(item));
  };

  useEffect(() => {
    fetchProductList();
    fetchCategoryList();
  }, [pagination.current]);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().slice(0, search.length) ==
          search.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, search]);

  return (
    <div>
      <Header />
      <h2>Product List</h2>
      <input
        type="text"
        onChange={(e) => {
          searchByTitle(e.target.value);
        }}
        className={styleComp.searchInput}
      />
      <div className={styleComp.categoryContainer}>
        <div>
          {categoryList.map((item, index) => {
            return (
              <p
                key={index}
                className={
                  selectedCategory === item
                    ? styleComp.activeCategoryItem
                    : styleComp.categoryItem
                }
                onClick={() => filterProductList(item)}
              >
                {item}
              </p>
            );
          })}
        </div>
        <div>
          <div className={styleComp.container}>
            {filteredProducts.map((item, index) => {
              return (
                <div
                  key={index}
                  className={styleComp.card}
                  onClick={() => navigate(`/product-detail/${item.id}`)}
                >
                  <img src={item.image} alt="" width={100} height={100} />
                  <p key={index} className={styleComp.title}>
                    {item.title.slice(0, 20)}{" "}
                    {item?.title?.length > 10 && "..."}
                  </p>
                  <p>{item.category}</p>
                  <p>₹ {item.price}</p>
                  <button
                    onClick={(event) => {
                      addToCartHandler(item, event);
                    }}
                    className={styleComp.btn}
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
          {filteredProducts.length !== 0 && (
            <button
              onClick={() =>
                setPagination({
                  ...pagination,
                  current: pagination.current + 1,
                })
              }
            >
              More
            </button>   
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
