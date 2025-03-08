import React from 'react';

const TestBox = () => {
  return (
    <div
      style={{
        columnCount: 3,
        columnGap: "10px",
      }}
    >
      <div style={{ background: "lightblue", marginBottom: "10px", height: "100px" }}></div>
      <div style={{ background: "lightgreen", marginBottom: "10px", height: "150px" }}></div>
      <div style={{ background: "lightcoral", marginBottom: "10px", height: "200px" }}></div>
      <div style={{ background: "lightgoldenrodyellow", marginBottom: "10px", height: "250px" }}></div>
      <div style={{ background: "lightpink", marginBottom: "10px", height: "300px" }}></div>
      <div style={{ background: "lightgray", marginBottom: "10px", height: "120px" }}></div>
    </div>
  );
};

export default TestBox;