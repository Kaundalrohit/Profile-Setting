import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  MobileNumberValidation,
  strongPassword,
  email1,
} from "../Verified/Validation";

export default function Signup() {
  const [userNum, setUserNum] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPass, setUserPass] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [validNum, setValidNum] = useState<boolean>(false);
  const [validPass, setValidPass] = useState<boolean>(false);
  const [validEmail, setValidEmail] = useState<boolean>(false);

  const navigate = useNavigate();

  const toggleBtn = () => {
    setShowPass(!showPass);
  };

  const userSignUp = async (e: any) => {
    e.preventDefault();
    const list = {
      email: userEmail,
      password: userPass,
      mobile_number: userNum,
      device_type: 1,
    };

    try {
      if (
        MobileNumberValidation(userNum) &&
        strongPassword(userPass) &&
        email1(userEmail)
      ) {
        let response = await axios.post(
          "http://139.59.47.49:4004/api/account/register",
          list
        );
        localStorage.setItem("token", response.data.token);
        navigate("/signin");
        setUserEmail("");
        setUserPass("");
        setUserNum("");
      } else {
        if (MobileNumberValidation(userNum)) {
          setValidNum(false);
        } else {
          setValidNum(true);
        }
        if (email1(userEmail)) {
          setValidEmail(false);
        } else {
          setValidEmail(true);
        }
        if (strongPassword(userPass)) {
          setValidPass(false);
        } else {
          setValidPass(true);
        }
      }
    } catch (e) {
      console.log(e);
      toast("🦄 Invalid Details", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="container">
        <ToastContainer />
        <div className="row justify-content-center text-center">
          <div
            className="col-md-8"
            style={{ top: "94px", position: "relative" }}
          >
            <div className="card border rounded-3 shadow">
              <div className="card-header">
                <div className="card-img my-3">
                  <Link to="/">
                    {" "}
                    <i
                      className="bi bi-arrow-left-circle text-warning"
                      style={{
                        position: "absolute",
                        left: "30px",
                        fontSize: "26px",
                      }}
                    ></i>
                  </Link>
                  <img src={logo} alt="" />
                </div>
                <div className="card-text my-3 h3">Sign Up</div>
                <div className="card-input-field">
                  <form onSubmit={userSignUp}>
                    <div className="position-relative">
                      <label htmlFor="inputselect">
                        <i
                          className="bi bi-telephone-plus-fill text-danger position-absolute"
                          style={{
                            right: "22px",
                            top: "23px",
                            fontSize: "24px",
                          }}
                        ></i>
                      </label>
                      <input
                        type="text"
                        value={userNum}
                        onChange={(e) => {
                          setUserNum(e.target.value.replace(/\D/, ""));
                        }}
                        className="form-control"
                        placeholder="Number"
                        id="inputselect"
                        maxLength={10}
                      />
                      {!validNum ? (
                        ""
                      ) : (
                        <p className="text-danger text-start">
                          Please Enter A Valid Number
                        </p>
                      )}
                    </div>
                    <div className="position-relative">
                      <label htmlFor="exampleInputEmail1">
                        <i
                          className="bi bi-envelope-fill text-danger position-absolute"
                          style={{
                            right: "22px",
                            top: "23px",
                            fontSize: "24px",
                          }}
                        ></i>
                      </label>
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => {
                          setUserEmail(e.target.value);
                        }}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                      />
                      {!validEmail ? (
                        ""
                      ) : (
                        <p className="text-start text-danger">
                          Please put a valid email Address
                        </p>
                      )}
                    </div>
                    <div className="mb-3 position-relative">
                      <label htmlFor="exampleInputPassword1">
                        <i
                          className={
                            showPass
                              ? "bi bi-eye-slash-fill text-warning position-absolute"
                              : "bi bi-eye-fill text-danger position-absolute"
                          }
                          onClick={toggleBtn}
                          style={{
                            right: "22px",
                            top: "23px",
                            fontSize: "24px",
                          }}
                        ></i>
                      </label>
                      <input
                        type={showPass ? "text" : "password"}
                        value={userPass}
                        onChange={(e) => {
                          setUserPass(e.target.value);
                        }}
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                      {!validPass ? (
                        ""
                      ) : (
                        <p className="text-start text-danger" id="pass">
                          Use 8 or more characters with a mix of letters(with
                          one upper and lower case), numbers & symbols
                        </p>
                      )}
                    </div>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        required
                      />
                      <p className="text-start">
                        By clicking Create Account you agree to the{" "}
                        <span className="text-danger text-decoration-underline">
                          Terms and service
                        </span>{" "}
                        and{" "}
                        <span className="text-danger text-decoration-underline">
                          Privacy policy
                        </span>
                      </p>
                    </div>
                    <button
                      className="btn btn-danger w-100"
                      disabled={!userEmail || !userPass || !userNum}
                    >
                      Sign Up
                    </button>
                  </form>
                </div>
                <div className="sign-in my-4">
                  <p>
                    You have already account?
                    <span>
                      <Link
                        to="/signin"
                        className="text-danger"
                        style={{ textDecoration: "none" }}
                      >
                        Sign in
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
