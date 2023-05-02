import SectionCard from "../../components/sectionCard/SectionCard";
import "./section.css";
import { useEffect, useState, CSSProperties } from "react";
import { Link, useHref } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Section() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [range, setRange] = useState(300);
  const location = useHref().split("/")[1];
  const locationProduct = useHref().split("/")[2];
  const productName = locationProduct?.replaceAll("%20", " ");

  useEffect(() => {
    const fetchData = async () => {
      if (location === "men") {
        const res = await axios.get("/products/find/male");
        const result =
          range > 0 ? res.data.filter((item) => item.price < range) : res.data;
        const items = res.data.filter(
          (item) => item.productName === productName
        );
        setData(
          productName ? items.filter((item) => item.price < range) : result
        );
      }
      if (location === "women") {
        const res = await axios.get("/products/find/female");
        const result =
          range > 0 ? res.data.filter((item) => item.price < range) : res.data;
        const items = res.data.filter(
          (item) => item.productName === productName
        );
        setData(
          productName ? items.filter((item) => item.price < range) : result
        );
      }
      if (location === "kids") {
        const res = await axios.get("/products/find/unisex");
        const result =
          range > 0 ? res.data.filter((item) => item.price < range) : res.data;
        const items = res.data.filter(
          (item) => item.productName === productName
        );
        setData(
          productName ? items.filter((item) => item.price < range) : result
        );
      }
      if (location === "sale") {
        const res = await axios.get("/products/discount");
        const result =
          range > 0 ? res.data.filter((item) => item.price < range) : res.data;
        const items = res.data.filter(
          (item) => item.productName === productName
        );
        setData(
          productName ? items.filter((item) => item.price < range) : result
        );
      }
    };
    fetchData();
  }, [location, productName, filtered]);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  const names = data.map((item) => item.productName);
  const productNames = Array.from(new Set(names));

  return (
    <section className="sectionContainer">
      <div className="sidebar">
        <div className="sidebarSection">
          {location === "sale" ? (
            <Link className="link" to={"/" + location}>
              <h3 className="sidebarTitle">Shoes on Sale</h3>
            </Link>
          ) : (
            <Link className="link" to={"/" + location}>
              <h3 className="sidebarTitle">{location} Shoes</h3>
            </Link>
          )}
          {productNames.map((item) => (
            <Link className="link" to={item} key={item}>
              <div className="sidebarItem">{item}</div>
            </Link>
          ))}
          <span></span>
        </div>
        <div className="sidebarSection">
          <h3 className="sidebarTitle">Filter</h3>
          <div className="sidebarItem">
            <input
              type="range"
              className="sidebarItemInput"
              min="0"
              max="300"
              onChange={(e) => setRange(e.target.value)}
            />
            <div className="sidebarItemTitle">Max Price: ${range}</div>
          </div>
          <button
            className="sidebarItemButton"
            onClick={() => setFiltered(!filtered)}
          >
            FILTER
          </button>
          <span></span>
        </div>
      </div>
      <div className="mainSection">
        <div className="mainSectionTitle">
          <img
            src="https://images.pexels.com/photos/235922/pexels-photo-235922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="mainSectionTitlePic"
          />
          <img
            src="https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="mainSectionTitlePic"
          />
          <img
            src="https://images.pexels.com/photos/601177/pexels-photo-601177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="mainSectionTitlePic"
          />
          <div className="mainSectionTitleDesc">Want to run? Just do it!</div>
        </div>
        <div className="mainSectionCards">
          {loading ? (
            <ClipLoader
              color="orange"
              loading={loading}
              cssOverride={override}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : data.length > 0 ? (
            data.map((item) => (
              <div className="mainSectionCard" key={item._id}>
                <SectionCard item={item} />
              </div>
            ))
          ) : (
            <div className="notFoundAlert">
              No product found for the searched criteria...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
