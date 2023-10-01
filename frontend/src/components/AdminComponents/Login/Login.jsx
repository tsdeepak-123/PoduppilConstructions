import React, { useState } from 'react';
import Buttons from '../../CommonComponents/Button/Buttons';
import { useNavigate } from 'react-router-dom';
import TextFields from '../../CommonComponents/TextFields/TextFields';
import { useCookies } from 'react-cookie';
// import axios from 'axios'
import { axiosAdmin } from '../../../Api/Api';
import fieldValidate from '../../../Validation/Validate'
import { useDispatch } from 'react-redux';
import { AdminAction } from '../../../Stores/AdminAuth';

function Login() {
  const [cookies, setCookies] = useCookies([]);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   fieldValidate(email,password,setEmailError,setPasswordError)

    axiosAdmin
      .post('login', { email, password })
      .then((response) => {
        console.log(response?.data?.adminSignin,'response');
        if (response?.data?.success) {

          const currentDate = new Date();
          const ageInMinutes = 60
          const expirationDate = new Date(currentDate.getTime() + ageInMinutes * 60 * 1000); // Calculate expiration date
          
          setCookies('AdminsecretKey',response?.data?.adminSignin?.token, { path: '/', expires: expirationDate });
          dispatch(AdminAction.AddAdmin({ token: response?.data?.adminSignin?.token}));
          
          navigate('/admin/dashboard');
        }
        console.log(response);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        console.log('error:', error?.response?.data?.message);
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <img
          src="/Images/podu.png"
          alt="Poduppil Logo"
          style={{ width: '400px', height: 'auto' }}
        />
        <form>
          <div className="mb-4">
            <TextFields
              name="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <p className="text-red-500 text-sm flex justify-center mb-2">{emailError}</p>
            )}
            <TextFields
              name="Password"
              type="password" 
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <p className="text-red-500 text-sm flex justify-center mb-2">{passwordError}</p>
            )}
          </div>
          {error && (
            <div className="flex justify-center">
              <p className="text-red-500 text-sm flex justify-center mb-2">{error}</p>
            </div>
          )}
          <div className="flex justify-center mt-11">
            <Buttons name="LOGIN" classes={'h-12 w-[150px]'} click={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

