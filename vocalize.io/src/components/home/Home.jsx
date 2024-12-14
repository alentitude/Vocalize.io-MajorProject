import React from "react";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of the application.</p>
      <button onClick={() => alert("Button Clicked!")}>Click Me</button>
    </div>
  );
}
export default Home;
