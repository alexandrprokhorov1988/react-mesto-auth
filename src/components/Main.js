import React from 'react';
import avatarBg from '../images/avatar-bg.png';
import Card from "../components/Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Loader from "../components/Loader";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={currentUser.avatar ? currentUser.avatar : avatarBg}
               alt="Аватар." className="profile__avatar"/>
          <div className="profile__bg">
            <button type="button"
                    className="profile__avatar-edit-button"
                    data-button="editAvatar"
                    onClick={props.onEditAvatar}/>
          </div>
        </div>
        <div className="profile__user-info">
          <div className="profile__row">
            <h1 className="profile__user-name"
                id={currentUser._id ? currentUser._id : ''}>{currentUser.name}</h1>
            <button type="button"
                    className="profile__edit-button"
                    data-button="edit"
                    onClick={props.onEditProfile}/>
          </div>
          <p className="profile__user-profession">{currentUser.about}</p>
        </div>
        <button type="button"
                className="profile__add-button"
                data-button="add"
                onClick={props.onAddPlace}/>
      </section>
      <section className="elements">
        {props.isLoading ? <Loader/> : props.cards.map((card) => (
          <Card key={card._id}{...card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}/>))}
      </section>
    </main>
  );
}

export default Main;