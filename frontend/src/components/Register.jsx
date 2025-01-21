import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import Header from "./Header";

function Register({handleRegistration, isLoginPopupOpen, onClose, errorRegistration}) {

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        handleRegistration(data);
        // navigate('/signin');
      };

      function renderLoginPopup() {
        if (isLoginPopupOpen) {
            return (
                <InfoTooltip isLoginPopupOpen={isLoginPopupOpen} onClose={onClose} errorRegistration={errorRegistration}></InfoTooltip>
            )
        }
    }

    return (
        <>
        <Header></Header>
        <section className="register" id="register">
            <h1 className="register__title">Inscrever-se</h1>
            <div className="register__form">
                <form className="register__form form" name="register__form" id="register__form" onSubmit={handleSubmit}>
                <fieldset className="form__fieldset">
                    <input 
                    type="email" 
                    className="form__input form__input_type_email" 
                    id="email" 
                    name="email"
                    minLength="2" 
                    maxLength="40" 
                    placeholder="E-mail"
                    value={data.email} 
                    onChange={handleChange} 
                    required />
                    <span className="form__input-error nome-error"></span>
                    <input 
                    type="password" 
                    className="form__input form__input_type_password" 
                    id="password" 
                    name="password" 
                    minLength="2" 
                    maxLength="200"
                    placeholder="Senha"
                    value={data.password} 
                    onChange={handleChange} 
                    required />
                    <span className="form__input-error atividade-error"></span>
                    <button type="submit" className="form__submit-button__register">Inscrever-se</button>
                </fieldset>
                </form>
            </div>
            <div className="register__login-button">
                <Link to="/signin" className="register__login-button_link">
                    Já é um membro? Faça o login aqui!
                </Link>
            </div>
            {isLoginPopupOpen && renderLoginPopup()}
        </section>
        </>
    )
}

export default Register;