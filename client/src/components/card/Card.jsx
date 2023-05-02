import './card.css';
import { Link } from 'react-router-dom';

export default function Card({sale}) {
    const discountRate = Math.round(((sale.oldPrice - sale.price) / sale.oldPrice)*100);
    
  return (
    
    <div className="card">
        <div className="cardContainer">
            <div className="cardImg">
                <img src={sale.productImgs[0]} alt="" />
                <div className="discountRate">%{discountRate}</div>
                <div className="cardDesc">
                    <Link className="link" to={"/product/"+sale.productDesc.replaceAll(" ","_")}>
                        <div className="cardDescTitle">
                            {sale.productDesc}
                        </div>
                    </Link>
                    <div className="cardDescPrice">
                        now on discount %{discountRate}, ${sale.price}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
