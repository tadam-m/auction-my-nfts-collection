import React from "react"

const Navbar = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="navbar-wrapper">
          <div
            role="button"
            className="name"
            tabIndex={0}
          >
            NFTs Collection
          </div>
          <div className="links-wrapper">
            <button>Bid NFTs</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar