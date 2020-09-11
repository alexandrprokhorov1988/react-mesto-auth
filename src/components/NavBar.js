import React from 'react';
import {useHistory} from 'react-router-dom';

function NavBar(props) {
  const history = useHistory();

  function signOut() {
    localStorage.removeItem('jwt');
    history.push('/login');
  }

  return (
    <div className="navbar">
      <ul className="navbar__nav">
        <li><p className="navbar__link navbar__user-name">{props.email}</p></li>
        <li>
          <button onClick={signOut} className="navbar__link navbar__button">Выйти</button>
        </li>
      </ul>
    </div>
  )

}

export default NavBar;