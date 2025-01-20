import { useState } from 'react'; 

export default function NewCard(props) {

  const [title, setTitle] = useState(''); 
  const [link, setLink] = useState(''); 

  const handleTitleChange = (event) => {
    setTitle(event.target.value); 
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddPlaceSubmit({name: title, link});
    setTitle('');
    setLink('');
    props.onClose();
  }

  return (
    <form 
    className="new-card-popup__form form" 
    name="formNewCard"
    id="new-card-popup__form" 
    onSubmit={handleSubmit}
    >
        <fieldset
        className="form__fieldset">
            <input 
            type="text" 
            className="form__input form__input_type_title" 
            id="titulo" 
            name="name"
            placeholder='Title'
            minLength="2" 
            maxLength="30" 
            onChange={handleTitleChange} 
            value={title}
            required />
            <span className="form__input-error titulo-error"></span>
            <input 
            type="url" 
            className="form__input form__input_type_url" 
            id="url" 
            name="link" 
            placeholder='Image URL'
            onChange={handleLinkChange} 
            value={link}
            required />
            <span className="form__input-error url-error"></span>
            <button type="submit" className="form__submit-button">Salvar</button>
        </fieldset>
    </form>
  );
}