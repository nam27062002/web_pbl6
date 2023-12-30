import React, { useEffect, useState } from "react";
import "./style.css";

const Verify = ({ verify }) => {
  const [isShow, setIsShow] = useState(false);
  const [photoVerify, setPhotoVerify] = useState(verify);

  const handleBorder = (status) => {
    if (status.includes("Approved")) {
      return "border-approved";
    } else if (status.includes("Deny")) {
      return "border-deny";
    } else if (status.includes("Pending")) {
      return "border-pendding";
    }
    return "";
  };

  useEffect(() => {
    setPhotoVerify(verify);
  }, []);

  return (
    <>
      <div
        className="container_accordion shadow pb-4 my-2 text-light"
        id="accordionExample">
        <div className="">
          <h2 className="accordion-header " id="headingOne">
            <button
              className="accordion-button p-4 "
              type="button"
              onClick={() => {
                setIsShow(isShow ? false : true);
              }}
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne">
              {photoVerify.typeVerify}
            </button>
          </h2>
          <div
            id="collapseOne"
            className={`accordion-collapse collapse ${isShow ? "show" : ""}`}>
            {photoVerify.items.map((item) => (
              <>
                <div className="accordion-body p-4 underline container_body">
                  <img
                    src={item.image ? item.image : "./images/avatar/avt.png"}
                    alt=""
                    className={`image-verify ${handleBorder(item.status)} `}
                  />
                  <div className="mx-4">
                    <h3>{item.type}</h3>
                    <span>{item.status}</span>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify;
