import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {

    const {currentUser} = React.useContext(CurrentUserContext);

    
    const isOwn = props.card.owner === currentUser._id;
    
    const cardDeleteButtonClassName = (
    
    `${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    );

    
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    
    const cardLikeButtonClassName = (
        `${isLiked ? 'card__tag-like card__tag-like_liked' : 'card__tag-like'}`
    );

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleClick() {
        props.onCardClick(props.card);
    }
    
    return (
        <div className="card" key={props.card._id}>
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <button className="card__image-link" onClick={handleClick}>
                <img className="card__image" src={props.card.link} alt={props.card.name}/>
            </button>
            <div className="card__tag">
                <p className="card__tag-title">{props.card.name}</p>
                <div className="card__tag-likes">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="card__tag-like-count">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;