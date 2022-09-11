import PropTypes from 'prop-types';
import ItensForNavBar from './ItensForNavBar';
import { BTNS_NAV_BAR } from '../utils/conts';
import { redirectRoute } from '../utils/functions';

export default function NavBar({ Route }) {
  const createBtn = ({ nameBtn, routeBtn }) => (
    <button
      key={ routeBtn }
      type="button"
      onClick={ () => redirectRoute(`/${routeBtn}`) }
      disabled={ Route === routeBtn }
      data-testid={ `element-navbar-btn-${routeBtn}` }
    >
      {`${nameBtn}`}
      <ItensForNavBar
        RouteComponent={ routeBtn }
        RouteScreen={ Route }
      />
    </button>
  );

  return (
    <nav>
      <section>
        { BTNS_NAV_BAR.map((e) => createBtn(e)) }
      </section>
    </nav>
  );
}

NavBar.propTypes = {
  Route: PropTypes.string.isRequired,
};
