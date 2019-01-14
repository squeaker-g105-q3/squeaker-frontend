import React, { Component } from 'react'
import { FaSearch, FaUser, FaSignInAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default class Header extends Component {

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
          <div className="container">

            <a className="navbar-brand" href="/">Squeaker!</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse my-2">

              <form className="form-inline my-lg-0 m-auto">
                <input className="form-control mr-sm-2" type="search" placeholder="Search..." aria-label="Search" />
                <button className="btn btn-success my-2 my-sm-0" type="submit"><FaSearch /></button>
              </form>

              <Link className="btn text-white" to="/signup"><FaUser />&nbsp; Sign up </Link>
              <Link className="btn text-white" to="/"><FaSignInAlt />&nbsp; Sign in</Link>

            </div>
          </div>
        </nav>
      </header>
    )
  }
}