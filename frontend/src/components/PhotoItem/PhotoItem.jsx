// CSS
import "./PhotoItem.css"

import { images } from "../../utils/config"

import { NavLink } from "react-router-dom"

const PhotoItem = ({ photo }) => {
  return (
    photo && (
      <div className="photo_item">
        <NavLink to={photo._id && `photo/${photo._id}`}>
          <h1 className="title_photo" >{photo.title}</h1>
        </NavLink>

        {photo.image && (
          <img className="post_image" src={`${images}/photos/${photo.image}`} alt={photo.title} />
        )}
      </div>
    )
  )
}

export default PhotoItem
