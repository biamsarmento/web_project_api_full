import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';
import './index.css';
import api from './utils/api';
import * as auth from './utils/auth';
import { getToken, setToken } from "./utils/token";
import CurrentUserContext from './contexts/CurrentUserContext';

function App() {

  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [errorRegistration, setErrorRegistration] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({ email: "" });
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    (async () => {
      await api.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.error("Erro ao obter User Info:", err);
        });
    })();
      api.getInitialCards()
        .then((result) => {
          setCards(result); 
        })
        .catch((err) => {
          console.error("Erro ao obter cartões iniciais:", err);
        });

      const token = getToken();
      if (!token) {
        console.log("TOKEN: ", token);
        return;
      } else if(token) {
        auth
          .retrieveEmail(token)
          .then((data) => {
            setUserData({email: data.data.email});
            setIsLoggedIn(true);
            const redirectPath = location.state?.from?.pathname || "/";
            navigate(redirectPath);
          })
      }
  }, []);

  // CARD

  async function handleCardLike(card) {
    // Verificar mais uma vez se esse cartão já foi curtido
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    
    // Enviar uma solicitação para a API e obter os dados do cartão atualizados
    await api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    }).catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
      await api.deleteCard(card._id)
          .then(() => {
              setCards((state) => 
                  state.filter((currentCard) => currentCard._id !== card._id)
              );
          })
          .catch((error) => console.error(error));
  }

  const handleUpdateUser = (data) => {
    (async () => {
      await api.editProfile(data).then((newData) => {
        setCurrentUser(newData);
      });
    })();
  };

  function handleUpdateAvatar(avatar) {
    api.editProfilePicture(avatar)
      .then((newUserData) => {
        setCurrentUser(newUserData); 
      })
      .catch((err) => console.error(err));
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.error(err));
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleDeleteCardClick() {
    setDeleteCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setSelectedCard(null);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setIsLoginPopupOpen(false);
    setErrorRegistration(false);
  }

  const handleRegistration = ({
    email,
    password,
  }) => {
    
    auth
      .register(password, email)
      .then(() => {
        setIsLoginPopupOpen(true); 
      })
      .catch((error) => {
        setIsLoginPopupOpen(true); 
        setErrorRegistration(true);
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          setToken(data.token);
          auth 
            .retrieveEmail(data.token)
            .then((data) => {
              setUserData({email: data.data.email});
              const redirectPath = location.state?.from?.pathname || "/";
              navigate(redirectPath);
            })
            .catch(console.error);
      
        }
      })
      .catch((error) => {
        setIsLoginPopupOpen(true); 
      });
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{currentUser, handleUpdateUser, handleUpdateAvatar, isLoggedIn, setIsLoggedIn, userData}}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Main 
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleEditAvatarClick}
                onDeleteCardClick={handleDeleteCardClick}
                isEditProfilePopupOpen={isEditProfilePopupOpen}
                isAddPlacePopupOpen={isAddPlacePopupOpen}
                isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                isDeleteCardPopupOpen={isDeleteCardPopupOpen}
                selectedCard={selectedCard}
                onClose={closeAllPopups}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onAddPlaceSubmit={handleAddPlaceSubmit}
                userData={userData}
                ></Main>
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <Login handleLogin={handleLogin} isLoginPopupOpen={isLoginPopupOpen} onClose={closeAllPopups} errorRegistration={errorRegistration} ></Login>
            }
          />
          <Route
            path="/signup"
            element={
              <Register handleRegistration={handleRegistration} isLoginPopupOpen={isLoginPopupOpen} onClose={closeAllPopups} errorRegistration={errorRegistration}></Register>
            }
          />
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
