import "./Input.scss";
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Label from "./Label";
import Field from "./Field";

const Input = React.forwardRef((props, ref) => {
    const {
        autoComplete,
        className,
        disabled,
        error,
        icon,
        label,
        loading,
        name,
        onBlur,
        onChange,
        placeholder,
        required,
        type,
        width,
    } = props;

    const inputClasses = classNames("input", {
        required: !!required,
        error: !!error,
    });

    let inputStyle = {};

    if (icon) {
        inputStyle.paddingLeft = "30px";
    }

    return (
        <Field
            className={classNames("input", className)}
            error={error}
            required={required}
            width={width}
        >
            {!!label && (
                <Label required={required} htmlFor={name}>
                    {label}
                </Label>
            )}

            <span className="input-container">
                {!!icon && <FontAwesomeIcon className="icon" icon={icon} />}

                <input
                    id={name}
                    autoComplete={autoComplete}
                    className={inputClasses}
                    disabled={disabled}
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder={placeholder}
                    ref={ref}
                    required={required}
                    type={type}
                    style={inputStyle}
                />

                {loading && (
                    <FontAwesomeIcon className="spinner" icon="spinner" spin />
                )}
            </span>

            {!!error && typeof error === "string" && error.length > 0 && (
                <p className="message error">{error}</p>
            )}
        </Field>
    );
});

export default Input;

Input.propTypes = {
    autoComplete: PropTypes.string,
    className: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.oneOf([PropTypes.string, PropTypes.bool]),
    icon: PropTypes.string,
    loading: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
    width: PropTypes.oneOf([1, 2, 3]),
    value: PropTypes.string,
};

Input.defaultProps = {
    className: "",
    disabled: false,
    loading: false,
    required: false,
    type: "text",
    width: 1,
};
