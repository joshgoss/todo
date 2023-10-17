import React from "react";
import "./Checkbox.scss";
import PropTypes from "prop-types";
import Field from "./Field";
import Label from "./Label";

const Checkbox = React.forwardRef((props, ref) => {
  const { label, name, onBlur, onChange, width } = props;
  return (
    <Field className="checkbox" width={width}>
      <input
        className="checkbox-input"
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
        type="checkbox"
      />
      <Label htmlFor={name}>{label}</Label>
    </Field>
  );
});

export default Checkbox;

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};
