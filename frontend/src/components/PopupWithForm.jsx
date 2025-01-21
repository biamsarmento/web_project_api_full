import React from 'react';

function PopupWithForm(props) {

  return (
    <section className={`${props.name} ${props.isOpen ? `${props.name}_opened` : ''}`}  id={props.name}>
        <div className={`${props.name}__container`}>
            <button className={`${props.name}__close-button`} onClick={props.onClose}></button>
            <h2 className={`${props.name}__title`}>{props.title}</h2>
            {/* <form className={`${props.name}__form form`} name={props.name} noValidate>
            <fieldset className="form__fieldset"> */}
                {props.children}
            {/* </fieldset>
            </form> */}
        </div>
    </section>
  )
}

export default PopupWithForm;

