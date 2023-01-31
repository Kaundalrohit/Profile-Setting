import Footer from "./Footer";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

type props = {
  file: string;
};

export default function NotificationComponent({ file }: props) {
  const handleChange = () => {
    Notification.requestPermission().then((r: any) => {});
  };
  return (
    <>
      <Navbar file={file} />
      <div className="container">
        <div className="heading text-start my-4">
          <Link to="/profilesetting" className="text-decoration-none">
            My Account
          </Link>
          <i className="bi bi-caret-right-fill mx-2"></i>
          <span>Notification Settings</span>
          <div className="notification d-flex">
            <h3 className="fw-bold my-4">Notification Settings</h3>
            <div className="form-check form-switch mt-4 ms-5">
              <input
                className="form-check-input h4"
                onChange={handleChange}
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "200px" }}>
        <Footer />
      </div>
    </>
  );
}
