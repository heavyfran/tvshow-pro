import Thumbnail from '../thumbnail';

const Cast = ({ cast }) => {
  const renderCast = () => {
    return cast.map((castItem, index) => {
      const {
        person: { image, name },
      } = castItem;

      return (
        <li key={index}>
          <Thumbnail
            imageUrl={(image && image.medium) || undefined}
            caption={name}
            small
          />
        </li>
      );
    });
  };

  return (
    <div className='cast'>
      <h3>Cast</h3>
      <ul className='cast__list'>{renderCast()}</ul>
      <style jsx>{`
        .cast__list {
          display: flex;
          overflow-x: scroll;
        }

        .cast__list > :global(li) {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Cast;
