import styles from "./Register.module.scss";
import { useState } from "react";
import { T_APIRESULT_REGISTER, T_USER_DATA, type T_FORMINFO_REGISTER } from "../../types";
import { apiRequestRegister } from "../../methods/requests";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface IProps {
  setUserData: React.Dispatch<React.SetStateAction<T_USER_DATA>>
}

const Register: React.FC<IProps> = (props) => {
  const [userFormInfo, setUserFormInfo] = useState<T_FORMINFO_REGISTER>({
    username: "",
    firstPassword: "",
    secondPassword: "",
  });
  const [isError, setIsError] = useState<boolean>(false);

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    isError && setIsError(false);

    setUserFormInfo((userFormInfo: T_FORMINFO_REGISTER) => {
      return {
        ...userFormInfo,
        [e.target.name]: e.target.value,
      };
    });
  }

  const navigate = useNavigate();
  async function register(): Promise<void> {
    try {
      const res: AxiosResponse<T_APIRESULT_REGISTER> = await apiRequestRegister(
        userFormInfo
      );

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
            value={userFormInfo.firstPassword}
            type="password"
            id="password"
            name="firstPassword"
          />
        </h5>
        <h5 className="card-text text-center">
          <label htmlFor="secondPassword" className="mb-1">
            Confirm Password
          </label>
          <input
            className="form-control mb-3"
            onChange={inputHandler}
            value={userFormInfo.secondPassword}
            type="password"
            id="secondPassword"
            name="secondPassword"
          />
        </h5>
        <button className="btn btn-info me-3" onClick={register}>
          Register
        </button>
        {isError &&
          <div>Error occured, please try again</div>
        }
      </div>
    </div>
  );
};

export default Register;
