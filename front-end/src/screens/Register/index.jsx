import { useEffect, useState } from 'react';
import { EMAIL_REGEX, SIX, TWELVE } from '../../utils/conts';
import { POST, SET_TOKEN } from '../../utils/requestApi';
import ErrorDiv from '../../components/ErrorDiv';
import { redirectRoute } from '../../utils/functions';
import '../Login/styles.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disbled, setDisabled] = useState(false);
  const [errorDiv, setErrorDiv] = useState(false);

  useEffect(() => {
    if (
      EMAIL_REGEX.test(email)
      && password.length >= SIX
      && name.length < TWELVE
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [name, email, password]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const result = await POST('/register', { name, email, password });

      SET_TOKEN(result.token);

      localStorage.setItem('user', JSON.stringify(result));
      localStorage.setItem('token', result.token);

      redirectRoute('/home');
    } catch (error) {
      console.log(error);
      setErrorDiv(true);
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
          <h3>Cadastre-se</h3>
        </div>
        <div className="container-email">
          <label htmlFor="name">
            <p>Nome Completo:</p>
            <input
              data-testid="common_register__input-name"
              type="text"
              id="name"
              name="name"
              onChange={ ({ target }) => setName(target.value) }
            />
          </label>
        </div>
        <div className="container-email">
          <label htmlFor="email-input">
            <p>Email:</p>
            <input
              type="text"
              id="email-input"
              name="email"
              onChange={ ({ target }) => setEmail(target.value) }
              required
            />
          </label>
        </div>
        <div className="container-password">
          <label htmlFor="password-input">
            <p>Senha (min 6):</p>
            <input
              type="text"
              id="password-input"
              name="password"
              onChange={ ({ target }) => setPassword(target.value) }
              required
            />
          </label>
        </div>
        <div className="container-btn">
          <button
            disabled={ disbled }
            data-testid="common_register__button-register"
            type="button"
            className="btn-enter"
            onClick={ (event) => handleClick(event) }
          >
            CADASTRAR
          </button>
        </div>
        {errorDiv && (
          <ErrorDiv
            dataTestId="common_register__element-invalid_register"
            message="Usuário já existe"
          />
        )}
      </form>
    </main>
  );
}
