import React from "react";
import { useState, useEffect } from "react";
import SwiperComponent from "./components/SwiperComponent.jsx";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import "../assets/styles/header.css";
import "../assets/styles/grid.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Logo2 from "../assets/images/logo2.png";
import user from "../assets/images/user.png";

const Maher = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  //fetching the data from the API and inserting them to different arrays according to the genre
  const categories = ["Arcade", "New", "Music", "Board", "Racing"];
  const [games, setGames] = useState();

  useEffect(() => {
    async function fetchGames() {
      try {
        const url = `https://google-play-store.onrender.com/api/games`;
        const response = await axios.get(url);
        var data = response.data;
        var categorizedGames = {};
        for (let i = 0; i < categories.length; i++) {
          const category = categories[i];
          categorizedGames[category] = [];
        }

        for (let i = 0; i < data.length; i++) {
          const game = data[i];
          if (categorizedGames.hasOwnProperty(game.category)) {
            categorizedGames[game.category].push(game);
          }
        }
        setGames(categorizedGames);
      } catch (errorWhileFetchingNews) {
        console.log("error while fetching games", errorWhileFetchingNews);
      }
    }

    fetchGames();
  }, []);

  console.log(games);

  return (
    <body>
      {/* header of the main page */}
      <header>
        <nav className="navbar container" onClick={() => setShow(!show)}>
          {show && <img className="logo" src={Logo2} alt="play store logo" />}
          <div className="search-box">
            <button className="btn-search" onClick={() => setShow(!show)}>
              <BsSearch />
            </button>
            <input
              type="text"
              className="input-search"
              placeholder="Type to Search..."
            />
          </div>

          <ul className="nav-list">
            <li className="nav-item">
              <a className="nav-link">Games</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Apps</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Movies & TV</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Books</a>
            </li>
            <li>
              <a>
                <img src={user} alt="user" className="user" />
              </a>
            </li>
            <div className="active"></div>
          </ul>
        </nav>
      </header>

      {/* first part of the main page  */}
      <div>
        <div className="gridbuttons">
          <button className="gridbutton" role="button">
            Top Free
          </button>
          <button className="gridbutton" role="button">
            Top Grossing
          </button>
          <button className="gridbutton" role="button">
            Top Paid
          </button>
        </div>
        <div className="grid">
          {games.New.slice(0, 10).map((app) => {
            return (
              <div class="grid-container">
                <a href="">
                  <div class="item">
                    <div className="left">
                      <img src={app.media} alt="app logo" />
                    </div>
                    <div className="right">
                      <h4 className="appname">{app.name}</h4>
                      <small className="appgenre">{app.category}</small>
                      <p className="apprating">{app.rating} &#9733;</p>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* swiper for each category of applications  */}
      <SwiperComponent genre="Recommended for you" elements={games.New} />
      <SwiperComponent genre="Offline Games" elements={games.New} />
      <SwiperComponent genre="Top-rated games" elements={games.New} />
      <SwiperComponent genre="Strategy games" elements={games.New} />
    </body>
  );
};

export default Maher;
