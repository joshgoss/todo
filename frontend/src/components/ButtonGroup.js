import classNames from "classnames";
import PropTypes from "prop-types";

import "./ButtonGroup.scss";

const ButtonGroup = ({ buttons, selected, onChange }) => (
  <span className="button-group">
    {buttons.map((b) => (
      <span
        key={b.value}
        className={classNames("button", { active: b.value === selected })}
        onClick={(e) => {
          e.preventDefault();
          onChange(b.value);
        }}
      >
        {b.text}
      </span>
    ))}
  </span>
);

export default ButtonGroup;

ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
      text: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
};
