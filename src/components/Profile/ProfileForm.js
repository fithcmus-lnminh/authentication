import classes from "./ProfileForm.module.css";
import { useRef, useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordRef.current.value;

    //validation

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAgzV9EzpzLJqUxrBSbSBnHXdq10yXniKY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }).then((res) => {
          //assumption: always success!
          history.replace("/");
        }),
      }
    );
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
