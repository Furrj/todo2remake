import styles from "./Login.module.scss";
import { useState } from "react";
import { T_APIRESULT_LOGIN, T_USER_DATA, type T_FORMINFO_LOGIN } from "../../types";
import { apiRequestLogin } from "../../methods/requests";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface IProps {
  setUserData: React.Dispatch<React.SetStateAction<T_USER_DATA>>
}

const Login: React.FC<IProps> = (props) => {
  const [userFormInfo, setUserFormInfo] = useState<T_FORMINFO_LOGIN>({
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState<boolean>(false);

  const navigate = useNavigate()

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    setUserFormInfo((userFormInfo: T_FORMINFO_LOGIN) => {
      isError && setIsError(false);

      return {
        ...userFormInfo,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function login(): Promise<void> {
    try {
      const res: AxiosResponse<T_APIRESULT_LOGIN> = await apiRequestLogin(
        userFormInfo
      );
      console.log(res.data)

      props.setUserData({ username: userFormInfo.username, user_id: res.data.user_id })
      navigate("/");
    } catch (err) {
      console.log(err)
      setIsError(true);
    }

  }

  return (
    <div className={`card mx-auto mt-3 ${styles.root}`}>
      <div className="card-body text-center">
        <h5 className="card-title text-center">
          <label htmlFor="username" className="mb-1">
            Username
          </label>
          <input
            className="form-control"
            onChange={inputHandler}
            value={userFormInfo.username}
            type="text"
            id="username"
            name="username"
          />
        </h5>
        <hr />
        <h5 className="card-text text-center">
          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <input
            className="form-control mb-3"
            onChange={inputHandler}
            value={userFormInfo.password}
            type="password"
            id="password"
            name="password"
          />
        </h5>
        <button className="btn btn-primary me-3" onClick={login}>
          Login
        </button>
        {isError &&
          <div>Incorrect Password, try again</div>
        }
      </div>
    </div>
  );
};

export default Login;
