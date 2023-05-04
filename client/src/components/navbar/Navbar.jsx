import './navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/userSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHref } from "react-router-dom";

export default function Navbar() {
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [search,setSearch] = useState("");
    const [products,setProducts] = useState([]);
    const location = useHref().split("/")[1];

    useEffect(() => {
        const fetchProducts = async () => {
            if(search.length > 3){
                try{
                    const res = await axios.get("/products");
                    setProducts(res.data.filter((product) => product.productDesc.toLocaleLowerCase().includes(search.toLocaleLowerCase())));
                }catch(err){
                    console.log(err)
                }
            }
        }
        fetchProducts();
    },[search]);

    const handleLogout = () => {
        try{    
            dispatch(logout());
        }catch(err){
            console.log(err)
        }
    };


  return (
    <div className="navbar" style={{ display: location === 'redirection' && "none"}}>
        <div className="left">
            <Link className='link' to="/">
                <div className="logo">
                    e-Commerce
                </div>
            </Link>
            <Link className='link' to="/men">
                <div className="leftSection">men</div>
            </Link>
            <Link className='link' to="/women">
                <div className="leftSection">women</div>
            </Link>
            <Link className='link' to="/kids">
                <div className="leftSection">kids</div>
            </Link>
            <Link className='link' to="/sale">
                <div className="leftSection">discount</div>
            </Link>    
        </div>
        <div className="center">
            <div className="navbarInput">
                <input type="text" placeholder='Search your product...' onChange={(e) => setSearch(e.target.value)} style={{background:'transparent', color:'white'}}/>
            </div>
            <div className={search.length > 3 ? 'searchResults active' : 'searchResults'}>
                    {products.map((product) => (
                        <Link className='link' to={"/product/"+product.productDesc}>
                            <div className='searchResult' onClick={() => setSearch("")}>
                                <img src={product.productImgs[0]} alt="" className="searchResultImg" />
                                <div className="productResultInfo">
                                    <div className="searchResultName">{product.productName}</div>
                                    <div className="searchResultDesc">{product.productDesc}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
        <div className="right">
            { user 
            ?

            <Link className='link' onClick={handleLogout} to="/redirection">
                <div className="rightSection">
                    <LogoutIcon />
                </div>
            </Link>
            :
            <Link className='link' to="/login">
                <div className="rightSection">
                    <PersonIcon />
                </div>
            </Link>

            }
            {user &&
             <Link className='link' to="/cart">
             <div className="rightSection shopping">
                 <ShoppingCartIcon />
                 <div className='cartItemCount'>{user?.cart?.length}</div>
             </div>
         </Link>
            }
        </div>        
    </div>
  )
}
