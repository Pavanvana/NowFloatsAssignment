import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {initializeApp} from 'firebase/app'

import {getStorage, ref, listAll, getDownloadURL} from 'firebase/storage'

import Header from '../Header'
import MyProfileDetails from '../MyProfileDetails'

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

class MyProfile extends Component {
  state = {
    imageList: [],
    apiStatus: apiStatusConstants.initial,
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

  onRenderSuccessView = () => {
    const {imageList} = this.state
    return (
      <ul>
        <MyProfileDetails imageList={imageList} my="my" />
      </ul>
    )
  }

  onClickTryAgain = () => {
    this.renderPosts()
  }

  renderFailureView = () => (
    <div className="failureView-container">
      <img
        src="https://res.cloudinary.com/daflxmokq/image/upload/v1677168503/Group_7522_eu9zld.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-msg">Something went wrong. Please try again</p>
      <button
        className="try-again-btn"
        type="button"
        onClick={this.onClickTryAgain}
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

  renderApiViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onRenderSuccessView()
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
        <Header />
        <div>{this.renderApiViews()}</div>
      </>
    )
  }
}

export default MyProfile
