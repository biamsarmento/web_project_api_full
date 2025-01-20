import logo from '../images/Vector.svg';
import { useNavigate, useLocation } from "react-router-dom";
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useContext } from 'react';
import { removeToken } from '../utils/token';

function Header() {

    const { setIsLoggedIn, userData } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const location = useLocation();

    function signOut() {
        removeToken();
        navigate("/signin");
        setIsLoggedIn(false);
    }

    const renderNav = () => {        
        if (location.pathname === '/signup') {
            return (
                <div className='nav__signup'>
                    <button className='nav__button' >Faça o Login</button>
                </div>
            );
        } else if (location.pathname === '/signin') {
            return (
                <div className='nav__signin'>
                    <button className='nav__button'>Entrar</button>
                </div>
            );
        } else {
            return (
                <div className='nav__logged-in'>
                    <p className='nav__logged-in__email'>{userData.email}</p>
                    <button className='nav__logged-in__sair' onClick={signOut}>Sair</button>
                </div>
            );
        } 
    };


    return (
        <header className="header">
            <div className="header__content">
            <nav className="nav">
                <a className="nav__logo-link" href="#">
                <img
                    src={logo}
                    alt="Logo Around The US"
                    className="nav__logo"
                /> 
                </a>
                {renderNav()}
            </nav>
            <div className="header__line"></div>
            </div>
        </header>
    )
}

export default Header;