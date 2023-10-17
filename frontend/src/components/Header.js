import PropTypes from "prop-types";
import classNames from "classnames";
import "./Header.scss";

function Header({ center, children }) {
  const classes = classNames("header", { center });
  return <h1 className={classes}>{children}</h1>;
}

export default Header;

Header.propTypes = {
  center: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.node,
  ]),
};

Header.defaultProps = {
  center: false,
};
