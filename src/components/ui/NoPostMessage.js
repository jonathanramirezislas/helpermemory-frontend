import React from 'react';
import img from '../../assets/no_data.sgv';
import '../../styles/styles.css';

 const NoPosts=({ text })=> {
    return (
        <div className="no-posts-component">
            <div className="post-image-container">
                <object type="image/svg+xml" data={img}>
                    Error loading svg 
                </object>
                <p>{ text }</p>
            </div>
        </div>
    )
}
export default NoPosts;