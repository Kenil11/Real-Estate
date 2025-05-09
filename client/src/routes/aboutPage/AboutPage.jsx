import "./aboutPage.scss";

function AboutPage() {
  return (
    <div className="aboutPage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">About Us</h1>
          <p>
            At RealEstate, we are passionate about helping people find their dream
            properties. With over 16 years of experience in the real estate industry,
            our mission is to make property search effortless and trustworthy.
          </p>
          <p>
            Our platform connects buyers, sellers, and agents seamlessly, offering
            a transparent and modern way to handle real estate deals.
          </p>
          <div className="stats">
            <div className="box">
              <h1>500+</h1>
              <h2>Happy Clients</h2>
            </div>
            <div className="box">
              <h1>100+</h1>
              <h2>Professional Agents</h2>
            </div>
            <div className="box">
              <h1>50+</h1>
              <h2>Offices Worldwide</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="About Us" />
      </div>
    </div>
  );
}

export default AboutPage;
