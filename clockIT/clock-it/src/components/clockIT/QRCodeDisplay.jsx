import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeDisplay = ({ value, action }) => {
  const RED = '#ff0000';
  const GREEN = '#008000';
  return (
    <div id="QR">
      {value ? <QRCodeCanvas bgColor={(action == 'I') ? GREEN : RED } value={value} /> : <></>}
    </div>
  );
};

export default QRCodeDisplay;
