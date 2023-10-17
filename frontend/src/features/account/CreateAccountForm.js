import { useCallback, useState, useRef } from "react";
import { get } from "lodash";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { debounce } from "../../utils";
import { Form } from "../../components";
import { fetchUsernameExists, createAccount } from "./accountActions";
import { addNotification, notificationType } from '../notifications/notificationsSlice';

const CreateAccountForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [usernameExists, setUsernameExists] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const { register, formState, handleSubmit, trigger, watch } = useForm({
    mode: "all",
  });
  const { errors, isValid, isSubmitting } = formState;
  const onSubmit = async (data) => {
    let res;

    try {
      res = await dispatch(createAccount(data));

      history.push("/login");

      dispatch(addNotification({
        message: "Account successfully created. Login to your new account.",
        type: notificationType.SUCCESS,
      }))      
    } catch(e) {
    } finally {
      return res;
    }
  };

  const password = useRef({});
  password.current = watch("password", "");

  const d = debounce(async (v) => {
    if (v) {
      setCheckingUsername(true);
      const res = await dispatch(fetchUsernameExists(v));
      setCheckingUsername(false);
      const exists = get(res, "payload.exists");
      setUsernameExists(exists ? "Username already taken" : undefined);
      trigger("username");
    }
  }, 1500)

  const usernameTakenCallback = useCallback(d, [d]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Input
          autoComplete="off"
          label="Username"
          {...register("username", {
            required: "This field is required",
            minLength: { value: 3, message: "Value too short" },
            pattern: {
              value: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
              message: "Invalid username",
            },

            validate: {
              usernameTaken: () => usernameExists,
            },
          })}
          onChange={(e) => {
            usernameTakenCallback(e.target.value);
          }}
          loading={checkingUsername}
          error={get(errors, "username.message")}
          required={true}
          placeholder="Username..."
          width={1}
        />

        <Form.Input
          autoComplete="new-password"
          label="Password"
          {...register("password", {
            required: true,
            minLength: { value: 6, message: "Password is too short" },
          })}
          error={get(errors, "password.message")}
          placeholder="Password..."
          required={true}
          type="password"
          width={2}
        />

        <Form.Input
          autoComplete="new-password"
          label="Confirm Password"
          {...register("password_confirmation", {
            validate: (v) => {
              return v === password.current
                ? undefined
                : "Passwords do not match";
            },
          })}
          error={get(errors, "password_confirmation.message")}
          required={true}
          placeholder="Confirm Password..."
          type="password"
          width={2}
        />

        <Form.Input
          label="First Name"
          {...register("first_name")}
          error={get(errors, "first_name.message")}
          placeholder="First Name..."
          width={2}
        />

        <Form.Input
          label="Last Name"
          {...register("last_name")}
          error={get(errors, "last_name.message")}
          placeholder="Last Name..."
          width={2}
        />
      </Form.Group>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>

      <Form.Button
        primary
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
        type="submit"
      >
        Create Account
      </Form.Button>
    </Form>
  );
};

export default CreateAccountForm;
