import React from 'react';
import '../styles/homeDetail.css';

const HomeDetail = (props) => {
  return(
    <div className="detail-wrapper">
      <div className="detail-first-line">
        <span>{props.type.toUpperCase()} &middot; </span><span>{props.location.toUpperCase()}</span>
      </div>
      <div className="detail-title">{props.title}</div>
      <div className="detail-cost">${props.cost}/night</div>
      <div className="detail-last-line">
        <span className="detail-star">&#9733;</span ><span className="detail-rating">{props.rating}</span><span className="detail-reviews">({props.reviews})</span>
      </div>
    </div>

  )
};

export default HomeDetail;
