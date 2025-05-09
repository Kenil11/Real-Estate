import "./contactPage.scss";

function ContactPage() {
  return (
    <div className="contactPage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Contact Us</h1>
          <p>
            Have questions or need help finding a property? Get in touch with us!
            Our friendly support team is here to assist you.
          </p>
          <form className="contactForm">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea rows="5" placeholder="Your Message" required />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Contact Us" />
      </div>
    </div>
  );
}

export default ContactPage;
