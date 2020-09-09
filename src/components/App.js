import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Жак-Ив-Кусто',
    about: 'Исследователь океана',
    avatar: null
  });
  const [cards, setCards] = React.useState([]);
  const [cardId, setCardId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingLoader, setIsLoadingLoader] = React.useState(false);
  const [isImgPopupOpen, setImgPopupOpen] = React.useState(false);

  React.useEffect(() => {
    setIsLoadingLoader(true);
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCards(card);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingLoader(false))
  }, []);

  function handleEscClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    document.addEventListener('keydown', handleEscClose);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
    document.addEventListener('keydown', handleEscClose);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
    document.addEventListener('keydown', handleEscClose);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImgPopupOpen(false);
    setConfirmPopupOpen(false);
    document.removeEventListener('keydown', handleEscClose);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImgPopupOpen(true);
    document.addEventListener('keydown', handleEscClose);
  }

  function handleUpdateUser({name, about}) {
    setIsLoading(true);
    api.setUserInfo({name, about})
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar({avatar}) {
    setIsLoading(true);
    api.setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlace({name, link}) {
    setIsLoading(true);
    api.setNewCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.likeCard(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleConfirm(card) {
    setConfirmPopupOpen(true);
    setCardId(card._id);
  }

  function handleCardDelete() {
    setIsLoading(true);
    api.deleteCard(cardId)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== cardId);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          cards={cards}
          onCardDelete={handleConfirm}
          isLoading={isLoadingLoader}
        />
        <Footer/>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />
        <ImagePopup isOpen={isImgPopupOpen} onClose={closeAllPopups} card={selectedCard}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
