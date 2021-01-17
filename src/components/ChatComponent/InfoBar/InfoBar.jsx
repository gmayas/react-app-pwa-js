import React from 'react';

import './InfoBar.css';

const InfoBar = ({ dataIn }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h5>Welcome to chat: {dataIn}</h5>
    </div>
  </div>
);

export default InfoBar;