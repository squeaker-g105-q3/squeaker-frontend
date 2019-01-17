import React from 'react'
import { FaThumbsUp, FaPoop, FaSadCry, FaGrinSquint, FaHeart } from 'react-icons/fa'

const Reaction = (props) => {
  return (
    <div className="reactions p-2">
      {
        props.reactions.map(val =>
          <span id={val.id} key={val.id} className="reaction">
            { val.reaction === 'like' && <span className="text-primary"><FaThumbsUp /></span> }
            { val.reaction === 'poop' && <span className="text-poop"><FaPoop /></span> }
            { val.reaction === 'cry' && <span className="text-warning"><FaSadCry /></span> }
            { val.reaction === 'love' && <span className="text-danger"><FaHeart /></span> }
            { val.reaction === 'laugh' && <span className="text-warning"><FaGrinSquint /></span> }
          </span>
        )
      }
      &nbsp;<small>{props.reactions.length} reactions</small>
    </div>
  )
}

export default Reaction
