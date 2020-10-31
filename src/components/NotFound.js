import React from 'react';
import {Link} from 'react-router-dom';

function NotFound() {

  return (
    <div className="not-found">
      <h3 className="not-found__title">
        404 - Страница не найдена
      </h3>
      <Link className="not-found__button-back" to="/">Назад</Link>
    </div>
  );
}

export default NotFound;
