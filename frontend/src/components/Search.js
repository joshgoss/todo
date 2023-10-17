import PropTypes from "prop-types";
import Input from "./Input";

const Search = ({ onChange }) => (
  <Input
    className="search"
    icon="search"
    name="search"
    onChange={onChange}
    placeholder="Search..."
  />
);

export default Search;

Search.propTypes = {
  onChange: PropTypes.func,
};
