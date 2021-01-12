import React from "react";

const ErrorScreen = (err) => {
  return (
    <div style={{width: `100%`, height: `100vh`, background: `rgb(0, 0, 0)`}}>
      <div style={{background: `rgb(0, 0, 0)`, margin: `0 auto`, width: `600px`, color: `white`, fontSize: `30px`, paddingTop: `20px`}}>Произошла ошибка при загрузке страницы</div>
      <p style={{background: `rgb(0, 0, 0)`, margin: `0 auto`, width: `500px`, color: `white`, paddingTop: `50px`}}>Попробуйте позже...</p>
      <p style={{background: `rgb(0, 0, 0)`, margin: `0 auto`, width: `500px`, color: `white`, paddingTop: `50px`}}>{err.toString()}</p>
    </div>
  );
};

export default ErrorScreen;
