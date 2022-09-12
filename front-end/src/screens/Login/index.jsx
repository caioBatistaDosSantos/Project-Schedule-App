/* eslint-disable react/jsx-max-depth */
import { useState, useEffect } from 'react';
import { GET, POST, SET_TOKEN } from '../../utils/requestApi';
import { SIX, EMAIL_REGEX } from '../../utils/conts';
import { getLocalStorage, logout, redirectRoute } from '../../utils/functions';
import ErrorDiv from '../../components/ErrorDiv';
import './styles.css';

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
      const teste = 3000;
      setTimeout(() => setErrorDiv(false), teste);
    }
  };

  return (
    <main>
      <form className="container-login">
        <img
          alt="logo-app"
          className="btn-logo"
          src="https://thumbs.dreamstime.com/b/ilustra%C3%A7%C3%A3o-do-vetor-esbo%C3%A7o-preto-%C3%ADcone-logotipo-dente-para-o-molde-dentista-ou-projeto-dos-cuidados-dent%C3%A1rios-stomatology-143278256.jpg"
        />
        <div className="container-name">
          <p>Schedule App</p>
          <div className="name-line" />
        </div>
        <div className="container-email">
          <label htmlFor="email-input">
            <p>Email:</p>
            <input
              id="email-input"
              type="email"
              onChange={ ({ target }) => setEmail(target.value) }
              name="email"
              required
            />
          </label>
        </div>
        <div className="container-password">
          <label htmlFor="password-input">
            <p>Senha:</p>
            <input
              id="password-input"
              type="password"
              onChange={ ({ target }) => setPassword(target.value) }
              name="password"
              required
            />
          </label>
        </div>
        {errorDiv && (
          <ErrorDiv
            dataTestId="common_login__element-invalid_login"
            message="email ou senha incorretos, tente novamente"
          />
        )}
        <div className="container-btn">
          <button
            type="submit"
            id="common_login__button-login"
            className="btn-enter"
            disabled={ disabled }
            onClick={ (event) => handleClick(event) }
          >
            LOGIN
          </button>
          <br />
          <span>Ainda não tem uma conta? Então cadastre-se:</span>
          <button
            type="button"
            className="btn-enter"
            id="common_login__button-register"
            onClick={ () => redirectRoute('/register') }
          >
            CRIAR UMA CONTA
          </button>
        </div>
      </form>
    </main>
  );
}
