import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <>
      <div className="contact">
        <div className="container">
          <form className="contact-form">
            <h1>Contact Us</h1>
            <div className="name-email">
              <input type="text" name="name" placeholder="Full Name" />

              <input type="email" name="name" placeholder="Email" />
            </div>

            <div className="message">
              <input type="text" name="subject" placeholder="Subject" />

              <textarea type="text" name="message" placeholder="Message" />
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
