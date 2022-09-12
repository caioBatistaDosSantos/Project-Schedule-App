/* eslint-disable react/jsx-max-depth */
import { useState } from 'react';
import { GET } from '../../utils/requestApi';
import { createArrayOfNumbers } from '../../utils/functions';
import { TWELVE } from '../../utils/conts';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FinancialDatas from '../../components/FinancialDatas';
import './styles.css';

export default function FinancialManagement() {
  const [data, setData] = useState(false);
  const [numbersMonts, setNumberMonths] = useState(1);

  const getDate = () => {
    const today = new Date();
    const searchedDate = new Date();

    searchedDate
      .setMonth(today.getMonth() + Number(numbersMonts));

    return searchedDate
      .toLocaleString('pt-BR');
  };

  const searchData = async () => {
    try {
      const searchedDate = getDate();
      const corrrectDate = searchedDate
        .replace(/[/]/gi, '-')
        .split(' ')[0]
        .split('-')
        .reverse()
        .join('-');

      const TOKEN = localStorage.getItem('token');

      const result = await GET(
        `/search/installments/${corrrectDate}`,
        { headers: { authorization: TOKEN } },
      );

      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  const numberMonth = () => {
    const NUMBERS_MONTH = createArrayOfNumbers(1, TWELVE);

    return NUMBERS_MONTH.map((e) => (
      <option
        key={ e }
        id={ e }
      >
        {e}
      </option>
    ));
  };

  return (
    <>
      <Header Route="Financeiro" />
      <main>
        <section className="container-search">
          <div className="container-input-select">
            <label htmlFor="select-number-month">
              Informe a em quantos mêses deseja realizar a pesquisa:
              {' '}
              <select
                data-testid="select-number-month"
                name="select-number-month"
                id="select-number-month"
                required
                value={ numbersMonts }
                onChange={ ({ target }) => setNumberMonths(target.value) }
              >
                { numberMonth() }
              </select>
            </label>
          </div>
          <div className="container-btn">
            <button
              type="button"
              data-testid="button-search"
              onClick={ () => searchData() }
            >
              Pesquisar
            </button>
          </div>
        </section>
        {
          data && (
            <div className="container-search">
              <span>{`Resultado da pesquisa até ${getDate().split(' ')[0]}`}</span>
              <FinancialDatas data={ data } />
            </div>
          )
        }
      </main>
      <Footer Route="financial-management" />
    </>
  );
}
