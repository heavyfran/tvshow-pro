import { useState } from 'react';
import axios from 'axios';
import cookies from 'nookies';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CustomInput from '../components/customInput';
import validateEmail from '../utils/validators/validateEmail';
import validateRequired from '../utils/validators/validateRequired';

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://iwallet-api.herokuapp.com/api/auth/signup',
        { ...signupInfo }
      );

      setLoading(false);

      cookies.set(null, 'token', response.data.token, { path: '/' });

      router.replace('/[country]', '/us');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className='signup'>
      <form onSubmit={handleSubmit}>
        <CustomInput
          onChange={handleInputChange}
          value={signupInfo.name}
          type='text'
          name='name'
          placeholder='Enter your name'
          onBlur={validateRequired}
        />
        <CustomInput
          onChange={handleInputChange}
          value={signupInfo.email}
          type='email'
          name='email'
          placeholder='Enter your email'
          onBlur={validateEmail}
        />
        <CustomInput
          onChange={handleInputChange}
          value={signupInfo.password}
          type='password'
          name='password'
          placeholder='Enter your password'
          onBlur={validateRequired}
        />
        {error && <div className='error'>{error}</div>}
        <button disabled={loading} type='submit'>
          {!loading ? 'Submit' : 'Signing Up...'}
        </button>
        <Link href='/signin'>
          <a>Have an account? Login</a>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
