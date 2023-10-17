import "./Label.scss";
import classNames from "classnames";
import PropTypes from "prop-types";

const Label = ({ htmlFor, children, onClick, required }) => {
  const classes = classNames("label", { required });

  return (
    <label className={classes} htmlFor={htmlFor} onClick={onClick}>
      {children}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.node,
  ]),
  onClick: PropTypes.func,
  required: PropTypes.bool,
};

export default Label;
