import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './redirection.css';

export default function Redirection({type}) {
    const {user} = useSelector(state => state.user);
    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/")
    }, 3000);

  return (
    <div className="redirection">
        <div className="redirectMessage">
            <div className="redirectMessageIcon">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/73/Flat_tick_icon.svg"  alt="" />
            </div>
            <div className="redirectMessageDesc">
                {type ? "Welcome" : "Goodbye"} {user?.firstName}. <span></span> 
                We direct you to the Homepage.
            </div>
        </div>
    </div>
  )
}
