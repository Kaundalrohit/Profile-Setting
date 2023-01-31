import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signin() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPass, setUserPass] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleBtn = () => {
    setShowPass(!showPass);
  };

  const handleLog = async (e: any) => {
    e.preventDefault();
    const list = {
      email: userEmail,
      password: userPass,
    };

    try {
      if (userEmail && userPass) {
        let response = await axios.post(
          "http://139.59.47.49:4004/api/account/login",
          list
        );
        localStorage.setItem("token", response.data.token);
        navigate("/profilesetting");
        setUserEmail("");
        setUserPass("");
      }
    } catch (e) {
      console.log(e);
      toast("🦄 Either email or password is Invalid", {
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
                <div className="card-text my-3 h3">Welcome Back</div>
                <div className="input-field">
                  <form onSubmit={handleLog}>
                    <div className="user-email mb-3 position-relative">
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => {
                          setUserEmail(e.target.value);
                        }}
                        className="form-control"
                        placeholder="Email"
                      />
                      <i
                        className="bi bi-person text-primary h5"
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "14px",
                        }}
                      ></i>
                    </div>
                    <div className="user-pass mb-2 position-relative">
                      <input
                        type={showPass ? "text" : "password"}
                        value={userPass}
                        onChange={(e) => {
                          setUserPass(e.target.value);
                        }}
                        className="form-control"
                        placeholder="Password"
                      />
                      <i
                        className={
                          showPass
                            ? "bi bi-eye-slash text-danger h5"
                            : "bi bi-eye text-warning h5"
                        }
                        onClick={toggleBtn}
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "14px",
                        }}
                      ></i>
                    </div>
                    <div className="col-12 text-end mb-2 ">
                      <Link
                        to="/resetpass"
                        className="text-decoration-none text-danger"
                      >
                        Update Password?
                      </Link>
                    </div>
                    <button
                      className="btn btn-danger w-100"
                      type="submit"
                      disabled={!userEmail || !userPass}
                    >
                      Sign In
                    </button>
                  </form>
                </div>
                <div className="sign-in my-4">
                  <p>
                    Don't have an account?
                    <span>
                      <Link
                        to="/signup"
                        className="text-danger"
                        style={{ textDecoration: "none" }}
                      >
                        Sign Up
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
