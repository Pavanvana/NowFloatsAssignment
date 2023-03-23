import './index.css'

import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {BsXCircleFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

class Header extends Component {
  state = {
    hamburgerClicked: false,
    searchInput: '',
  }

  onClickLogout = () => {
    const {history} = this.props
    history.replace('/login')
  }

  onClickHamburgerIcon = () => {
    this.setState(prevState => ({
      hamburgerClicked: !prevState.hamburgerClicked,
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchInput = () => {
    const {searchInput} = this.state
    const {changeSearchInput} = this.props
    changeSearchInput(searchInput)
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      const {searchInput} = this.state
      const {changeSearchInput} = this.props
      changeSearchInput(searchInput)
    }
  }

  render() {
    const {hamburgerClicked, searchInput} = this.state
    return (
      <>
        <nav className="nav-container">
          <div className="header-container">
            <Link to="/" className="logo-link">
              <div className="logo-container">
                <h1 className="logo-heading">Social Media</h1>
              </div>
            </Link>
            <button
              type="button"
              className="hamburger-icon"
              onClick={this.onClickHamburgerIcon}
            >
              <GiHamburgerMenu />
            </button>
            <div className="right-container">
              <div className="search-caption-container">
                <input
                  type="search"
                  placeholder="Search Caption"
                  className="search-caption-input"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                  onKeyDown={this.onEnterSearchInput}
                />
                <button
                  type="button"
                  className="search-icon"
                  data-testid="searchIcon"
                  onClick={this.onClickSearchInput}
                >
                  <FaSearch size="15" />
                </button>
              </div>
              <ul className="list-items-container">
                <li className="list-item">
                  <Link to="/" className="link">
                    Home
                  </Link>
                </li>
                <li className="list-item">
                  <Link to="/my-profile" className="link">
                    Profile
                  </Link>
                </li>
              </ul>
              <button
                className="button"
                type="button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
          {hamburgerClicked && (
            <div className="components">
              <ul className="list-items-container">
                <li className="list-item">
                  <Link to="/" className="link">
                    Home
                  </Link>
                </li>
                <li className="list-item">
                  <Link to="/search" className="link">
                    Search
                  </Link>
                </li>
                <li className="list-item">
                  <Link to="/my-profile" className="link">
                    Profile
                  </Link>
                </li>
              </ul>
              <button
                className="button"
                type="button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
              <button
                type="button"
                className="hamburger-icon"
                onClick={this.onClickHamburgerIcon}
              >
                <BsXCircleFill />
              </button>
            </div>
          )}
        </nav>
      </>
    )
  }
}
export default withRouter(Header)
