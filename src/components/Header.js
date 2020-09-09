import React from 'react';
import headerLogoMin from '../images/logo-min.svg';
import headerLogoMax from '../images/logo-max.svg';

function Header() {

  return (
    <header className="header">
      <a href="/" className="logo">
        <picture>
          <source media="(max-width: 375px)" srcSet={headerLogoMin} />
          <img src={headerLogoMax} alt="Логотип" />
        </picture>
      </a>
    </header>
  );
}

export default Header;