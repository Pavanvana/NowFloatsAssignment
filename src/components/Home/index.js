import {Component} from 'react'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import Loader from 'react-loader-spinner'

import './index.css'

import {initializeApp} from 'firebase/app'

import {getStorage, ref, listAll, getDownloadURL} from 'firebase/storage'

import Header from '../Header'
import Stories from '../Stories'

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
const imagesListRef = ref(storage, 'images/')

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    imageList: [],
    apiStatus: apiStatusConstants.initial,
    likeStatus: false,
  }

  componentDidMount = () => {
    this.renderPosts()
  }

  renderPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    listAll(imagesListRef).then(response => {
      response.items.forEach(item => {
        getDownloadURL(item).then(url => {
          this.setState(prevState => ({
            imageList: [...prevState.imageList, url],
            apiStatus: apiStatusConstants.success,
          }))
        })
      })
    })
  }

  unLikeIcon = () => {
    this.setState(prev => ({likeStatus: !prev.likeStatus}))
  }

  likeIcon = () => {
    this.setState(prev => ({likeStatus: !prev.likeStatus}))
  }

  renderSuccessView = () => {
    const {imageList, likeStatus} = this.state
    return imageList.length === 0 ? (
      <p className="empty-post-heading">Empty Posts</p>
    ) : (
      <>
        <p className="posts-heading">Posts</p>
        <ul className="posts-container-view">
          {imageList.map(eachPost => (
            <li className="each-post-container" key={eachPost.id}>
              <div className="each-profile-logo-image">
                <div className="image-circle">
                  <img
                    className="profile-pic-p"
                    src="https://i.pinimg.com/originals/25/78/61/25786134576ce0344893b33a051160b1.jpg"
                    alt="profile-pic"
                  />
                </div>
                <p className="username-p">user_name</p>
              </div>
              <img className="post-img" src={eachPost} alt="post" />
              <div className="icons-container">
                {likeStatus ? (
                  <button
                    className="button-reacts"
                    data-testid="unLikeIcon"
                    type="button"
                    onClick={this.unLikeIcon}
                  >
                    <FcLike size="23" className="like-heart" />
                  </button>
                ) : (
                  <button
                    className="button-reacts"
                    data-testid="likeIcon"
                    type="button"
                    onClick={this.likeIcon}
                  >
                    <BsHeart size="20" className="like-heart" />
                  </button>
                )}
                <button className="button-reacts" type="button">
                  <FaRegComment className="react-image" />
                </button>
                <button className="button-reacts" type="button">
                  <BiShareAlt className="react-image" />
                </button>
              </div>
              <p className="likes">14 likes</p>
              <p className="caption">Caption </p>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/daflxmokq/image/upload/v1677128965/alert-triangle_yavvbl.png"
        alt="failure view"
        className="failure view"
      />
      <p className="alert-msg">Something went wrong. Please try again</p>
      <button
        className="tryagain-btn"
        type="button"
        onClick={this.onClickReTry}
      >
        Try again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderApiPostStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header changeSearchInput={this.changeSearchInput} />
        <div className="home-container">
          <div className="stories-container">
            <Stories />
          </div>
          <div className="posts-container">
            {this.renderApiPostStatusView()}
          </div>
        </div>
      </>
    )
  }
}
export default Home
