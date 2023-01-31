import { Link } from "react-router-dom";
import logo from "../Images/verfied.png";

export default function Phoneverified() {
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
                <div className="confirm-number-heading h2 my-4">
                  Welcome User Account Created Successfully!😁
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
