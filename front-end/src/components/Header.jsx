import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { GET } from '../utils/requestApi';
import { MESSAGE_TOKEN_EXPIRED } from '../utils/conts';
import { getLocalStorage, logout, redirectRoute } from '../utils/functions';

export default function Header() {
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

  return (
    <header>
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
        <FiLogOut />
      </button>
    </header>
  );
}
