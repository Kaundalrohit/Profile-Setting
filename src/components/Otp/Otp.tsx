import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Otp.css";
import axios from "axios";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type props = {
  phoneValue: any;
  setPhoneValue: any;
};

export default function Otp({ phoneValue, setPhoneValue }: props) {
  const navigate = useNavigate();

  const [votp, setvotp] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });

  let inputRef = useRef(null) as React.MutableRefObject<any>;
  let inputRef1 = useRef(null) as React.MutableRefObject<any>;
  let inputRef2 = useRef(null) as React.MutableRefObject<any>;
  let inputRef3 = useRef(null) as React.MutableRefObject<any>;

  const onClickotp = (value: any) => {
    if (value) {
      inputRef1.current.focus();
    } else {
      inputRef.current.focus();
    }
  };
  const onClickotp1 = (value: any) => {
    if (value) {
      inputRef2.current.focus();
    } else {
      inputRef.current.focus();
    }
  };
  const onClickotp2 = (value: any) => {
    if (value) {
      inputRef3.current.focus();
    } else inputRef1.current.focus();
  };
  const onClickotp3 = (value: any) => {
    if (value) {
      inputRef3.current.focus();
    } else {
      inputRef2.current.focus();
    }
  };

  const onInputChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;

    setvotp({
      ...votp,
      [name]: value,
    });
  };

  const postOtpDetails = async () => {
    try {
      await axios
        .post("http://139.59.47.49:4004/api/account/verify/otp", {
          mobile_number: phoneValue,
          otp: `${votp.input1}${votp.input2}${votp.input3}${votp.input4}`,
        })
        .then((res) => {
          navigate("/phoneverified");
          setPhoneValue("");
        });
    } catch (e) {
      console.log("error");
      toast("🦄 Invalid OTP", {
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
                  <Link to="/signupwithphone">
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
                <div className="confirm-number-heading h3 my-4">
                  Confirm your number
                </div>
                <div className="confirm-number h3 my-3">
                  <p> Enter the code just sent to:</p>
                  <p className="text-primary">{phoneValue}</p>
                </div>
                <div className="otp-field my-3 d-flex justify-content-evenly">
                  <div className="verification-code--inputs p-4 d-flex ">
                    <div className="opt_fields ">
                      <input
                        ref={inputRef}
                        id="text"
                        style={{
                          height: "85px",
                          width: "85px",
                          background: "#e5e4e4",
                        }}
                        type="text"
                        className="form-control me-5 text-center h3 text-primary"
                        maxLength={1}
                        onChange={(e: any) => {
                          onClickotp(e.target.value);
                          onInputChange(e);
                        }}
                        name="input1"
                        value={votp.input1}
                      />
                    </div>
                    <div className="opt_fields">
                      <input
                        ref={inputRef1}
                        id="text"
                        style={{
                          height: "85px",
                          width: "85px",
                          background: "#e5e4e4",
                        }}
                        type="text"
                        className="form-control me-5 text-center h3 text-primary"
                        maxLength={1}
                        onChange={(e: any) => {
                          onClickotp1(e.target.value);
                          onInputChange(e);
                        }}
                        value={votp.input2}
                        name="input2"
                      />
                    </div>

                    <div className="opt_fields">
                      <input
                        ref={inputRef2}
                        id="text"
                        style={{
                          height: "85px",
                          width: "85px",
                          background: "#e5e4e4",
                        }}
                        type="text"
                        className="form-control me-5 text-center h3 text-primary"
                        maxLength={1}
                        onChange={(e: any) => {
                          onClickotp2(e.target.value);
                          onInputChange(e);
                        }}
                        value={votp.input3}
                        name="input3"
                      />
                    </div>

                    <div className="opt_fields">
                      <input
                        ref={inputRef3}
                        id="text"
                        style={{
                          height: "85px",
                          width: "85px",
                          background: "#e5e4e4",
                        }}
                        type="text"
                        className="form-control text-center h3 text-primary"
                        maxLength={1}
                        onChange={(e: any) => {
                          onClickotp3(e.target.value);
                          onInputChange(e);
                        }}
                        value={votp.input4}
                        name="input4"
                      />
                    </div>
                  </div>
                </div>
                <div className="mess-not-get h6">
                  <span className="text-secondary"> Didn't get a text? </span>
                  <span className="text-decoration-underline">Send Again</span>
                </div>
                <div className="continue-btn">
                  <button
                    className="btn btn-danger w-100"
                    onClick={postOtpDetails}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
