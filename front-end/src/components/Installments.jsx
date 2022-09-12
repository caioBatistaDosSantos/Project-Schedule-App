import PropTypes from 'prop-types';
import { useState } from 'react';
import { PUT } from '../utils/requestApi';
import '../assets/Installments.css';

export default function Installments({
  id,
  installmentsPrice,
  date,
  status,
  index,
}) {
  const [checkedStatus, setCheckedStatus] = useState(status);

  const INDEX = index + 1;
  const PRICE = installmentsPrice.replace(/\./, ',');
  const DATE = new Date(date).toLocaleDateString('pt-BR');
  const STATUS = checkedStatus ? 'pago' : 'pendente';

  const checkInstallments = async () => {
    try {
      const TOKEN = localStorage.getItem('token');

      await PUT(
        `/installments/${id}`,
        { status: !checkedStatus },
        { headers: { authorization: TOKEN } },
      );

      setCheckedStatus(!checkedStatus);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cconteiner-installments">
      <label
        htmlFor={ index }
        className="installments"
      >
        {`${INDEX}x - R$${PRICE} - ${DATE} - ${STATUS} `}
        <input
          type="checkbox"
          id={ index }
          defaultChecked={ status }
          onClick={ () => checkInstallments() }
        />
      </label>
    </div>
  );
}

Installments.propTypes = {
  id: PropTypes.number.isRequired,
  installmentsPrice: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};
