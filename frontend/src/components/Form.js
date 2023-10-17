import "./Form.scss";
import classNames from "classnames";
import PropTypes from "prop-types";

import Button from "./Button";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";
import Input from "./Input";

const Form = ({ className, children, onSubmit, style }) => (
  <form
    className={classNames("form", className)}
    onSubmit={onSubmit}
    style={style}
  >
    {children}
  </form>
);

Form.Group = ({ children }) => <div className="form-group">{children}</div>;

Form.Button = Button;
Form.Checkbox = Checkbox;
Form.Dropdown = Dropdown;
Form.Input = Input;

export default Form;

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  onSubmit: PropTypes.func.isRequired,
  style: PropTypes.object,
};
