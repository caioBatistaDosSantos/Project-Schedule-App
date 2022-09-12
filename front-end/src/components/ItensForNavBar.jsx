import PropTypes from 'prop-types';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { BiPlusCircle } from 'react-icons/bi';
import { HiPlusCircle } from 'react-icons/hi';
import { RiMoneyDollarBoxFill, RiMoneyDollarBoxLine } from 'react-icons/ri';
import { BTNS_NAV_BAR } from '../utils/conts';
import '../assets/ItensForNavBar.css';

export default function ItensForNavBar({ RouteComponent, RouteScreen }) {
  if (RouteComponent === BTNS_NAV_BAR[0].routeBtn) {
    if (RouteComponent === RouteScreen) return <AiFillHome className="icons" />;
    return <AiOutlineHome className="icons" />;
  }

  if (RouteComponent === BTNS_NAV_BAR[1].routeBtn) {
    if (RouteComponent === RouteScreen) return <HiPlusCircle className="icons" />;
    return <BiPlusCircle className="icons" />;
  }

  if (RouteComponent === RouteScreen) return <RiMoneyDollarBoxFill className="icons" />;

  return <RiMoneyDollarBoxLine className="icons" />;
}

ItensForNavBar.propTypes = {
  RouteComponent: PropTypes.string.isRequired,
  RouteScreen: PropTypes.string.isRequired,
};
