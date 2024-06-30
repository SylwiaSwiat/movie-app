import { imgLink } from "../App";
import "./Item.css";
import TransitionsModal from "./Modal";
const Items = ({
  id,
  title,
  image,
  date,
  type,
  rate,
  overview,
  page,
  genreUrl,
}) => {
  return (
    <TransitionsModal
      type={type}
      id={id}
      image={image}
      imgLink={imgLink}
      page={page}
      genreUrl={genreUrl}
      title={title}
      rate={rate}
      date={date}
      overview={overview}
    >
      <img
        src={image ? `${imgLink}/${image}` : `./images/no picture.png`}
        alt={title}
      />
      <div className="itemInfo">
        <h2>{title}</h2>
        <div className="rateAndYear">
          <p id="rate">{rate ? rate.toFixed(1) : 0}</p>
          <p id="type">{type}</p>
          <p>{date && date.split("").slice(0, 4)}</p>
        </div>
      </div>
    </TransitionsModal>
  );
};

export default Items;
