import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Spinner.scss";

const Spinner = ({ visible }) => (
  <>{visible && <FontAwesomeIcon className="spinner" icon="spinner" spin />}</>
);

export default Spinner;

Spinner.propTypes = {
  visible: PropTypes.bool,
};

Spinner.defaultProps = {
  visible: false,
};
