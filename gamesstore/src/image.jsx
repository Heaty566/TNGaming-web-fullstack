import React, { Component } from "react";
import { getAll } from "./server";

class Image extends Component {
    state = {
        images: []
    };

    async componentDidMount() {
        const images = await getAll();

        this.setState({ images });
    }

    render() {
        const { images } = this.state;
        console.log(images);
        return (
            <div className="background">
                {images.map(image => {
                    return <img src={process.env.PUBLIC_URL + image} key={image} alt="tt" />;
                })}
            </div>
        );
    }
}

export default Image;
