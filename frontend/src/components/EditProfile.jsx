import { useState, useContext, useEffect } from 'react'; 
import CurrentUserContext from '../contexts/CurrentUserContext'; 

export default function EditProfile(props) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState(''); 

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name); 
      setDescription(currentUser.about); 
    }
  }, [currentUser]); 

  const handleNameChange = (event) => {
    setName(event.target.value); 
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); 
  };

  async function handleSubmit(event) {
    event.preventDefault(); 

    await handleUpdateUser({ name, about: description }); 
    props.onClose();
  };

  return (
    <form 
    className="profile-popup__form form" 
    name="formPopup"
    id="profile-popup__form" 
    onSubmit={handleSubmit}
    >
        <fieldset
        className="form__fieldset">
            <input 
            type="text" 
            className="form__input form__input_type_name" 
            id="nome" 
            name="name"
            minLength="2" 
            maxLength="40" 
            value={name} 
            onChange={handleNameChange} 
            required />
            <span className="form__input-error nome-error"></span>
            <input 
            type="text" 
            className="form__input form__input_type_activity" 
            id="atividade" 
            name="about" 
            minLength="2" 
            maxLength="200"
            value={description} 
            onChange={handleDescriptionChange} 
            required />
            <span className="form__input-error atividade-error"></span>
            <button type="submit" className="form__submit-button">Salvar</button>
        </fieldset>
    </form>
  );
}