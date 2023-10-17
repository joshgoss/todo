import "./Dropdown.scss";
import React from "react";
import PropTypes from "prop-types";
import Label from "./Label";
import Field from "./Field";

const Dropdown = React.forwardRef(
  (
    {
      disabled,
      error,
      label,
      name,
      onBlur,
      onChange,
      options,
      required,
      selected,
      width,
    },
    ref
  ) => (
    <Field className="dropdown" error={error} required={required} width={width}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <select
        className="dropdown-input"
        name={name}
        disabled={disabled}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
        selected={selected}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.text}
          </option>
        ))}
      </select>
    </Field>
  )
);

export default Dropdown;

Dropdown.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  width: PropTypes.number,
  selected: PropTypes.any,
};
