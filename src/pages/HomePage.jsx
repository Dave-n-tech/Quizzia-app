import heroImage from "../assets/hero image.png";
import PlayButton from "../components/PlayButton";
import "./pageStyles/homepage.css";

export default function Homepage() {
  return (
    <main className="hero">
      <section className="hero-left">
        <h1 className="heading">HOW MUCH DO YOU KNOW ABOUT THE WORLD?</h1>
        <p className="description">
          From mountain ranges to movie stars, test your knowledge of everything
          under the sun with our engaging trivia challenges.
        </p>
        <PlayButton />
      </section>
      <section className="hero-right">
        <img src={heroImage} alt="" className="hero-image"/>
      </section>
    </main>
  );
}
