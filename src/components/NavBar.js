import React from 'react';

function NavBar({signOut, email, isOpenNav}) {

  return (
    <div className={`navbar ${!isOpenNav ? 'navbar_hide' : ''}`}>
      <ul className="navbar__nav">
        <li><p className="navbar__link navbar__user-name">{email}</p></li>
        <li>
          <button onClick={signOut} className="navbar__link navbar__button">Выйти</button>
        </li>
      </ul>
    </div>
  )
}

export default NavBar;