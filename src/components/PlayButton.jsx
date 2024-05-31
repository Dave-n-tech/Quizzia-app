import { Link } from "react-router-dom";

export default function PlayButton() {
  return (
    <Link to={"/user-info"}>
      <button className="play-button">Play now</button>
    </Link>
  );
}
