import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "../../components";

import { login } from "./accountActions";

const LoginForm = () => {
    console.log("inside login form");
    const dispatch = useDispatch();
    const history = useHistory();
    const { register, formState, handleSubmit } = useForm({
        mode: "all",
    });

    const { isValid, isSubmitting } = formState;
    const onSubmit = async (d) => {
        const res = await dispatch(login(d));

        if (res.payload) {
            history.push("/");
        }

        return res;
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Input
                    label="Username"
                    width={1}
                    placeholder="Username..."
                    required={true}
                    {...register("username", {
                        required: "This field is required",
                    })}
                />

                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    width={1}
                    required={true}
                    type="password"
                    {...register("password", {
                        required: "This field is required",
                    })}
                />
            </Form.Group>

            <p>
                Don't have an account?{" "}
                <Link to="/create-account"> Create an account</Link>
            </p>

            <Form.Button
                disabled={isSubmitting || !isValid}
                loading={isSubmitting}
                primary
                type="submit"
            >
                Login
            </Form.Button>
        </Form>
    );
};

export default LoginForm;
