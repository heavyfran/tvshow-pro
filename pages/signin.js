import { useState } from 'react';
import axios from 'axios';
import cookies from 'nookies';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CustomInput from '../components/customInput';
import validateEmail from '../utils/validators/validateEmail';
import validateRequired from '../utils/validators/validateRequired';

const Signin = () => {
  const [signinInfo, setSigninInfo] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = signinInfo;
    if (!email || !password) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://iwallet-api.herokuapp.com/api/auth/signin',
        { ...signinInfo }
      );

      setLoading(false);

      cookies.set(null, 'token', response.data.token, { path: '/' });
      const { planedRoute } = cookies.get();

      const parsedPlanedRoute = planedRoute && JSON.parse(planedRoute);

      const planedHrefRoute = parsedPlanedRoute
        ? parsedPlanedRoute.href
        : '/[country]';
      const planedAsRoute = parsedPlanedRoute
        ? parsedPlanedRoute.asPath
        : '/us';

      router.replace(planedHrefRoute, planedAsRoute);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    setSigninInfo({ ...signinInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className='signin'>
      <form onSubmit={handleSubmit}>
        <CustomInput
          onChange={handleInputChange}
          value={signinInfo.email}
          type='email'
          name='email'
          placeholder='Enter your email'
          onBlur={validateEmail}
        />
        <CustomInput
          onChange={handleInputChange}
          value={signinInfo.password}
          type='password'
          name='password'
          placeholder='Enter your password'
          onBlur={validateRequired}
        />
        {error && <div className='error'>{error}</div>}
        <button disabled={loading} type='submit'>
          {!loading ? 'Submit' : 'Signing In...'}
        </button>
        <Link href='/signup'>
          <a>Create an account</a>
        </Link>
      </form>
    </div>
  );
};

export default Signin;
