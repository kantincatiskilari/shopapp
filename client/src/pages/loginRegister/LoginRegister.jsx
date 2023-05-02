import './loginRegister.css';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas/login';
import { registerSchema } from '../../schemas/register';

export default function LoginRegister() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            handleLogin();
        },
    });

    const registerFormik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            registerEmail: '',
            registerPassword: '',
            confirmPassword: ''
        },
        validationSchema: registerSchema,
        onSubmit: values => {
            handleRegister();
        },
    });

    const handleLogin = async (e) => {
        dispatch(loginStart());
        try{
            const res = await axios.post("/auth/signin",loginFormik.values);
            dispatch(loginSuccess(res.data));
            navigate("/redirection");
        }catch(err){
            console.log(err)
            dispatch(loginFailure())
        }
    };

    const handleRegister = async (e) => {
        dispatch(loginStart());
        try{
          const res = await axios.post("/auth/signup",{
            firstName:registerFormik.values.firstName,
            lastName:registerFormik.values.lastName,
            password:registerFormik.values.registerPassword,
            email:registerFormik.values.registerEmail,
          });
          dispatch(loginSuccess(res.data));
          navigate("/redirection");
        }catch(err){
            console.log(err)
            dispatch(loginFailure())
        }
    };
  return (
    <div className="loginRegister">
        <div className="loginSection">
            <h1 className="loginSectionTitle">LOGIN</h1>
            <form className="loginSectionForm" onSubmit={loginFormik.handleSubmit}>
                <label>
                    <div className="labelTitle">EMAIL</div>
                    <input 
                    type="email" 
                    id='email'
                    onChange={loginFormik.handleChange}
                    value={loginFormik.values.email}
                    placeholder="Enter your email address"
                    className={loginFormik.errors.email && 'errorInput'}
                    />
                    <div className='formError'>{loginFormik.errors.email}</div>
                </label>
                <label>
                    <div className="labelTitle">PASSWORD</div>
                    <input 
                    type="password" 
                    id='password'
                    onChange={loginFormik.handleChange}
                    value={loginFormik.values.password}
                    placeholder="Enter your password"
                    className={loginFormik.errors.password && 'errorInput'}
                    />
                    <div className='formError'>{loginFormik.errors.password}</div>
                </label>
                <button type='submit'>LOGIN</button>
            </form>
        </div>
        <div className="registerSection">
            <h1 className="registerSectionTitle">REGISTER</h1>
            <form onSubmit={registerFormik.handleSubmit} className="registerSectionForm">
                <label>
                    <div className="labelTitle">FIRST NAME</div>
                    <input 
                    type="text" 
                    id='firstName'
                    onChange={registerFormik.handleChange}
                    value={registerFormik.values.firstName}
                    placeholder="Enter your name"
                    className={registerFormik.errors.firstName && 'errorInput'}
                    />
                    <div className='formError'>{registerFormik.errors.firstName}</div>
                </label>
                <label>
                    <div className="labelTitle">LAST NAME</div>
                    <input 
                    type="text" 
                    id='lastName'
                    onChange={registerFormik.handleChange}
                    value={registerFormik.values.lastName}
                    placeholder="Enter your last name"
                    className={registerFormik.errors.lastName && 'errorInput'}
                    />
                    <div className='formError'>{registerFormik.errors.lastName}</div>
                </label>
                <label>
                    <div className="labelTitle">EMAIL</div>
                    <input 
                    type="email" 
                    id='registerEmail'
                    onChange={registerFormik.handleChange}
                    value={registerFormik.values.registerEmail}
                    placeholder="Enter your email"
                    className={registerFormik.errors.registerEmai && 'errorInput'}
                    />
                    <div className='formError'>{registerFormik.errors.registerEmail}</div>
                </label>
                <label>
                    <div className="labelTitle">PASSWORD</div>
                    <input 
                    type="password" 
                    id='registerPassword'
                    onChange={registerFormik.handleChange}
                    value={registerFormik.values.registerPassword}
                    placeholder="Enter your password"
                    className={registerFormik.values.registerPassword && 'errorInput'}
                    />
                    <div className='formError'>{registerFormik.errors.registerPassword}</div>
                </label>
                <label>
                    <div className="labelTitle">CONFIRM PASSWORD</div>
                    <input 
                    type="password" 
                    id='confirmPassword'
                    onChange={registerFormik.handleChange}
                    value={registerFormik.values.confirmPassword}
                    placeholder="Confirm your password"
                    className={registerFormik.values.confirmPassword && 'errorInput'}
                    />
                    <div className='formError'>{registerFormik.errors.confirmPassword}</div>
                </label>
                <button type='submit'>REGISTER</button>
            </form>
        </div>
    </div>
  )
}
