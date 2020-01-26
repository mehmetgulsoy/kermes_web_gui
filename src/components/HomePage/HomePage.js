import React, { Fragment } from "react";
import "./home.css";

const HomePage = () => {
  return (
    <div id="homepage">
      <header>
        <h1>Kermes</h1>
      </header>
      <nav>
        <h2>nav</h2>
        <ul>
          <li>item</li>
          <li>item</li>
          <li>item</li>
        </ul>
      </nav>
      <main>
        <h2>main</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
          tempora totam temporibus sint. Consequatur, laborum nisi
          necessitatibus deserunt ad recusandae voluptas maiores molestiae
          eveniet tenetur, facere quisquam quidem quia rerum! Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. Accusamus suscipit nisi
          tempora reprehenderit eaque enim cupiditate explicabo deserunt aliquam
          officiis rerum sapiente aperiam voluptate laborum, a ex, voluptates
          debitis beatae.
        </p>
      </main>
      <footer>
        <h2>footer</h2>
      </footer>
    </div>
  );
};

export default HomePage;
