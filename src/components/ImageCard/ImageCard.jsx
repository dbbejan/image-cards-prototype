import React from 'react';
import PropTypes from 'prop-types';
import './ImageCard.scss';

export class ImageCard extends React.Component {
    constructor(props) {
        super(props);
        this.imgRef = React.createRef();
        this.authorRef = React.createRef();
    }

    componentDidMount() {
        const image = new Image();
        image.src = this.props.item.download_url;
        image.onload = () => {
            const { item: { download_url, author } } = this.props;
            this.imgRef.current.setAttribute(
                'src',
                download_url
            );
            this.imgRef.current.parentNode.classList.remove("skeleton");
            this.authorRef.current.innerText = author;
        }
    }

    render() {
        return <div className="image-card-wrapper skeleton" >
            <img ref={this.imgRef} className="image" alt="" />
            <div ref={this.authorRef} className="author" />
        </div>
    }

}

ImageCard.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        author: PropTypes.string.isRequired,
        download_url: PropTypes.string.isRequired
    }).isRequired
}

export default ImageCard;