const Stars = ({ star, onChangeStar }) => {
  return (
    <div>
      <div className="flex">
        {star >= 1 ? (
          <img
            onMouseOver={() => {
              onChangeStar(1);
            }}
            // onMouseLeave={() => {
            //   onChangeStar(0);
            // }}
            className="w-10"
            src="src/assets/img/EmptyStar.png"
          />
        ) : (
          <img
            onMouseOver={() => {
              onChangeStar(1);
            }}
            // onMouseLeave={() => {
            //   onChangeStar(0);
            // }}
            className="w-10"
            src="src/assets/img/Star.png"
          />
        )}
        {star >= 2 ? (
          <img
            onMouseOver={() => {
              onChangeStar(2);
            }}
            // onMouseLeave={() => {
            //   onChangeStar(0);
            // }}
            className="w-10"
            src="src/assets/img/EmptyStar.png"
          />
        ) : (
          <img
            onMouseOver={() => {
              onChangeStar(2);
            }}
            // onMouseLeave={() => {
            //   onChangeStar(0);
            // }}
            className="w-10"
            src="src/assets/img/Star.png"
          />
        )}
        {star >= 3 ? (
          <img
            onMouseOver={() => {
              onChangeStar(3);
            }}
            // onMouseLeave={() => {
            //   onChangeStar(0);
            // }}
            className="w-10"
            src="src/assets/img/EmptyStar.png"
          />
        ) : (
          <img
            onMouseOver={() => {
              onChangeStar(3);
            }}
            // onMouseLeave={() => {
            //   onChangeStar(0);
            // }}
            className="w-10"
            src="src/assets/img/Star.png"
          />
        )}
        {star >= 4 ? (
          <img
            onMouseOver={() => {
              onChangeStar(4);
            }}
            // onMouseLeave={() => {
            //   onChangeStar(0);
            // }}
            className="w-10"
            src="src/assets/img/EmptyStar.png"
          />
        ) : (
          <img
            onMouseOver={() => {
              onChangeStar(4);
            }}
            // onMouseLeave={() => {
            //   onChangeStar(0);
            // }}
            className="w-10"
            src="src/assets/img/Star.png"
          />
        )}
        {star >= 5 ? (
          <img
            onMouseOver={() => {
              onChangeStar(5);
            }}
            // onMouseLeave={() => {
            //   onChangeStar(0);
            // }}
            className="w-10"
            src="src/assets/img/EmptyStar.png"
          />
        ) : (
          <img
            onMouseOver={() => {
              onChangeStar(5);
            }}
            // onMouseLeave={() => {
            //   onChangeStar(0);
            // }}
            className="w-10"
            src="src/assets/img/Star.png"
          />
        )}
      </div>
    </div>
  );
};

export default Stars;
