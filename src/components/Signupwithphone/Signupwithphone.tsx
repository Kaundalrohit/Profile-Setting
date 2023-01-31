import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MobileNumberValidation } from "../Verified/Validation";
import Country from "../Verified/Country";
import { useState } from "react";

type props = {
  phoneValue: string;
  setPhoneValue: any;
};

export default function Signupwithphone({ phoneValue, setPhoneValue }: props) {
  const [validNum, setValidNum] = useState(false);
  const [Countrycode, setCountrycode] = useState("91");
  const navigate = useNavigate();

  const postPhoneDetails = async (e: any) => {
    e.preventDefault();
    const log = {
      mobile_number: phoneValue,
      country_code: Countrycode,
      device_type: 1,
    };

    try {
      if (MobileNumberValidation(phoneValue)) {
        let response = await axios.post(
          "http://139.59.47.49:4004/api/account/register",
          log
        );
        localStorage.setItem("token", response.data.token);
        let mobile = response.data.profile.mobile_number;
        localStorage.setItem("mobilenumber", mobile);
        navigate("/otp");
      } else {
        setValidNum(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
                <div className="input-field my-3">
                  <form onSubmit={postPhoneDetails}>
                    <div className="input-group mb-3">
                      <button
                        className="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        +{Countrycode}
                      </button>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Text input with dropdown button"
                        placeholder="Countrycode"
                        value={Countrycode}
                        onChange={(e: any) => setCountrycode(e.target.value)}
                        maxLength={2}
                      />

                      <ul className="dropdown-menu dropdown-menu-end">
                        {Country.data.map((res: any) => (
                          <li key={res.name}>
                            <button
                              className="dropdown-item"
                              onClick={() => setCountrycode(`${res.code}`)}
                            >
                              +{res.code}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <input
                      type="text"
                      value={phoneValue}
                      onChange={(e: any) => {
                        setPhoneValue(e.target.value.replace(/\D/, ""));
                      }}
                      id="phone"
                      className="form-control"
                      autoComplete="off"
                      data-intl-tel-input-id="0"
                      maxLength={10}
                      placeholder="Enter your Number"
                    />
                    {validNum ? (
                      <p className="text-danger">Please Enter A Valid Number</p>
                    ) : (
                      ""
                    )}
                    <button
                      className="btn btn-danger w-75 m-3"
                      type="submit"
                      disabled={10 > phoneValue.length}
                    >
                      Continue
                    </button>
                  </form>
                </div>
                <div className="sign-in my-4">
                  <p>
                    You have already account?
                    <span>
                      <Link
                        to="/signin"
                        className="text-danger text-decoration-none ms-2"
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
