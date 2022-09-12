import PropTypes from 'prop-types';
import { useState } from 'react';
import { GET } from '../utils/requestApi';
import Installments from './Installments';
import '../assets/CardQueries.css';

export default function CardQueries({
  id,
  patientsName,
  date,
  descripition,
  methodPayment,
  optionPayment,
  totalPrice,
}) {
  const [installments, setInstallments] = useState([]);

  const btnDetails = async () => {
    try {
      if (installments.length > 0) {
        setInstallments([]);
        return;
      }

      const TOKEN = localStorage.getItem('token');

      const INSTALLMENTS = await GET(
        `/installments/${id}`,
        { headers: { authorization: TOKEN } },
      );

      setInstallments(INSTALLMENTS);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      key={ `card-queires-${id}` }
      className="container-card-queries"
    >
      <button
        type="button"
        className="btn-card-queries"
        onClick={ () => btnDetails() }
      >
        <section className="section-name">
          <b>{patientsName}</b>
        </section>
        <section data-testid={ `section-card-${date}` }>
          {new Date(date).toLocaleDateString('pt-BR')}
        </section>
        <section>
          <span><i>Clique para mais detalhes</i></span>
        </section>
      </button>
      {
        installments.length !== 0
          && (
            <div className="container-details">
              <section className="section-details">
                {`Descrição: ${descripition}`}
                <p>
                  {`Total: R$${totalPrice.replace(/\./, ',')}`}
                </p>
                <p>
                  {`Opção de pagamento: ${methodPayment} - ${optionPayment}`}
                </p>
              </section>
              <section className="section-installments">
                {
                  installments.map((e, i) => (
                    <Installments
                      key={ e.id }
                      id={ e.id }
                      installmentsPrice={ e.installmentsPrice }
                      date={ e.date }
                      status={ e.status }
                      index={ i }
                    />
                  ))
                }
              </section>
            </div>
          )
      }
    </div>
  );
}

CardQueries.propTypes = {
  id: PropTypes.number.isRequired,
  patientsName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  descripition: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  methodPayment: PropTypes.string.isRequired,
  optionPayment: PropTypes.string.isRequired,
};
