import "./TodoItem.scss";
import classNames from "classnames";
import { capitalize, pick } from "lodash";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { DropdownMenu } from "../../components";
import { prettyISODateTime } from '../../utils';
import { deleteTodo, priority } from "./todoSlice";
import TodoForm from "./TodoForm";

const priorityColor = {
  [priority.NONE]: "#bbb",
  [priority.LOW]: "#22dee8",
  [priority.MEDIUM]: "#2f6ae0",
  [priority.HIGH]: "#ea2323",
};

const actions = {
  DELETE: "Delete",
  EDIT: "Edit",
};

const TodoItem = (props) => {
  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();
  const style = {
    borderLeft: `10px solid ${priorityColor[props.priority]}`,
  };

  const handleActionClick = (v) => {
    if (v === actions.DELETE) {
      if (window.confirm("Are you sure you want to delete this todo? ")) {
        dispatch(deleteTodo(props.id));
      }
    } else if (v === actions.EDIT) {
      setEditing(true);
    }
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  return (
    <div className={classNames("todo-item", { editing })} style={style}>
      {editing ? (
        <TodoForm
          onCancelClick={cancelEditing}
          onSubmitted={cancelEditing}
          {...pick(props, [
            "id",
            "description",
            "priority",
            "due_date",
            "completed",
          ])}
        />
      ) : (
        <>
          <h3 className="description">{capitalize(props.description)}</h3>

          <div className="body group">
            <p className="field">
              <span>Priority: </span> {props.priority}
            </p>

            {!!props.due_date && (
              <p className="field">
                <span>Due Date: </span>
                {props.due_date}
              </p>
            )}

            <p className="created-at">{prettyISODateTime(props.created_at)}</p>
          </div>

          <DropdownMenu
            onChange={handleActionClick}
            options={[
              { icon: 'edit', text: actions.EDIT, value: actions.EDIT },
              { icon: 'trash', text: actions.DELETE, value: actions.DELETE },
            ]}
          >
            <FontAwesomeIcon icon="ellipsis-v" />
          </DropdownMenu>
        </>
      )}
    </div>
  );
};

export default TodoItem;

TodoItem.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  priority: PropTypes.string,
  due_date: PropTypes.string,
  completed: PropTypes.bool,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
};
