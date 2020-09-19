import React from 'react';
import headerLogoMin from '../images/logo-min.svg';
import headerLogoMax from '../images/logo-max.svg';
import NavBar from "../components/NavBar";
import {Link} from 'react-router-dom';

function Header({ loggedIn, userData, authState, onSignOut }) {

  return (
    <header className="header">
      <div className="header__container">
      <a href="/" className="logo">
        <picture>
          <source media="(max-width: 375px)" srcSet={headerLogoMin}/>
          <img src={headerLogoMax} alt="Логотип"/>
        </picture>
      </a>
      <button type="button" className="popup__close-icon popup__close-icon_type_header"/>
      {!loggedIn && <Link to={authState ? "/sign-in" : "/sign-up"} className="header__link">
        {authState ? "Войти" : "Регистрация"}
      </Link>}
      </div>
      {loggedIn && <NavBar signOut={onSignOut} email={userData ? userData.email : ''}/>}
    </header>
  );
}

export default Header;