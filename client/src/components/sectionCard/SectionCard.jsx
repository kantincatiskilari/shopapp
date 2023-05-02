import "./sectionCard.css";
import { Link } from "react-router-dom";

export default function SectionCard({ item }) {
  const discountRate = Math.floor(
    ((item.oldPrice - item.price) / item.oldPrice) * 100
  );

  return (
    <div className="sectionCard">
      {item.oldPrice && (
        <div className="discountRate section-card">%{discountRate}</div>
      )}
      <img src={item.productImgs[0]} className="sectionCardPic" />
      <Link
        className="link"
        to={"/product/" + item.productDesc.replaceAll(" ", "_")}
      >
        <div className="sectionCardName">{item.productName}</div>
      </Link>
      <div className="sectionCardDesc">{item.productDesc}</div>
      <div className="sectionCardPrice">${item.price}</div>
      <div className="sectionCardColors">
        {item.colors.map((color) =>
          color === "white" ? (
            <div
              className="sectionCardColor"
              style={{ backgroundColor: color, border: "2px solid gray" }}
              key={item.productDesc + color}
            ></div>
          ) : (
            <div
              className="sectionCardColor"
              style={{ backgroundColor: color }}
              key={item.productDesc + color}
            ></div>
          )
        )}
      </div>
    </div>
  );
}
