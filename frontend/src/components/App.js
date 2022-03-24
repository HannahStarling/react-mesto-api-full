import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import api from '../utils/Api';
import * as auth from '../utils/auth';
import CurrentUserContext from '../context/CurrentUserContext';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ProtectedRoute from './ProtectedRoute';
import Content from './Content';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ErrorMessage from './ErrorMessage';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [deletedId, setDeletedId] = useState('');
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({
    name: 'Загрузка данных...',
    about: 'Загрузка данных...',
    avatar: '',
  });
  const [cards, setCards] = useState([]);
  const [error, setError] = useState({ isServerError: false, errorName: '' });
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const history = useHistory();

  const closeAllPopups = useCallback(() => {
    if (isEditProfilePopupOpen === true) {
      setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }
    if (isEditAvatarPopupOpen === true) {
      setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }
    if (isAddPlacePopupOpen === true) {
      setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }
    if (isConfirmPopupOpen === true) {
      setIsConfirmPopupOpen(!isConfirmPopupOpen);
    }
    if (selectedCard.name && selectedCard.link) {
      setSelectedCard({ name: '', link: '' });
    }
    if (isInfoTooltipOpen === true) {
      setIsInfoTooltipOpen(!isInfoTooltipOpen);
    }
  }, [
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen,
    isConfirmPopupOpen,
    selectedCard,
    isInfoTooltipOpen,
  ]);

  const showError = useCallback(
    ({ name, isServerError, ...err }) => {
      closeAllPopups();
      setError((prevState) => {
        return { ...prevState, errorName: name, isServerError };
      });
      setIsErrorPopupOpen(!isErrorPopupOpen);
    },
    [closeAllPopups, isErrorPopupOpen],
  );

  const closeError = () => {
    setIsErrorPopupOpen(!isErrorPopupOpen);
  };

  const tokenCheck = useCallback(() => {
    auth
      .getContent()
      .then(({ email }) => {
        if (email) {
          setLoggedIn(true);
          setEmail(email);
          history.push('/');
        }
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, [setEmail, setLoggedIn, history]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  function handleRegistration(password, email) {
    auth
      .register(password, email)
      .then(() => {
        setIsRegistrationSuccess(true);
        history.push('/sign-in');
      })
      .catch(() => setIsRegistrationSuccess(false))
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLogin(password, email) {
    if (!email || !password) return;
    auth
      .authorize(password, email)
      .then(({ message }) => {
        if (message) {
          setLoggedIn(true);
          setEmail(email);
          history.push('/');
        }
      })
      .catch(showError);
  }

  function onSignOut() {
    auth.signOut();
    setLoggedIn(false);
  }

  useEffect(() => {
    api
      .getAllInitialData()
      .then((data) => {
        const [cards, info] = data;
        setCurrentUser(info);
        setCards(cards);
      })
      .catch(showError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddCard(newCard) {
    api
      .postCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(showError);
  }

  function handleUpdateAvatar(currentUserAvatar) {
    api
      .setAvatar(currentUserAvatar)
      .then((avatar) => {
        setCurrentUser({ ...currentUser, avatar });
        closeAllPopups();
      })
      .catch(showError);
  }

  function handleUpdateUser(currentUserInfo) {
    api
      .setUserInfo(currentUserInfo)
      .then((info) => {
        setCurrentUser({ ...currentUser, info });
        closeAllPopups();
      })
      .catch(showError);
  }

  function handleCardDelete() {
    api
      .deleteCard(deletedId)
      .then((_) => {
        setCards((cards) => cards.filter((c) => c._id !== deletedId));
        closeAllPopups();
      })
      .catch(showError);
  }

  function handleCardLike({ likes, id }) {
    const isLiked = likes.find(({ _id: UserId }) => UserId === currentUser._id);
    api
      .changeLikeCardStatus(id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
      })
      .catch(showError);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleConfirmDelete() {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  return (
    <div className='page root__page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={email} onSignOut={onSignOut} />
        <Main>
          <Switch>
            <ProtectedRoute
              exact
              path='/'
              loggedIn={loggedIn}
              component={Content}
              selectDeletedCard={setDeletedId}
              onDeleteConfirm={handleConfirmDelete}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
            />
            <Route path='/sign-up'>
              <Register onSignUp={handleRegistration} isInfoTooltipOpen={isInfoTooltipOpen} />
            </Route>
            <Route path='/sign-in'>
              <Login onSignIn={handleLogin} />
            </Route>
          </Switch>
        </Main>
        <Footer />
        <ErrorMessage
          isServerError={error.isServerError}
          message={error.errorName}
          isOpen={isErrorPopupOpen}
          onClose={closeError}
        />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={isRegistrationSuccess} />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddCard={handleAddCard} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <ConfirmPopup
          onDeleteCard={handleCardDelete}
          onClose={closeAllPopups}
          isOpen={isConfirmPopupOpen}
          deletedId={deletedId}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
