import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Resetpass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const changePass = async (e: any) => {
    e.preventDefault();
    try {
      if (email) {
        await axios
          .post("http://139.59.47.49:4004/api/account/forgot/password", {
            email: email,
          })
          .then((res) => {
            console.log(res.data);
            navigate("/updatePass");
          });
      }
    } catch (e) {
      console.log(e);
      toast("🦄 Email doesn't exist", {
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
                  <Link to="/signin">
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
                <div className="card-text my-3 h3">
                  Forgotten Your Password?
                </div>
                <div className="input-field">
                  <form onSubmit={changePass}>
                    <div className="user-email mb-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        className="form-control"
                        placeholder="Enter Your Email"
                      />
                    </div>
                    <button className="btn btn-danger w-100" type="submit">
                      Send Reset Link
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
