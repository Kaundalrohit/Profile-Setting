import Home from "./Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signupwithphone from "./Signupwithphone/Signupwithphone";
import Signin from "./SignIn/Signin";
import Signup from "./Signup/Signup";
import Otp from "./Otp/Otp";
import { useState } from "react";
import Updatepass from "./Updatepassword/Updatepass";
import Phoneverified from "./Verified/Phoneverified";
import Welcomeuser from "./Verified/Welcomeuser";
import Accountcreated from "./Verified/Accountcreated";
import Resetpass from "./Updatepassword/Resetpass";
import Profilesetting from "./Personal_Info/Profilesetting";
import Personalinfo from "./Personal_Info/Personalinfo";
import Changepass from "./Personal_Info/Changepass";
import NotificationComponent from "./Personal_Info/Notification";

export default function Components() {
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [changedName, setChangedName] = useState<string>("");
  const [file, setFile] = useState<any>(null);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Signupwithphone"
            element={
              <Signupwithphone
                phoneValue={phoneValue}
                setPhoneValue={setPhoneValue}
              />
            }
          />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route
            path="/otp"
            element={
              <Otp phoneValue={phoneValue} setPhoneValue={setPhoneValue} />
            }
          />
          <Route path="/updatePass" element={<Updatepass />} />
          <Route path="/resetpass" element={<Resetpass />} />
          <Route path="/phoneverified" element={<Phoneverified />} />
          <Route path="/welcomeuser" element={<Welcomeuser />} />
          <Route path="/accountcreated" element={<Accountcreated />} />
          <Route
            path="/profilesetting"
            element={<Profilesetting file={file} />}
          />
          <Route
            path="/Personalinfo"
            element={
              <Personalinfo
                changedName={changedName}
                setChangedName={setChangedName}
                file={file}
                setFile={setFile}
              />
            }
          />
          <Route path="/Changepass" element={<Changepass file={file} />} />
          <Route
            path="/Notification"
            element={<NotificationComponent file={file} />}
          />
        </Routes>
      </Router>
    </>
  );
}
