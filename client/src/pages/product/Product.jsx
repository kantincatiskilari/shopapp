import "./product.css";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHref } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSuccess } from "../../redux/userSlice";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Product() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [product, setProduct] = useState("");
  const [selected, setSelected] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [success, setSuccess] = useState(false);
  const productName = useHref().split("/")[2];
  const sizes = [41, 42, 43, 44, 45, 46, 47, 48];

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get("/products/product/" + productName);
      setProduct(res.data);
    };
    fetchProduct();
  }, [productName]);

  const handleCart = async () => {
    try {
      const res = await axios.put("/users/add", {
        productName: product.productName,
        productDesc: product.productDesc,
        productImg: product.productImgs[0],
        size: selected,
        color: selectedColor,
        price: product.price,
      });
      dispatch(updateSuccess(res.data));
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  setTimeout(() => {
    if (success) {
      setSuccess(false);
    }
  }, 2000);
  return (
    <div className="product">
      <div className="productPictures">
        {product.productImgs?.map((img) => (
          <div className="productPicture">
            <img src={img} alt="" className="productPicture" />
          </div>
        ))}
      </div>
      <div className="productDetails">
        <div className="productDetailsName">{product.productName} </div>
        <div className="productDetailsDesc">{product.productDesc}</div>
        <div className="productDetailsPrices">
          {product.oldPrice && (
            <div className="productDetailsPriceOld">
              ${product.oldPrice?.toFixed(2)}
            </div>
          )}
          <div className="productDetailsPrice">
            ${product.price?.toFixed(2)}
          </div>
        </div>
        <h6
          className="addToCartAlert"
          style={{ display: selected && selectedColor ? "none" : "block" }}
        >
          *To add this product to your cart, select a size and a color.
        </h6>
        <div className="productDetailsColors">
          {product.colors?.map((color) =>
            selectedColor === color ? (
              <div
                className="productDetailsColor selected"
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                key={color + product.productDesc}
              >
                <FiberManualRecordIcon />
              </div>
            ) : (
              <div
                className="productDetailsColor"
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                key={color + product.productDesc}
              ></div>
            )
          )}
        </div>
        <div className="productSizes">
          <h3 className="productSizesTitle">Size:</h3>
          {sizes.map((size) =>
            product.sizes?.includes(size) ? (
              <div
                className={
                  selected === size ? "productSize selected" : "productSize"
                }
                onClick={() => setSelected(size)}
                key={size}
              >
                {size}
              </div>
            ) : (
              <div className="productSize consumed">{size}</div>
            )
          )}
        </div>
        {user ? (
          success ? (
            <button className="successBtn">
              ITEM ADDED TO YOUR CART <CheckCircleIcon />
            </button>
          ) : (
            <button
              type="button"
              className={
                selected && selectedColor
                  ? "productDetailsCheck"
                  : "productDetailsCheck disabled"
              }
              onClick={user && handleCart}
            >
              <AddShoppingCartIcon />
              Add to Cart
            </button>
          )
        ) : (
          <Link className="link" to="/login">
            <div>Click here to sign in or register!</div>
          </Link>
        )}
      </div>
    </div>
  );
}
