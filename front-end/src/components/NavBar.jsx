import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { GET } from '../utils/requestApi';
import { MESSAGE_TOKEN_EXPIRED, BTNS_NAV_BAR } from '../utils/conts';
import { getLocalStorage, logout, redirectRoute } from '../utils/functions';

export default function NavBar({ Route }) {
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

  useEffect(() => {
    getUser();
  }, []);

  const createBtn = ({ nameBtn, routeBtn }) => (
    <button
      key={ routeBtn }
      type="button"
      onClick={ () => redirectRoute(`/${routeBtn}`) }
      disabled={ Route === routeBtn }
      data-testid={ `element-navbar-btn-${routeBtn}` }
    >
      {`${nameBtn}`}
    </button>
  );

  return (
    <nav>
      <h4 data-testid="element-navbar-user-name">
        {user.name}
      </h4>
      <button
        type="button"
        onClick={ () => {
          logout();
          redirectRoute('/login');
        } }
        data-testid="element-navbar-btn-logout"
      >
        Sair
      </button>
      <br />
      <section>
        { BTNS_NAV_BAR.map((e) => createBtn(e)) }
      </section>
    </nav>
  );
}

NavBar.propTypes = {
  Route: PropTypes.string.isRequired,
};
