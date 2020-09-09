import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({link, name, alt, _id, likes, owner, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick({src: link, title: name, alt: alt});
  }

  function handleLikeClick() {
    onCardLike({likes: likes, _id: _id});
  }

  function handleDeleteClick() {
    onCardDelete({_id: _id});
  }

  return (
    <article className="card">
      <img className="card__img"
           src={link}
           alt={alt || 'Картинка'}
           id={_id}
           onClick={handleClick}/>
      <button type="button"
              className={`card__delete ${isOwn ? 'card__delete_active' : ''}`}
              onClick={handleDeleteClick}/>
      <div className="card__info">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-container">
          <button type="button"
                  className={`card__like ${isLiked ? 'card__like_active' : ''}`}
                  onClick={handleLikeClick}/>
          <p className="card__like-counter">{likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;