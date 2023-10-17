import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState, useRef } from "react";
import "./DropdownMenu.scss";

const DropdownMenu = ({ children, onChange, options }) => {
  const [opened, setOpened] = useState(false);

  const ref = useRef(null);
  const handleMouseClickCallback = useCallback((event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpened(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseClickCallback);

    return () => {
      document.removeEventListener("mousedown", handleMouseClickCallback);
    };
  }, [handleMouseClickCallback]);

  return (
    <span className="dropdown-menu">
      <span className="dropdown-body">
        <span
          className="dropdown-title"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpened(!opened);
          }}
        >
          {children}
        </span>
        {opened && (
          <ul className="menu" ref={ref}>
            {options.map((o) => (
              <li
                className="menu-item"
                key={o.value}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onChange(o.value);
                  setOpened(false);
                }}
              >
                {o.icon && <FontAwesomeIcon icon={o.icon} style={{marginRight: '5px'}}/>} 
                {o.text}
              </li>
            ))}
          </ul>
        )}
      </span>
    </span>
  );
};
export default DropdownMenu;

DropdownMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.node,
  ]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      text: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
    })
  ),
  onChange: PropTypes.func,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
};

DropdownMenu.defaultProps = {
  children: [],
  opened: false,
  options: [],
};
