"use client";

import { useState, useEffect } from "react";

export default function Restaurant() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    console.log(data);
    setData(data);
  }
  if (data == undefined) {
    return <div>loading.....</div>;
  }
  return (
    <div>
      <h1>Todo Page</h1>
      {data.map((resObj) => {
        return <TodoCom key={resObj.id} prop={resObj} />;
      })}
    </div>
  );
}

const TodoCom = ({ prop }) => {
  const { userId, id, title, completed } = prop;
  return (
    <div
      style={{
        backgroundColor: "beige",
        border: "1px solid black",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div>{userId}</div>
      <div>{id}</div>
      <div>{title}</div>
      <div>{completed}</div>
    </div>
  );
};
