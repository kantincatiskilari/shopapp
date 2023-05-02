import './main.css';
import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <main className="main">
        <div className="mainImages">
            <div className="mainImage"> 
                <img src='https://images.pexels.com/photos/235922/pexels-photo-235922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="" />
            </div>
            <div className="mainImage">
                <img src="https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </div>
        </div>
        <div className="mainDesc">
            <h3>Up to 50% discount</h3>
            <h6>so that you can run freely anywhere...</h6>
        </div>
        <div className="mainDescBtns">
            <Link to="/men" className='link'>
                <button className="mainDescBtn">SHOP MEN</button>
            </Link>
            <Link to="/women" className='link'>
                <button className="mainDescBtn">SHOP WOMEN</button>
            </Link>
        </div>
    </main>
  )
}
