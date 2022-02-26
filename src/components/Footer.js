import React from "react"
import Fade from "react-reveal/Fade"

const Footer = () => {
  return (
    <div className="section" id="contact">
      <div className="container">
        <div className="footer-container">
          <Fade bottom cascade>
            <h1>Contact</h1>
            <h2>Let's create your next experience together</h2>
          </Fade>
          <a className="email-link" href={`mailto:${"mathis.vialle@epitech.eu"}`}>
            mathis.vialle@epitech.eu
          </a>
          <span>
            Made With ❤ by{" Mathis Vialle"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer
