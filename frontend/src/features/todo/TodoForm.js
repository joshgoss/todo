import { capitalize, pick } from "lodash";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Form } from "../../components";
import { createTodo, priority, updateTodo } from "./todoSlice";

const defaultValues = {
    description: "",
    priority: priority.NONE,
    completed: false,
    due_date: null,
};

const TodoForm = (props) => {
    const { onCancelClick, onSubmitted, style } = props;
    const dispatch = useDispatch();
    const initialValues = {
        ...defaultValues,
        ...pick(props, [
            "id",
            "description",
            "priority",
            "due_date",
            "completed",
        ]),
    };

    const { register, formState, handleSubmit } = useForm({
        mode: "all",
        defaultValues: initialValues,
    });

    const { isValid, isSubmitting } = formState;

    const onSubmit = async (data) => {
        let resp;

        if (props.id) {
            resp = await dispatch(updateTodo({ id: props.id, data }));
        } else {
            resp = await dispatch(createTodo(data));
        }

        onSubmitted();
        return resp;
    };
    const formStyle = {
        padding: "15px",
        background: "#f0f0f0",
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ ...formStyle, ...style }}
        >
            <Form.Group>
                <Form.Input
                    label="Description"
                    placeholder="Description..."
                    width={3}
                    required
                    {...register("description", {
                        required: "This field is required",
                    })}
                />

                <Form.Dropdown
                    label="Priority"
                    options={Object.keys(priority).map((key) => ({
                        text: capitalize(key),
                        value: priority[key],
                    }))}
                    width={3}
                    {...register("priority")}
                />

                <Form.Input
                    label="Due Date"
                    type="date"
                    width={3}
                    {...register("due_date")}
                />

                <Form.Checkbox label="Completed" {...register("completed")} />
            </Form.Group>

            <Form.Button
                disabled={isSubmitting || !isValid}
                primary
                type="submit"
            >
                {!!props.id ? "Save" : "Add Todo"}
            </Form.Button>
            <Form.Button onClick={onCancelClick}>Cancel</Form.Button>
        </Form>
    );
};

export default TodoForm;

TodoForm.propTypes = {
    id: PropTypes.number,
    description: PropTypes.string,
    priority: PropTypes.string,
    completed: PropTypes.bool,
    due_date: PropTypes.string,
    onCancelClick: PropTypes.func,
    onSubmitted: PropTypes.func,
    style: PropTypes.object,
};
