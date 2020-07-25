import Link from 'next/link';
import ThumbnailStyles from './styles';

const Thumbnail = ({
  imageUrl = 'https://via.placeholder.com/210x295?text=?',
  caption,
  href = '',
  as = '',
  small = false,
}) => {
  return (
    <div className='thumbnail'>
      <Link href={href} as={as}>
        <a>
          <img className='thumbnail__image' src={imageUrl} alt={caption} />
          <h4 className='thumbnail__caption'>{caption}</h4>
        </a>
      </Link>
      <style jsx>{`
        .thumbnail__image {
          width: ${small ? '100px' : '100%'};
        }

        .thumbnail__caption {
          text-align: center;
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default Thumbnail;
