import React from "react";
import "./TextContainer.css";

const TextContainer = ({ users }) => (
  <div>
    <div className="card">
      <div className="card-header">
        <div className="d-flex w-100 justify-content-between">
          <h5> Users: </h5>
          <h5 className="mb-1"><i className="fas fa-plug"></i> {users.length}</h5>
        </div>
      </div>
      <div className="card-body userNames">
        {users ? (
          <div>
            <div className="row row-cols-1 row-cols-md-4">
              {users.map(({ nickName }, i) => (
                <h6 className="btn btn-default" key={i}>
                  <i className="fas fa-plug mr-2"></i>
                  {nickName}
                </h6>
              ))}
            </div>
          </div>
        ) : (
          <h6>People not currently chatting.</h6>
        )}
      </div>
    </div>
  </div>
);

export default TextContainer;
