import React from 'react';
import '../../styles/styles.css';

 const NoPosts=({ text })=> {
    return (
        <div className="no-posts-component">
            <div className="post-image-container">
            <img src={"https://res.cloudinary.com/djuqxjkh3/image/upload/v1615935857/helper%20memory/undraw_No_data_re_kwbl_vcpyrq.svg"}/>,
                <p>{ text }</p>
            </div>
        </div>
    )
}
export default NoPosts;

//            <img src={"https://res.cloudinary.com/djuqxjkh3/image/upload/v1615935857/helper%20memory/undraw_No_data_re_kwbl_vcpyrq.svg"}/>,
