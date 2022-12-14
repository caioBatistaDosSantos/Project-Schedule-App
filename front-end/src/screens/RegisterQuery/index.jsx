/* eslint-disable max-lines */
import { useState, useEffect } from 'react';
import { POST } from '../../utils/requestApi';
import { SIX, OPITION_PAYMENT, METHOD_PAYMENT, TWELVE } from '../../utils/conts';
import { createArrayOfNumbers } from '../../utils/functions';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorDiv from '../../components/ErrorDiv';
import './styles.css';

export default function RegisterQuery() {
  const [patientsName, setPatientsName] = useState('');
  const [descripition, setDescripition] = useState('');
  const [totalPriceOrigin, setTotalPriceOrigin] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [optionPayment, setOptionPayment] = useState(OPITION_PAYMENT[0]);
  const [methodPayment, setMethodPayment] = useState(METHOD_PAYMENT[0]);
  const [installmentsPrice, setInstallmentsPrice] = useState(0);
  const [installments, setInstallments] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [errorDiv, setErrorDiv] = useState(false);

  useEffect(() => {
    const states = [
      patientsName,
      descripition,
      optionPayment,
      methodPayment,
    ];

    const validateStates = states.every((e) => e.length >= SIX);

    if (
      validateStates
      && totalPrice > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    patientsName,
    descripition,
    totalPrice,
    optionPayment,
    methodPayment,
  ]);

  useEffect(() => {
    if (methodPayment === METHOD_PAYMENT[0]) {
      setInstallmentsPrice(totalPriceOrigin);
      setTotalPrice(totalPriceOrigin);
      setInstallments(1);
    } else {
      const fees = (installments !== 1) ? Number(installments) / 100 : 0;
      const value = Math.ceil((totalPriceOrigin / installments) + fees).toFixed(2);

      setInstallmentsPrice(value);
      setTotalPrice(installments * value);
    }
  }, [methodPayment, installments, totalPrice, totalPriceOrigin]);

  const cleaningEntries = () => {
    setTotalPriceOrigin(0);
    setTotalPrice(0);
    setOptionPayment(OPITION_PAYMENT[0]);
    setMethodPayment(METHOD_PAYMENT[0]);
    setInstallmentsPrice(0);
    setInstallments(1);
    setDisabled(true);
    setErrorDiv(false);
  };

  const postNewQuerie = async (DATES) => {
    try {
      const TOKEN = localStorage.getItem('token');

      await POST(
        '/queries',
        {
          patientsName,
          descripition,
          totalPrice,
          optionPayment,
          methodPayment,
          installmentsPrice,
          dates: DATES,
        },
        { headers: { authorization: TOKEN } },
      );

      cleaningEntries();
      alert('Procedimento criado com sucesso!');
    } catch (error) {
      console.log(error);
      setErrorDiv(true);
    }
  };

  const installmentsDates = () => {
    const today = new Date();
    const INSTALLMENTS_DATES = [];
    for (let i = 0; i < installments; i += 1) {
      const installmentDate = new Date();
      installmentDate.setMonth(today.getMonth() + i);

      INSTALLMENTS_DATES.push(installmentDate.toString());
    }
    postNewQuerie(INSTALLMENTS_DATES);
  };

  const createInputText = (
    idInput,
    descripitionInput,
    setStateInput,
  ) => (
    <div className="container-input">
      <label htmlFor={ `${idInput}` }>
        <p>{`${descripitionInput}`}</p>
        <input
          data-testid={ `input-${idInput}` }
          type="text"
          onChange={ ({ target }) => setStateInput(target.value) }
          name={ `${idInput}` }
          id={ `${idInput}` }
          required
        />
      </label>
    </div>
  );

  const createSelect = (
    idSelect,
    stateSelect,
    setStateSelect,
    arraySelect,
    descriptionSelect,
  // eslint-disable-next-line max-params
  ) => (
    <div className="container-input-select">
      <label htmlFor={ idSelect }>
        { descriptionSelect }
        <select
          data-testid={ `input-${idSelect}` }
          name={ `${idSelect}` }
          id={ `${idSelect}` }
          required
          value={ stateSelect }
          onChange={ ({ target }) => setStateSelect(target.value) }
        >
          {arraySelect.map((e, i) => (
            <option
              key={ i }
              id={ i }
            >
              {e}
            </option>
          ))}
        </select>
      </label>
    </div>
  );

  const numberInstallments = () => {
    const NUMBERS_INSTALLMENTS = createArrayOfNumbers(1, TWELVE);

    return NUMBERS_INSTALLMENTS.map((e) => (
      <option
        key={ e }
        id={ e }
      >
        {e}
      </option>
    ));
  };

  return (
    <section>
      <Header Route="Nova opera????o" />
      <form className="container-form">
        {errorDiv && (
          <ErrorDiv
            dataTestId="common_login__element-invalid_register_query"
            message="Erro ao tentar cadastrar a opera????o, tente novamente mais tarde"
          />
        )}
        { createInputText('patientsName', 'Nome do paciente (min 6):', setPatientsName) }
        { createInputText(
          'descripition',
          'Descri????o do procedimento (min 6):',
          setDescripition,
        ) }
        <div className="container-input">
          <label htmlFor="imput-total-price">
            Valor Total do procedimento:
            <input
              data-testid="imput-total-price"
              type="number"
              value={ totalPrice }
              onChange={ ({ target }) => {
                setTotalPrice(target.value);
                setTotalPriceOrigin(target.value);
              } }
              name="totalPrice"
              id="imput-total-price"
              required
            />
          </label>
        </div>
        { createSelect(
          'optionPayment',
          optionPayment,
          setOptionPayment,
          OPITION_PAYMENT,
          'Op????o de pagamento: ',
        ) }
        { createSelect(
          'methodPayment',
          methodPayment,
          setMethodPayment,
          METHOD_PAYMENT,
          'M??todo de pagamento: ',
        ) }
        {methodPayment === METHOD_PAYMENT[1]
          && (
            <div className="container-input-select">
              <label htmlFor="select-number-installments">
                N??mero de parcelas:
                <select
                  data-testid="select-number-installments"
                  name="select-number-installments"
                  id="select-number-installments"
                  required
                  value={ installments }
                  onChange={ ({ target }) => setInstallments(target.value) }
                >
                  { numberInstallments() }
                </select>
              </label>
              <span><i>{`Valor da parcela: R$${installmentsPrice.toString().replace(/\./, ',')}`}</i></span>
            </div>
          )}
        <div className="container-btn">
          <button
            type="button"
            data-testid="button-register-query"
            disabled={ disabled }
            onClick={ () => installmentsDates() }
          >
            Criar a Consulta
          </button>
        </div>
      </form>
      <Footer Route="register-query" />
    </section>
  );
}
