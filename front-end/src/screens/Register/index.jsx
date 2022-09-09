import { useEffect, useState } from 'react';
import { EMAIL_REGEX, SIX, TWELVE } from '../../utils/conts';
import { POST, SET_TOKEN } from '../../utils/requestApi';
import ErrorDiv from '../../components/ErrorDiv';
import { redirectRoute } from '../../utils/functions';

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
    <form>
      <h3>Register</h3>
      <label htmlFor="name">
        Nome:
        <input
          data-testid="common_register__input-name"
          type="text"
          id="name"
          name="name"
          onChange={ ({ target }) => setName(target.value) }
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          data-testid="common_register__input-email"
          type="text"
          id="email"
          name="email"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          data-testid="common_register__input-password"
          type="text"
          id="password"
          name="password"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        disabled={ disbled }
        data-testid="common_register__button-register"
        type="button"
        onClick={ (event) => handleClick(event) }
      >
        CADASTRAR
      </button>
      {errorDiv && (
        <ErrorDiv
          dataTestId="common_register__element-invalid_register"
          message="Usuário já existe"
        />
      )}
    </form>
  );
}
