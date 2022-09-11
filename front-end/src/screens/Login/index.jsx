import { useState, useEffect } from 'react';
import { GET, POST, SET_TOKEN } from '../../utils/requestApi';
import { SIX, EMAIL_REGEX } from '../../utils/conts';
import { getLocalStorage, logout, redirectRoute } from '../../utils/functions';
import ErrorDiv from '../../components/ErrorDiv';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [errorDiv, setErrorDiv] = useState(false);

  const validateLogged = async () => {
    try {
      const USER = getLocalStorage('user');

      if (!USER) return;

      await GET('/logged', {
        headers: { Authorization: USER.token },
      });

      redirectRoute('/home');
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    validateLogged();
  }, []);

  useEffect(() => {
    if (
      EMAIL_REGEX.test(email)
      && password.length >= SIX
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const result = await POST('/login', { email, password });

      SET_TOKEN(result.token);

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result));

      redirectRoute('/home');
    } catch (error) {
      console.log(error);
      setErrorDiv(true);
    }
  };

  return (
    <section>
      <h3>Login</h3>
      <form>
        <label htmlFor="email">
          Email:
          <input
            data-testid="common_login__input-email"
            type="email"
            onChange={ ({ target }) => setEmail(target.value) }
            name="email"
            required
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="common_login__input-password"
            type="password"
            onChange={ ({ target }) => setPassword(target.value) }
            name="password"
            required
          />
        </label>
        {errorDiv && (
          <ErrorDiv
            dataTestId="common_login__element-invalid_login"
            message="email ou senha incorretos, tente novamente"
          />
        )}
        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ disabled }
          onClick={ (event) => handleClick(event) }
        >
          LOGIN
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => redirectRoute('/register') }
        >
          CRIAR UMA CONTA
        </button>
      </form>
    </section>
  );
}
