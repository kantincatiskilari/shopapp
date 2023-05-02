import './cart.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { updateFailure, updateStart, updateSuccess } from '../../redux/userSlice';
import axios from 'axios';
import ErrorIcon from '@mui/icons-material/Error';
import { useState } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function Cart() {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const [isComplete,setIsComplete] = useState(false); 
    let totalProducts = 0;
    user?.cart?.map((product) => totalProducts += product.price)

    const handleDelete = async (productId) => {
        dispatch(updateStart())
        try{
            const res = await axios.put("/users/remove/"+productId)
            dispatch(updateSuccess(res.data))
        }catch(err){
            dispatch(updateFailure())
            console.log(err)
        }
    };

    const handlePayment = async () => {
        if(user.cart.length){
            dispatch(updateStart())
            try{
                const res = await axios.put("/users/remove")
                dispatch(updateSuccess(res.data));
                setIsComplete(true)
            }catch(err){
                dispatch(updateFailure())
                console.log(err)
            }
        }
    };


    setTimeout(() => {
        if(isComplete){
            setIsComplete(false)
        }
    },2000);

  return (
      <div className="cart">
          <div className={user.cart.length > 0 ? "cartItems" : "cartItems disabled"}>
            {
            user.cart.length > 0 ?
            user?.cart.map((product) => (
              <div className="cartItem" key={product._id}>
                <img src={product.productImg} alt="" className="cartItemPic" />
                  <div className="cartItemDesc">
                      <div className="cartItemDescTitle">{product.productName}</div>
                      <div className="cartItemDescSubtitle">{product.productDesc}</div>
                      <div className="cartItemDescSize">Size: {product.size} , Color: {product?.color?.toLocaleUpperCase()}</div>
                  </div>
              <div className="cartItemPrice">
                  <div className="cartItemPriceInfo">${product.price.toFixed(2)}</div>
                  <div className="cartItemRemove" onClick={() =>handleDelete(product._id)}>
                      <DeleteOutlineOutlinedIcon/>
                  </div>
              </div>
            </div>
            ))
            :
            <div className='noItem'>
            <ErrorIcon />
            <div className='noItemAlert'>You don't have any items in your collection</div>
            </div>
            }
          </div>
          <div className="cartHighlight">
            {isComplete       
            ?
            <div className='paymentCompleted'>
                <div className="paymentCompletedMessage">Payment completed.</div>
                <div className="paymentCompletedIcon">
                    <TaskAltIcon />
                </div>
            </div>
            :
            <>
            <div className="cartHighlightTitle">Cart Highlight</div>
            <div className="cartHighlightPrice">
                <div className="productPrice">
                    <div>Products</div>
                    <div>${totalProducts.toFixed(2)}</div>
                </div>
                <div className="shipmentPrice">
                    <div>Shipment</div>
                    <div>${user.cart.length > 0 ? 20.00 : 0}</div>
                </div>
                <div className="totalPrice">
                    <div>Total:</div>
                    <div>${user.cart.length > 0 ?(totalProducts + 20.00).toFixed(2) : 0}</div>
                </div>
            </div>
          <div className="cartApproveButton">
            <button onClick={handlePayment}>APPROVE</button>
          </div>
          </>
            }
        </div>
      </div>
  )
}
