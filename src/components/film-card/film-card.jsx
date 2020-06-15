import React from "react";

const createFilmCards = (props) => {
  const {movieNames} = props;
  const {btnClickHandler} = props;
  const filmCards = movieNames.map((name, index) => {
    return (
      <article key={name + index.toString()} className="small-movie-card catalog__movies-card">
        <div className="small-movie-card__image">
          <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html" onClick={btnClickHandler}>{name}</a>
        </h3>
      </article>
    );
  });
  return filmCards;
};

export default createFilmCards;
