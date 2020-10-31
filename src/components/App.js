import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './NotFound';
import api from '../utils/api';
import * as auth from '../utils/auth.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {
  const [load, setLoad] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: null
  });
  const [cards, setCards] = React.useState([]);
  const [cardId, setCardId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingLoader, setIsLoadingLoader] = React.useState(false);
  const [isImgPopupOpen, setImgPopupOpen] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      setIsLoadingLoader(true);
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, card]) => {
          setCurrentUser(user);
          if (card) {
            setCards(card.reverse());
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoadingLoader(false))
    }
  }, [loggedIn]);

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
    setIsInfoTooltipPopupOpen(false);
    document.removeEventListener('keydown', handleEscClose);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImgPopupOpen(true);
    document.addEventListener('keydown', handleEscClose);
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api.setUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar({ avatar }) {
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

  function handleAddPlace({ name, link }) {
    setIsLoading(true);
    api.setNewCard(name, link)
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
    const isLiked = card.likes.some(i => i === currentUser._id);
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

  function handleRegisterConfirm(state) {
    setIsSuccess(state);
    setIsInfoTooltipPopupOpen(true);
    document.addEventListener('keydown', handleEscClose);
  }

  function handleRegister({ email, password }) {
    setIsLoading(true);
    return auth.register(email, password)
      .then(() => {
        handleRegisterConfirm(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        handleRegisterConfirm(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    return auth.authorize(email, password)
      .then(() => {
        tokenCheck();
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleSignOut() {
    return auth.signOut()
      .then(() => {
        setLoad(false);
        setLoggedIn(false);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function tokenCheck() {
    setLoad(true);
    auth.getContent()
      .then((res) => {
        if (res) {
          setUserData({
            id: res._id,
            email: res.email
          });
          setLoggedIn(true);
          // history.push('/');
        }
      })
      .catch(err => {
        setLoad(false);
        console.log(err);
        history.push('/sign-in');
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          userData={userData}
          onSignOut={handleSignOut}
          load={load}
        />
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
            onCardDelete={handleConfirm}
            isLoading={isLoadingLoader}
          />
          {load ? '' :
            <>
              <Route path="/sign-up">
                <Register
                  name="register"
                  onRegister={handleRegister}
                  isLoading={isLoading}
                />
              </Route>
              <Route path="/sign-in">
                <Login
                  name="login"
                  onLogin={handleLogin}
                  isLoading={isLoading}
                />
              </Route>
            </>
          }
          <Route path="*">
            <NotFound/>
          </Route>
          {/*<Route >*/}
            {/*{loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}*/}
          {/*</Route>*/}
        </Switch>
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
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
        <ImagePopup
          isOpen={isImgPopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
