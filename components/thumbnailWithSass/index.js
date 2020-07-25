import styles from './index.module.scss';

const Thumbnail = ({ imageUrl, caption }) => {
  return (
    <div className='thumbnail'>
      <img className={styles.thumbnail__image} src={imageUrl} alt={caption} />
      <h4 className={styles.thumbnail__caption}>{caption}</h4>
    </div>
  );
};

export default Thumbnail;
