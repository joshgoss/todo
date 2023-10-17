import "./Field.scss";
import classNames from "classnames";
import PropTypes from "prop-types";

const Field = ({ children, className, error, required, width }) => {
  const classes = classNames(className, "field", {
    required,
    error,
    "col-1": width === 1,
    "col-2": width === 2,
    "col-3": width === 3,
  });

  return <div className={classes}>{children}</div>;
};

export default Field;

Field.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.node,
  ]),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.bool,
  width: PropTypes.number,
};

Field.defaultProps = {
  className: "",
};
