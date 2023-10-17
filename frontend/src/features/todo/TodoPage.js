import "./TodoPage.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Search, Spinner } from "../../components";
import { fetchTodos } from "./todoSlice";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

const TodoPage = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    const todos = useSelector((state) => {
        return state.todos.data.filter((t) => {
            if (
                searchTerm &&
                !(
                    t.description
                        .toUpperCase()
                        .indexOf(searchTerm.toUpperCase()) >= 0
                )
            ) {
                return false;
            }
            if (t.completed !== completed) {
                return false;
            }

            return true;
        });
    });

    useEffect(() => {
        setCompleted(false);
        setSearchTerm("");
        setLoading(true);
        dispatch(fetchTodos());
        setLoading(false);
    }, [dispatch, setCompleted, setSearchTerm]);

    const handleAddClick = (e) => {
        e.preventDefault();
        setShowAddForm(!showAddForm);
    };

    const handleCloseForm = () => {
        setShowAddForm(false);
    };

    const handleSearchChange = (e) => {
        const text = e.target.value;
        setSearchTerm(text);
    };

    const handleButtonGroupChange = (v) => {
        setCompleted(v);
    };

    const items = todos.map((t) => <TodoItem key={t.id} {...t} />);

    return (
        <div className="todo-page">
            <section className="action-bar">
                <Search onChange={handleSearchChange} />
                <ButtonGroup
                    buttons={[
                        { value: false, text: "Incomplete" },
                        { value: true, text: "Complete" },
                    ]}
                    onChange={handleButtonGroupChange}
                    selected={completed}
                />

                <Button
                    className="add-button"
                    active={showAddForm}
                    icon="plus"
                    onClick={handleAddClick}
                >
                    Add Todo
                </Button>
            </section>

            {showAddForm && (
                <TodoForm
                    onCancelClick={handleCloseForm}
                    onSubmitted={handleCloseForm}
                />
            )}

            {loading ? (
                <Spinner visible={loading} />
            ) : (
                <section>
                    <section className="todo-list">
                        <div className="todo-list-item">
                            {items.length ? (
                                items
                            ) : (
                                <p className="subtle">
                                    &nbsp; No todos to display.
                                </p>
                            )}
                        </div>
                    </section>
                </section>
            )}
        </div>
    );
};

export default TodoPage;
