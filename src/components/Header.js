import React from 'react';
import headerLogoMin from '../images/logo-min.svg';
import headerLogoMax from '../images/logo-max.svg';
import NavBar from "../components/NavBar";
import {Link, useLocation} from 'react-router-dom';

function Header({ loggedIn, userData, onSignOut, load }) {
  const [isOpenNav, setIsOpenNav] = React.useState(false);
  const location = useLocation();

  function handleOpen() {
    setIsOpenNav(!isOpenNav);
  }

  return (
    <header className="header">
      <div className="header__container">
        <a href="/" className="logo">
          <picture>
            <source media="(max-width: 375px)" srcSet={headerLogoMin}/>
            <img src={headerLogoMax} alt="Логотип"/>
          </picture>
        </a>
        {loggedIn && <button
          type="button"
          className={`popup__close-icon ${isOpenNav ? 'popup__close-icon_type_open' : 'popup__close-icon_type_close'}`}
          onClick={handleOpen}
        />}
        {!load &&
        <>
          {!loggedIn && <Link to={location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"} className="header__link">
            {location.pathname === "/sign-up" ? "Войти" : "Регистрация"}
          </Link>}
        </>
        }
      </div>
      {loggedIn && <NavBar signOut={onSignOut} isOpenNav={isOpenNav} email={userData ? userData.email : ''}/>}
    </header>
  );
}

export default Header;
