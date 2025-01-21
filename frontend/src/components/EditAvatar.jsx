import { useRef, useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function EditAvatar(props) {
  const avatarRef = useRef(); 
  const { handleUpdateAvatar } = useContext(CurrentUserContext); 

  async function handleSubmit(e) {
    e.preventDefault();
  
    await handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    props.onClose();
  }

  return (
    <form className="edit-profile-pic-popup__form form" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <input
          type="url"
          className="form__input form__input_type_url"
          id="url"
          name="linkEditProfilePic"
          placeholder="insira a url aqui"
          ref={avatarRef} 
          required
        />
        <span className="form__input-error url-error"></span>
        <button type="submit" className="form__submit-button">Salvar</button>
      </fieldset>
    </form>
  );
}
