import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    searchInput: '',
    postInput: '',
    postsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  renderApiPostStatusView = () => {
    const {postsData} = this.state
    console.log(postsData)
    return postsData.length === 0 ? (
      <p className="empty-post-heading">Empty Posts</p>
    ) : (
      <>
        <p className="empty-post-heading">Posts</p>
        <ul className="posts-container-view">
          {postsData.map(eachPost => (
            <li className="each-post-container" key={eachPost.id}>
              <p className="post">{eachPost.post}</p>
              <hr className="hr-line" />
              <div className="icons-container">
                <BsHeart className="react-image" />
                <FaRegComment className="react-image" />
                <BiShareAlt className="react-image" />
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  onChangePostInput = event => {
    this.setState({postInput: event.target.value})
  }

  addPost = () => {
    const {postInput, postsData} = this.state
    const newPost = {
      id: uuidV4(),
      post: postInput,
    }
    this.setState(prevState => ({
      postsData: [...prevState.postsData, newPost],
      postInput: '',
    }))
    console.log(newPost)
    console.log(postsData)
    localStorage.setItem('posts', [...newPost])
  }

  render() {
    const {postInput} = this.state
    return (
      <>
        <Header changeSearchInput={this.changeSearchInput} />
        <div className="home-container">
          <div className="add-post-container">
            <input
              type="input"
              className="add-post-input"
              onChange={this.onChangePostInput}
              value={postInput}
            />
            <button type="button" className="add-button" onClick={this.addPost}>
              Add Post
            </button>
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
