import axios from 'axios';
import Error from 'next/error';
import parse from 'html-react-parser';
// import CustomError from '../_error';

import Cast from '../../components/cast';

const ShowDetails = ({ show = {}, statusCode }) => {
  const { name, image, summary, _embedded } = show;

  if (statusCode) {
    return (
      <Error
        statusCode={statusCode}
        // title='Oops! There was a problem here...'
      />
    );
  }

  return (
    <div className='show-details'>
      <div
        className='show-details__poster'
        style={{ backgroundImage: `url(${image.original})` }}
      ></div>
      <h1>{name}</h1>
      {parse(summary)}

      {_embedded.cast.length > 0 && <Cast cast={_embedded.cast} />}

      <style jsx>{`
        .show-details__poster {
          height: 200px;
          background-size: cover;
        }
      `}</style>
    </div>
  );
};

ShowDetails.getInitialProps = async (context) => {
  try {
    const { query } = context; // {country: 'us', showId: '8527'}
    const { showId } = query;

    const response = await axios.get(
      `https://api.tvmaze.com/shows/${showId}?embed=cast`
    );

    return {
      show: response.data,
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
    };
  }
};

export default ShowDetails;
