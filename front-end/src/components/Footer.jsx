import PropTypes from 'prop-types';
import ItensForNavBar from './ItensForNavBar';
import { BTNS_NAV_BAR } from '../utils/conts';
import { redirectRoute } from '../utils/functions';
import '../assets/Footer.css';

export default function NavBar({ Route }) {
  const createBtn = ({ nameBtn, routeBtn }) => (
    <button
      key={ routeBtn }
      type="button"
      onClick={ () => redirectRoute(`/${routeBtn}`) }
      disabled={ Route === routeBtn }
      className="footer-nav"
    >
      {`${nameBtn}`}
      <br />
      <ItensForNavBar
        className="footer-itens"
        RouteComponent={ routeBtn }
        RouteScreen={ Route }
      />
    </button>
  );

  return (
    <footer className="container-footer">
      <nav className="footer-icons">
        { BTNS_NAV_BAR.map((e) => createBtn(e)) }
      </nav>
    </footer>
  );
}

NavBar.propTypes = {
  Route: PropTypes.string.isRequired,
};
