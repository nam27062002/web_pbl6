import React, { useEffect, useState } from "react";
import "./style.css";
import util from "../../../../../../util";
const Verify = ({ verify }) => {
  const [isShow, setIsShow] = useState(false);
  const [photoVerify, setPhotoVerify] = useState(verify);

  const handleBorder = (status, image) => {
    if (!image) {
      return "border-not-upload";
    }
    if (status.includes("Approved")) {
      return "border-approved";
    } else if (status.includes("Denied")) {
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
        className="container_accordion shadow my-2 text-light"
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
                <div className="accordion-body p-4 border-top container_body">
                  <img
                    src={item.image ? item.image : "./images/avatar/no-image.png"}
                    alt=""
                    className={`image-verify ${handleBorder(item.status,item.image)} `}
                  />
                  <div className="mx-4">
                    <h3>{item.type}</h3>
                    <span>{item.image?item.status:"Not upload"}</span>
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
