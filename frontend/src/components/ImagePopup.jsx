
function ImagePopup(props) {
    return (
        <section className={`image-popup ${props.card ? 'image-popup_opened' : ''}`} id="image-popup">
            <div className="image-popup__container">
            {props.card && (
                    <>
                        <img className="image-popup__picture" src={props.card.link} alt={props.card.name} />
                        <p className="image-popup__title">{props.card.name}</p>
                    </>
                )}
                <button className="image-popup__close-button" onClick={props.onClose}></button>
            </div>
        </section>
    )
}

export default ImagePopup;