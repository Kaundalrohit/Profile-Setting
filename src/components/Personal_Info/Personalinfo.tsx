import Footer from "./Footer";
import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Country from "../Verified/Country";
import { Link } from "react-router-dom";
import axios from "axios";
import userImg from "../Images/userImg.jpg";
import { MobileNumberValidation, email1 } from "../Verified/Validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

type props = {
  changedName: string;
  setChangedName: any;
  file: string;
  setFile: any;
};

export default function Personalinfo({
  changedName,
  setChangedName,
  file,
  setFile,
}: props) {
  // State for get user details....

  const [data, setData] = useState<any>({
    number: "",
    email: "",
    adrs: "",
    name: "",
    otp: "",
  });

  // eslint-disable-next-line
  const [complete, setComplete] = useState<boolean>(true);

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
      setComplete(false);
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

  // States for country code and phone number....

  const [Countrycode, setCountrycode] = useState<string>("91");

  const [changedLoc, setChangedLoc] = useState<string>("");
  const [changedEmail, setChangedEmail] = useState<string>("");
  const [validNum, setValidNum] = useState<boolean>(false);
  const [validEmail, setValidEmail] = useState<boolean>(false);

  // States for toggle buttons

  const [nameShow, setNameShow] = useState<boolean>(false);
  const [locationShow, setLocationShow] = useState<boolean>(false);
  const [emailShow, setEmailShow] = useState<boolean>(false);
  const [numShow, setNumShow] = useState<boolean>(false);
  const [verifyShow, setVerifyShow] = useState<boolean>(false);
  const [updateShow, setUpdateShow] = useState<boolean>(false);

  // Function for save all user details

  const saveChanges = async () => {
    try {
      if (changedName && changedLoc && file) {
        await axios.put(
          "http://139.59.47.49:4004/api/edit-profile",
          {
            first_name: changedName,
            mobile_number: data.number,
            address: changedLoc,
            profile_image: file,
            email: data.email,
          },
          {
            headers: {
              Authorization: "" + localStorage.getItem("token"),
            },
          }
        );
        toast("🦄 Profile Saved 😃", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast("🦄 Incompleted Details ", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateNum = async () => {
    try {
      if (MobileNumberValidation(data.number)) {
        await axios.put(
          "http://139.59.47.49:4004/api/edit-profile",
          {
            mobile_number: data.number,
          },
          {
            headers: {
              Authorization: "" + localStorage.getItem("token"),
            },
          }
        );
        setVerifyShow(true);
        setUpdateShow(true);
        setValidNum(false);
      } else {
        setValidNum(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const updateEmail = async () => {
    try {
      if (email1(changedEmail)) {
        await axios.put(
          "http://139.59.47.49:4004/api/edit-profile",
          {
            email: changedEmail,
          },
          {
            headers: {
              Authorization: "" + localStorage.getItem("token"),
            },
          }
        );
        setEmailShow(false);
      } else {
        setValidEmail(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const updateName = async () => {
    try {
      await axios.put(
        "http://139.59.47.49:4004/api/edit-profile",
        {
          first_name: changedName,
        },
        {
          headers: {
            Authorization: "" + localStorage.getItem("token"),
          },
        }
      );
      setNameShow(false);
    } catch (e) {
      console.log(e);
    }
  };
  const updateAdrs = async () => {
    try {
      await axios.put(
        "http://139.59.47.49:4004/api/edit-profile",
        {
          address: changedLoc,
        },
        {
          headers: {
            Authorization: "" + localStorage.getItem("token"),
          },
        }
      );
      setLocationShow(false);
    } catch (e) {
      console.log(e);
    }
  };

  // API for get all user details
  useEffect(() => {
    try {
      const getUserPeofile = async () => {
        let response = await axios.get("http://139.59.47.49:4004/api/profile", {
          headers: {
            Authorization: "" + localStorage.getItem("token"),
          },
        });
        setData({
          number: response.data.profile.mobile_number,
          email: response.data.profile.email,
          adrs: response.data.profile.address,
          name: response.data.profile.first_name,
        });
        setChangedName(response.data.profile.first_name);
        setChangedLoc(response.data.profile.address);
        setChangedEmail(response.data.profile.email);
        setFile(response.data.profile.profile_image);
      };
      if (!localStorage.getItem("token")) {
        navigate("/");
      } else {
        getUserPeofile();
      }
    } catch {
      console.log("error");
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let files = e.target.files[0];
    const formData = new FormData();
    formData.append("file", files);
    try {
      const response = await axios.post(
        `http://139.59.47.49:4004/api/upload/image`,
        formData
      );
      setFile(response.data.filename);
    } catch (error) {
      console.log(error);
    }
  };

  const postPhoneDetails = async (e: any) => {
    const log = {
      mobile_number: data.number,
      country_code: Countrycode,
    };
    try {
      if (MobileNumberValidation(data.number)) {
        await axios.post("http://139.59.47.49:4004/api/account/send/otp", log, {
          headers: {
            Authorization: "" + localStorage.getItem("token"),
          },
        });
      } else {
        setValidNum(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const verifyOtp = async () => {
    try {
      await axios
        .post("http://139.59.47.49:4004/api/account/verify/otp", {
          mobile_number: data.number,
          otp: `${votp.input1}${votp.input2}${votp.input3}${votp.input4}`,
        })
        .then((res) => {
          console.log(res.data);
          setNumShow(false);
          toast("🦄 OTP Verified", {
            position: "top-right",
            autoClose: 600,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setVerifyShow(false);
          setUpdateShow(false);
        });
    } catch (e) {
      console.log(e);
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
      {/* Navbar */}

      <Navbar file={file} />

      {/* Header */}

      <div className="container">
        <ToastContainer />
        <div className="heading text-start my-4">
          <Link to="/profilesetting" className="text-decoration-none">
            My Account
          </Link>
          <i className="bi bi-caret-right-fill mx-2"></i>
          <span>Personal Info</span>
          <h3 className="fw-bold my-4">Personal Info</h3>
        </div>
        <div className="box d-flex justify-content-between">
          <div className="input-field">
            {/* form */}

            <div className="name " style={{ width: "500px" }}>
              {/* //Name Input */}

              <div className="name-input border p-3 bg-white shadow">
                <div className="d-flex justify-content-between">
                  <div className="name fw-bold">Name</div>
                  {!nameShow && (
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setNameShow(true);
                      }}
                    >
                      Change
                    </button>
                  )}
                  {nameShow && (
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setNameShow(false);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
                {nameShow ? (
                  <div className="input-name-field my-2">
                    <input
                      type="text"
                      value={changedName}
                      onChange={(e) => {
                        setChangedName(e.target.value);
                      }}
                      className="w-100"
                      required
                      placeholder="Enter Your Name"
                    />
                    <div className="save-btn text-start mt-2">
                      <button className="btn btn-danger" onClick={updateName}>
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="fw-bold text-primary">{changedName}</p>
                )}
              </div>

              {/* // Location Field */}

              <div className="name-input border p-3 bg-white shadow my-3">
                <div className="d-flex justify-content-between">
                  <div className="name fw-bold">Location</div>
                  {!locationShow && (
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setLocationShow(true);
                      }}
                    >
                      change
                    </button>
                  )}
                  {locationShow && (
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setLocationShow(false);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
                {locationShow ? (
                  <div className="input-name-field my-2">
                    <input
                      type="text"
                      value={changedLoc}
                      required
                      onChange={(e) => {
                        setChangedLoc(e.target.value);
                      }}
                      className="w-100"
                      placeholder="Dubai, UAE"
                    />
                    <div className="save-btn text-start mt-2">
                      <button className="btn btn-danger" onClick={updateAdrs}>
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="fw-bold text-primary">{changedLoc}</p>
                )}
              </div>

              {/* // Email Field 🍤 */}

              <div className="name-input border p-3 bg-white shadow mb-3">
                <div className="d-flex justify-content-between">
                  <div className="name fw-bold">Email</div>
                  {!emailShow && (
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setEmailShow(true);
                        setValidEmail(false);
                      }}
                    >
                      change
                    </button>
                  )}
                  {emailShow && (
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setEmailShow(false);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {emailShow ? (
                  <div className="input-name-field my-2">
                    <input
                      type="text"
                      value={changedEmail}
                      onChange={(e) => {
                        setChangedEmail(e.target.value);
                      }}
                      className="w-100"
                      placeholder="user123@gmail.com"
                    />
                    {!validEmail ? (
                      ""
                    ) : (
                      <p className="text-start text-danger">
                        Please put a valid email Address
                      </p>
                    )}
                    <div className="save-btn text-start mt-2">
                      <button className="btn btn-danger" onClick={updateEmail}>
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="fw-bold text-primary">{changedEmail}</p>
                )}
              </div>

              {/* // Number Field */}

              <div className="name-input border p-3 bg-white shadow">
                <div className="d-flex justify-content-between">
                  <div className="name fw-bold">Mobile Number</div>
                  {!numShow && (
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setNumShow(true);
                      }}
                    >
                      change
                    </button>
                  )}
                  {numShow && (
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setNumShow(false);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
                {numShow ? (
                  <div>
                    <div className="input-group mb-3 mt-2">
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
                              // href="#"
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
                      value={data.number}
                      onChange={(e: any) => {
                        // setChangedName(e.target.value.replace(/\D/, ""));
                        setData({ number: e.target.value.replace(/\D/, "") });
                      }}
                      id="phone"
                      className="form-control"
                      autoComplete="off"
                      data-intl-tel-input-id="0"
                      maxLength={10}
                      placeholder="081234 56789"
                    />
                    {validNum ? (
                      <p className="text-danger">Please Enter A Valid Number</p>
                    ) : (
                      ""
                    )}
                    <div className="save-btn text-start mt-2">
                      {verifyShow && (
                        <button
                          className="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={postPhoneDetails}
                        >
                          Verify
                        </button>
                      )}
                      {!updateShow && (
                        <button className="btn btn-danger" onClick={updateNum}>
                          update
                        </button>
                      )}
                      <div
                        className="modal fade"
                        id="exampleModal"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                <div
                                  className="confirm-number-heading h4 my-4"
                                  style={{
                                    position: "relative",
                                    left: "95px",
                                  }}
                                >
                                  Confirm Your Number
                                </div>
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="confirm-number h3 my-3">
                                <p className="text-center">
                                  {" "}
                                  Enter the code just sent to:
                                </p>
                                <p className="text-primary text-center">
                                  {data.number}
                                </p>
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
                                        setComplete(false);
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
                                        setComplete(false);
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
                                        setComplete(false);
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
                                        setComplete(false);
                                        onClickotp3(e.target.value);
                                        onInputChange(e);
                                      }}
                                      value={votp.input4}
                                      name="input4"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                className="btn btn-primary w-100"
                                data-bs-dismiss="modal"
                                onClick={verifyOtp}
                              >
                                Verify OTP
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="fw-bold text-primary">{data.number}</p>
                )}
              </div>

              <div className="submit-btn my-3">
                <button className="btn btn-danger w-100" onClick={saveChanges}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* User Image Section */}

          <div className="user-img">
            <div
              className="container"
              style={{ position: "relative", right: "207px" }}
            >
              <div className="img-box" style={{ position: "relative" }}>
                <img
                  src={
                    file
                      ? `http://139.59.47.49:4004/api/profile_image?profile_image=${file}`
                      : userImg
                  }
                  alt=""
                  style={{ width: "180px", height: "180px" }}
                  className="rounded-circle"
                />
                <div
                  className="camera"
                  style={{ position: "absolute", right: "7px", bottom: "10px" }}
                >
                  <i
                    className="bi bi-camera-fill h1 text-danger "
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></i>
                  <ul className="dropdown-menu">
                    <div className="image-upload me-1">
                      <label htmlFor="file">
                        <i className="bi bi-image-fill ms-2 h3">
                          {" "}
                          <span className="h3 ms-1">Gallery</span>
                        </i>
                      </label>
                      <input
                        id="file"
                        type="file"
                        name="file"
                        onChange={(e: any) => {
                          handleSubmit(e);
                        }}
                        className="me-2 d-none"
                      />
                    </div>
                    <button className="btn">
                      <li>
                        <i className="bi bi-camera2 h3 ">
                          <span className="h6 ms-1">Upload Photo</span>
                        </i>
                      </li>
                    </button>
                    <button
                      className="btn"
                      onClick={() => {
                        setFile("");
                      }}
                    >
                      <li>
                        <i className="bi bi-person-dash h5">
                          {" "}
                          <span className="h6 ">Remove Photo</span>
                        </i>
                      </li>
                    </button>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
