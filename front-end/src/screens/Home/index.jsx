import { useState, useEffect } from 'react';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { GET, DELETE } from '../../utils/requestApi';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CardQueries from '../../components/CardQueries';
import './styles.css';

export default function Home() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  const getQueries = async () => {
    try {
      const TOKEN = localStorage.getItem('token');

      const QUERIES = await GET('/queries', { headers: { authorization: TOKEN } });

      setQueries(QUERIES);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getQueries();
  }, []);

  const btnRemove = async (id) => {
    try {
      const TOKEN = localStorage.getItem('token');

      await DELETE(`/queries/${id}`, { headers: { authorization: TOKEN } });
      setQueries((prevState) => prevState.filter((e) => e.id !== id));

      alert('Consulta deletada com sucesso!');
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <span><i>Carregando...</i></span>;

  return (
    <>
      <Header Route="Home" />
      <main className="container-home">
        <span><i>Consultas cadastradas...</i></span>
        {
          queries.length === 0
            ? <h4><i>Ainda não há nenhuma consulta cadastrada</i></h4>
            : queries.map((e) => (
              <div
                key={ e.id }
                className="container-query"
              >
                <CardQueries { ...e } />
                <button
                  type="button"
                  data-testid="button-remove-querie"
                  onClick={ () => btnRemove(e.id) }
                  className="btn-query"
                >
                  <MdOutlineDeleteForever className="btn-query-icon" />
                </button>
              </div>
            ))
        }
      </main>
      <Footer Route="home" />
    </>
  );
}
