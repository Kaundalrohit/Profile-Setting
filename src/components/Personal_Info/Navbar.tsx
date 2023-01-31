import axios from "axios";
import { useEffect, useState } from "react";
import userImg from "../Images/userImg.jpg";

type props = {
  file: string;
};

export default function Navbar({ file }: props) {
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    try {
      const getUserPeofile = async () => {
        let response = await axios.get("http://139.59.47.49:4004/api/profile", {
          headers: {
            Authorization: "" + localStorage.getItem("token"),
          },
        });
        setUserName(response.data.profile.first_name);
      };
      getUserPeofile();
    } catch {
      console.log("error");
    }
  }, []);
  return (
    <>
      <div className="container-fluid shadow ">
        <div className="px-3 py-2 ">
          <div className="container ">
            <div className=" d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <div className="logo d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                <img
                  src="https://source.unsplash.com/45x45/?art"
                  className="rounded-circle"
                  alt=""
                />
              </div>

              <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                <li>
                  <div className="user d-flex border bg-white  rounded-2 bg-white px-3 py-1 ">
                    <div className="user-img">
                      <img
                        src={
                          file
                            ? `http://139.59.47.49:4004/api/profile_image?profile_image=${file}`
                            : userImg
                        }
                        alt=""
                        className="rounded-circle"
                        style={{ width: "45px", height: "45px" }}
                      />
                    </div>
                    <div className="user-name align-items-center ms-3">
                      <h4 className="align-items-center mt-2 text-black">
                        {userName ? `${userName} 😎` : "User Name"}
                      </h4>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
