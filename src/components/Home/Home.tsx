import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import GoogleSdk from "../LogIn/GoogleSdk";
import Facebook from "../LogIn/Facebook";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div
            className="col-md-8"
            style={{ top: "94px", position: "relative" }}
          >
            <div className="card border rounded-3 shadow">
              <div className="card-header">
                <div className="card-img my-3">
                  <img src={logo} alt="" />
                </div>
                <div className="card-text my-3 h3">Welcome to App</div>
                <div className="card-btn">
                  <div className="d-grid gap-2 mx-auto">
                    <Link to="/Signupwithphone">
                      <button className="btn btn-danger w-50" type="button">
                        <i
                          className="bi bi-telephone-fill"
                          style={{ position: "relative", right: "70px" }}
                        ></i>{" "}
                        Continue with phone
                      </button>
                    </Link>
                    <div className="">
                      <GoogleSdk />
                    </div>
                    <Facebook />
                  </div>
                </div>
                <div className="sign-in my-4">
                  <p>
                    You have already accont?
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
