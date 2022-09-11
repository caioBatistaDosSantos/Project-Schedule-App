import PropTypes from 'prop-types';

export default function FinancialDatas({ data }) {
  const countQueryIds = () => {
    const queries = [];
    let count = 0;

    data.forEach(({ queryId }) => {
      if (!queries.includes(queryId)) {
        count += 1;
        queries.push(queryId);
      }
    });

    return count;
  };

  const countTotalPrice = () => {
    let count = 0;

    data.forEach(({ installmentsPrice }) => { count += Number(installmentsPrice); });

    return count.toFixed(2).toString().replace(/\./, ',');
  };

  const countTotalPriceByStatus = (value) => {
    let count = 0;

    data.forEach(({ installmentsPrice, status }) => {
      if (status === value) count += Number(installmentsPrice);
    });

    return count.toFixed(2).toString().replace(/\./, ',');
  };

  if (data.length === 0) {
    return (
      <span><i>Ainda não há nenhuma consulta cadastrada até esta data!</i></span>
    );
  }

  return (
    <section>
      <p>{`Total de consultas cadastradas até esta data: ${countQueryIds()}`}</p>
      <p>{`Total de parcelas cadastradas até esta data: ${data.length}`}</p>
      <p>{`Valor total das parcelas: R$${countTotalPrice()}`}</p>
      <p>{`Valor à receber: R$${countTotalPriceByStatus(false)}`}</p>
      <p>{`Valor já recebido: R$${countTotalPriceByStatus(true)}`}</p>
    </section>
  );
}

FinancialDatas.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};
