import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cookies from 'nookies';
import Link from 'next/link';
import { isAuthenticated } from '../../utils/withAuthorization';

const countries = [
  { label: 'us', name: 'United States' },
  { label: 'br', name: 'Brazil' },
  { label: 'kr', name: 'Korea' },
  { label: 'jp', name: 'Japan' },
  { label: 'gb', name: 'Great Britain' },
  { label: 'fr', name: 'France' },
];

const Header = () => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(router.query.country);

  const handleChange = (e) => {
    setSelectedCountry(e.target.value);
    router.push(`/[country]`, `/${e.target.value}`);
  };

  const renderCountries = () => {
    return countries.map((country) => (
      <option key={country.label} value={country.label}>
        {country.name}
      </option>
    ));
  };

  const handleSignout = () => {
    cookies.destroy(null, 'token');
  };

  useEffect(() => {
    if (selectedCountry) {
      cookies.set(null, 'defaultCountry', selectedCountry, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    }
  }, [selectedCountry]);

  return (
    <div className='header'>
      <select value={selectedCountry} onChange={handleChange}>
        {renderCountries()}
      </select>

      {isAuthenticated() && (
        <Link href='/[country]' as={`/${selectedCountry}`}>
          <a onClick={handleSignout}>Sign Out</a>
        </Link>
      )}

      <style jsx>{`
        .header {
          padding: 20px;
          background-color: #333;
          color: #fff;
          text-align: center;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
        }

        .header > :global(a) {
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default Header;
