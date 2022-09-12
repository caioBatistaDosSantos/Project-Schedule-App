import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FiLogOut } from 'react-icons/fi';
import { GET } from '../utils/requestApi';
import { MESSAGE_TOKEN_EXPIRED } from '../utils/conts';
import { getLocalStorage, logout, redirectRoute } from '../utils/functions';
import '../assets/Header.css';

export default function Header({ Route }) {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const USER = getLocalStorage('user');

      if (!USER) throw new Error('user not found');

      await GET('/logged', {
        headers: { Authorization: USER.token },
      });

      setUser(USER);
    } catch (error) {
      console.log(error.message);
      redirectRoute('/');
      logout();
      alert(MESSAGE_TOKEN_EXPIRED);
    }
  };

  console.log(user);
  useEffect(() => {
    getUser();
  }, []);

  return (
    <header className="container-header">
      <div className="header-search-title-profile">
        <img
          alt="logo-app"
          className="btn-logo"
          src="https://thumbs.dreamstime.com/b/ilustra%C3%A7%C3%A3o-do-vetor-esbo%C3%A7o-preto-%C3%ADcone-logotipo-dente-para-o-molde-dentista-ou-projeto-dos-cuidados-dent%C3%A1rios-stomatology-143278256.jpg"
        />
        <div className="container-title">
          <h1 className="header-title" data-testid="page-title">{Route}</h1>
          <div className="title-line" />
        </div>
        <button
          className="header-btn-search"
          type="button"
          onClick={ () => {
            logout();
            redirectRoute('/login');
          } }
          data-testid="element-navbar-btn-logout"
        >
          Sair
          {' '}
          <FiLogOut />
        </button>
      </div>
      <div className="header-search-title-profile">
        <div className="span-line" />
        { user.name && <span>{`Boas vindas ${user.name}!`}</span>}
        <div className="span-line" />
      </div>
    </header>
  );
}

Header.propTypes = {
  Route: PropTypes.string.isRequired,
};
