import './index.css'

import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch, FaUpload} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {BsXCircleFill} from 'react-icons/bs'
import {GrFormClose} from 'react-icons/gr'
import {BiArrowBack} from 'react-icons/bi'
import Popup from 'reactjs-popup'

import {initializeApp} from 'firebase/app'

import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'

import {v4} from 'uuid'

const app = initializeApp({
  apiKey: 'AIzaSyAo24XnwE3FZ-wEebWBHcybexTFpy1T7JQ',
  authDomain: 'social-media-app-2cf9d.firebaseapp.com',
  projectId: 'social-media-app-2cf9d',
  storageBucket: 'social-media-app-2cf9d.appspot.com',
  messagingSenderId: '964270741596',
  appId: '1:964270741596:web:a3451385762a32933f2e99',
  measurementId: 'G-6JY770YEYF',
})

const storage = getStorage(app)

class Header extends Component {
  state = {
    hamburgerClicked: false,
    searchInput: '',
    image: '',
    comment: '',
    uploaded: false,
    selectedFile: null,
    imageList: [],
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

  fileSelectHandler = event => {
    const selectedFile = event.target.files[0]
    this.setState({selectedFile: event.target.files[0]})
    const formData = new FormData()
    formData.append('image', selectedFile, selectedFile.name)
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => this.setState({image: data.files.image, uploaded: true}))
      .catch(e => console.log(e))
  }

  onClickShareBtn = () => {
    const {selectedFile} = this.state
    if (selectedFile === null) return
    const imageRef = ref(storage, `images/${selectedFile.name + v4()}`)
    uploadBytes(imageRef, selectedFile).then(snapshot => {
      alert('image uploaded')
      window.location.reload(false)

      getDownloadURL(snapshot.ref).then(url => {
        this.setState(prevState => ({
          imageList: [...prevState.imageList, url],
        }))
      })
    })
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {hamburgerClicked, searchInput, uploaded, image, comment} = this.state
    return (
      <>
        <nav className="nav-container">
          <div className="header-container">
            <Link to="/" className="logo-link">
              <div className="logo-container">
                <img
                  className="app-logo"
                  src="https://adventuresindbad.com/wp-content/uploads/2018/06/2475.new-instagram-text-logo.png"
                  alt="logo"
                />
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
                <Popup
                  modal
                  trigger={
                    <button className="create-pop-btn" type="button">
                      Create
                    </button>
                  }
                  className="popup-content"
                  position="right center"
                >
                  {close => (
                    <>
                      <div className="model">
                        <div className="overlay">
                          <div className="modal-container">
                            <div className="heading-container">
                              <button type="button" className="close-btn">
                                <BiArrowBack size="20" />
                              </button>
                              <h1 className="pop-heading">Create new post</h1>
                              <button
                                className="close-btn"
                                type="button"
                                onClick={() => close()}
                              >
                                <GrFormClose size="20" />
                              </button>
                            </div>
                            <hr className="hr-line" />
                            {uploaded ? (
                              <div className="uploaded-container">
                                <img
                                  className="uploaded-img"
                                  src={image}
                                  alt="post"
                                />
                                <div className="caption-container">
                                  <div className="profile-logo-name">
                                    <img
                                      className="profile-pic"
                                      src="https://i.pinimg.com/originals/25/78/61/25786134576ce0344893b33a051160b1.jpg"
                                      alt="profile-pic"
                                    />
                                    <p>user_name</p>
                                  </div>
                                  <textarea
                                    onChange={this.onChangeComment}
                                    className="textarea"
                                    placeholder="Write a caption..."
                                    cols="37"
                                    rows="15"
                                    value={comment}
                                  />
                                  <button
                                    onClick={this.onClickShareBtn}
                                    className="share-button"
                                    type="button"
                                  >
                                    Share
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="inner-container">
                                <FaUpload size="50" />
                                <p className="pop-dec">
                                  Drag photos and videos here
                                </p>
                                <div>
                                  <input
                                    style={{display: 'none'}}
                                    type="file"
                                    onChange={this.fileSelectHandler}
                                    ref={selectInput => {
                                      this.selectInput = selectInput
                                    }}
                                  />
                                  <button
                                    className="selectFile-button"
                                    type="button"
                                    onClick={() => this.selectInput.click()}
                                  >
                                    Select From Computer
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </Popup>
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
