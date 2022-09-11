import PropTypes from 'prop-types';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { BiPlusCircle } from 'react-icons/bi';
import { HiPlusCircle } from 'react-icons/hi';
import { RiMoneyDollarBoxFill, RiMoneyDollarBoxLine } from 'react-icons/ri';
import { BTNS_NAV_BAR } from '../utils/conts';

export default function ItensForNavBar({ RouteComponent, RouteScreen }) {
  if (RouteComponent === BTNS_NAV_BAR[0].routeBtn) {
    if (RouteComponent === RouteScreen) return <AiFillHome />;
    return <AiOutlineHome />;
  }

  if (RouteComponent === BTNS_NAV_BAR[1].routeBtn) {
    if (RouteComponent === RouteScreen) return <HiPlusCircle />;
    return <BiPlusCircle />;
  }

  if (RouteComponent === RouteScreen) return <RiMoneyDollarBoxFill />;

  return <RiMoneyDollarBoxLine />;
}

ItensForNavBar.propTypes = {
  RouteComponent: PropTypes.string.isRequired,
  RouteScreen: PropTypes.string.isRequired,
};
