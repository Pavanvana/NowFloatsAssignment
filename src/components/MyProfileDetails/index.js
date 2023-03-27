import './index.css'

import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

const UserProfileDetails = props => {
  const {imageList} = props

  const renderStories = () => (
    <ul className="stories-container-in-profile">
      {imageList.map(eachStory => (
        <li className="each-story" key={eachStory.id}>
          <img className="story-img" src={eachStory} alt="my story" />
        </li>
      ))}
    </ul>
  )

  const renderPosts = () => (
    <div className="posts-container-in-profile">
      <div className="posts-heading-container">
        <BsGrid3X3 size="17" />
        <h1 className="posts-heading">Posts</h1>
      </div>
      {imageList.length !== 0 ? (
        <ul className="posts-img-container">
          {imageList.map(eachPost => (
            <li className="each-post-item" key={eachPost.id}>
              <img className="each-post-image" src={eachPost} alt="my post" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-posts-container">
          <div className="icon-container">
            <BiCamera size="30" />
            <h1 className="no-posts">No Posts</h1>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <>
      <li className="user-profile-container">
        <div className="my-profile">
          <div className="profile-container-in-profile">
            <h1 className="user-name-in-sm-profile">Pavan</h1>
            <div className="user-bio-container">
              <img
                className="profile-pic-in-profile"
                src="https://i.pinimg.com/originals/25/78/61/25786134576ce0344893b33a051160b1.jpg"
                alt="my profile"
              />
              <div className="bio-text-container">
                <h1 className="user-name-in-lg-profile">Pavan</h1>
                <div className="followers-and-following-container">
                  <p className="following">
                    <span className="number-count">{imageList.length}</span>{' '}
                    posts
                  </p>
                  <p className="following">
                    <span className="number-count">405</span> followers
                  </p>
                  <p className="following">
                    <span className="number-count">50</span> following
                  </p>
                </div>
                <p className="user-id">User_Id</p>
                <p className="user-bio">User_Bio</p>
              </div>
            </div>
          </div>
          {renderStories()}
          <hr className="hr-line" />
          {renderPosts()}
        </div>
      </li>
    </>
  )
}
export default UserProfileDetails
