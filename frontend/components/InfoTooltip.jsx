import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import xisVermelho from '../images/xis_vermelho.png';
import checkPreto from '../images/check_preto.png';
import CurrentUserContext from '../contexts/CurrentUserContext';


function InfoTooltip({isLoginPopupOpen, onClose, errorRegistration}) {

    const {isLoggedIn} = useContext(CurrentUserContext);    
    const location = useLocation();
    const navigate = useNavigate();

    function closePopup() {
        if ((location.pathname === '/signup') && !isLoggedIn) {
            navigate("/signin");
        }
        onClose();
    }
    
    function renderPopup() {
        const isSignup = location.pathname === '/signup';
        const isSignin = location.pathname === '/signin';

        if(isLoginPopupOpen) {
            if(isSignup) {
                if(errorRegistration) {
                    return (
                        <div className='extra-popup__container'>
                            <img className='extra-popup__image' src={checkPreto} alt="Um simbolo de sucesso preto"></img>
                            <h2 className='profile-popup__title extra-popup_title'>Usuário já possui cadastrado! Faça Login.</h2>
                        </div> 
                    )
                } else {
                    return (
                        <div className='extra-popup__container'>
                            <img className='extra-popup__image' src={checkPreto} alt="Um simbolo de sucesso preto"></img>
                            <h2 className='profile-popup__title extra-popup_title'>Cadastro Realizado com Sucesso!</h2>
                        </div> 
                    )
                }
            } else if (isSignin) {
                return (
                    <div className='extra-popup__container'>
                        <img className='extra-popup__image' src={xisVermelho} alt="Um simbolo de fracasso vermelho"></img>
                        <h2 className='profile-popup__title extra-popup_title'>Ops, usuário não encontrado! Por favor, registre-se.</h2>
                    </div>
                )
            }   
        } else {
            return 
        }
    }

    return (
        <section className={`profile-popup ${isLoginPopupOpen ? 'profile-popup_opened' : ''}`} id='extra-popup'>
            <div className='profile-popup__container'>
                <button className='profile-popup__close-button' onClick={closePopup}></button>
                {isLoginPopupOpen && renderPopup()}
            </div>
        </section>
    )
}

export default InfoTooltip;

