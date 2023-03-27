import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import {initializeApp} from 'firebase/app'

import {getStorage, ref, listAll, getDownloadURL} from 'firebase/storage'

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

class Stories extends Component {
  state = {
    storiesData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getStories()
  }

  getStories = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    listAll(imagesListRef).then(response => {
      response.items.forEach(item => {
        getDownloadURL(item).then(url => {
          this.setState(prevState => ({
            storiesData: [...prevState.storiesData, url],
            apiStatus: apiStatusConstants.success,
          }))
        })
      })
    })
  }

  onGetSuccessView = () => {
    const {storiesData} = this.state
    const settings = {
      dots: false,
      slidesToShow: 8,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <Slider {...settings}>
        {storiesData.map(eachStory => (
          <li className="slick-item" key={eachStory.id}>
            <img className="logo-image" src={eachStory} alt="user story" />
            <p className="story-user-name">User_Name</p>
          </li>
        ))}
      </Slider>
    )
  }

  onGetLoadingView = () => (
    <div className="loader-container1" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={30} width={30} />
    </div>
  )

  onRetry = () => {
    this.setState({apiStatus: apiStatusConstants.inProgress}, this.getStories)
  }

  onGetFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dq7imhrvo/image/upload/v1643651534/insta%20Shere%20clone/alert-triangle_hczx0o.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-head">Something went wrong. Please try again</p>
      <button className="failure-button" type="button" onClick={this.onRetry}>
        Try again
      </button>
    </div>
  )

  renderStoriesView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onGetSuccessView()
      case apiStatusConstants.inProgress:
        return this.onGetLoadingView()
      case apiStatusConstants.failure:
        return this.onGetFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div>{this.renderStoriesView()}</div>
      </>
    )
  }
}
export default Stories
