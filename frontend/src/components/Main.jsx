import editSign from '../images/EditSign.png';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';
import Card from './Card';
import EditProfile from './EditProfile';
import EditAvatar from './EditAvatar';
import NewCard from './NewCard';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Footer from './Footer';

function Main(props) {

    const {currentUser} = React.useContext(CurrentUserContext);

    return (
        <>
        <Header/>
        <main className="content">
            <PopupWithForm title="Editar Perfil" name="profile-popup" isOpen={props.isEditProfilePopupOpen} onClose={props.onClose}>
                <EditProfile onClose={props.onClose}></EditProfile>
            </PopupWithForm> 
            <PopupWithForm title="Novo Local" name="new-card-popup" isOpen={props.isAddPlacePopupOpen} onClose={props.onClose}>
                <NewCard onClose={props.onClose} onAddPlaceSubmit={props.onAddPlaceSubmit}></NewCard>
            </PopupWithForm> 
            <PopupWithForm title="Tem certeza?" name="delete-popup" isOpen={props.isDeleteCardPopupOpen} onClose={props.onClose}>
                <button type="submit" className="form__submit-button">Sim</button>
            </PopupWithForm>
            <PopupWithForm title="Alterar a foto do perfil" name="edit-profile-pic-popup" isOpen={props.isEditAvatarPopupOpen} onClose={props.onClose}>
                <EditAvatar onClose={props.onClose}></EditAvatar>
            </PopupWithForm>
            <ImagePopup card={props.selectedCard} onClose={props.onClose}></ImagePopup>
            <section className="profile" id="profile">
                <button className="profile__avatar_button" onClick={props.onEditAvatarClick}>
                    <img src={editSign} alt="Edit Sign" className="profile__avatar_edit"></img>
                    <img
                    src={currentUser.avatar}
                    alt="Avatar"
                    className="profile__avatar"
                    ></img>
                </button>
                <div className="profile__info">
                    <h1 className="profile__info-title">{currentUser.name}</h1>
                    <button className="profile__info-edit-button" onClick={props.onEditProfileClick}></button>
                    <p className="profile__info-activity">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" onClick={props.onAddPlaceClick}></button>
            </section>
            <section className="elements" id="elements">
            {props.cards.map((card) => {
                return (
                    <Card
                        key={card._id}
                        card={card}
                        onDeleteCardClick={props.onDeleteCardClick}
                        onCardDelete={props.onCardDelete}
                        onCardLike={props.onCardLike}
                        onCardClick={props.onCardClick}
                    />
                );
            })}
            </section>
        </main>
        <Footer/>
        </>
    )
}

export default Main;