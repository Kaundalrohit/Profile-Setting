import personalInfo from "../Images/personal_info.png";
import Footer from "./Footer";
import chnagePass from "../Images/change_password.png";
import notification from "../Images/notification_setting.png";
import logOut from "../Images/logout.png";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type props = {
  file: string;
};

export default function Profilesetting({ file }: props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar file={file} />
      <div className="container">
        <div className="heading text-start py-5">
          <h3>My Account</h3>
        </div>
        <div className="profile-setting-option">
          <div className="row justify-content-between d-flex">
            <div className="col-md-3 border shadow bg-white">
              <div className="personal-info p-3">
                <div className="d-flex flex-row">
                  <div className="">
                    <img src={personalInfo} alt="" />
                  </div>
                  <div className="ms-3 mt-2 align-item-center d-flex fw-bold">
                    <Link
                      to="/Personalinfo"
                      className="text-decoration-none text-black"
                    >
                      Personal_Info
                      <i className="bi bi-arrow-right-circle-fill ms-2 text-danger"></i>{" "}
                    </Link>
                  </div>
                </div>
                <div className="heading text-secondary text-start mt-3 ">
                  <p>Personal Details</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 border shadow bg-white">
              <div className="Change-pass p-3">
                <div className="d-flex flex-row">
                  <div className="">
                    <img src={chnagePass} alt="" />
                  </div>
                  <div className="ms-3 mt-2 align-item-center d-flex fw-bold">
                    <Link
                      to="/Changepass"
                      className="text-decoration-none text-black"
                    >
                      Change_Password
                      <i className="bi bi-arrow-right-circle-fill ms-2 text-danger"></i>{" "}
                    </Link>
                  </div>
                </div>
                <div className="heading text-secondary text-start mt-3 ">
                  <p>Update your password and secure your account</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 border shadow bg-white">
              <div className="personal-info p-3">
                <div className="d-flex flex-row">
                  <div className="">
                    <img src={notification} alt="" />
                  </div>
                  <div className="ms-2 mt-2 align-item-center d-flex fw-bold">
                    <Link
                      to="/Notification"
                      className="text-decoration-none text-black"
                    >
                      Notification_Setting
                      <i className="bi bi-arrow-right-circle-fill ms-2 text-danger"></i>
                    </Link>
                  </div>
                </div>
                <div className="heading text-secondary text-start mt-3 ">
                  <p>Review payments, payouts, Coupons, Gift cards and texas</p>
                </div>
              </div>
            </div>
          </div>
          <div className="log-out border  bg-white shadow p-4 mt-5  ">
            <div className="d-flex justify-content-between">
              <div className="heading fw-bold">Log_Out</div>
              <div className="icon">
                <Link to="/signin">
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                    }}
                  >
                    <img src={logOut} alt="" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 container-fluid">
        <Footer />
      </div>
    </>
  );
}
