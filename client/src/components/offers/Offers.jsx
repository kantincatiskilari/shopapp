import { useEffect, useState } from "react";
import axios from "axios";
import "./offers.css";
import { Link } from "react-router-dom";


export default function Offers() {
  const [active, setActive] = useState("walking");
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get("/products/random");
        setOffers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOffers();
  }, [active]);

  return (
    <div className="offers">
      <h1 className="title">Our Selections</h1>
      <div className="sections">
        <div
          className={active === "walking" ? "section active" : "section"}
          onClick={() => setActive("walking")}
        >
          for walking
        </div>
        <div
          className={active === "running" ? "section active" : "section"}
          onClick={() => setActive("running")}
        >
          for running
        </div>
        <div
          className={active === "everyday" ? "section active" : "section"}
          onClick={() => setActive("everyday")}
        >
          for everyday
        </div>
      </div>
      <div className="sectionImages">
        {offers.map((offer) => (
          <div className="sectionImage" key={offer._id}>
            <img src={offer.productImgs[0]} alt="" />
            <div className="sectionImageDesc">
              <div className="sectionImageTitle">{offer.productName}</div>
              <div className="sectionImageSubtitle">{offer.productDesc}</div>
              <Link
                className="link"
                to={"/product/" + offer.productDesc.replaceAll(" ", "_")}
              >
                <button className="sectionImageBtn">SHOP NOW</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
