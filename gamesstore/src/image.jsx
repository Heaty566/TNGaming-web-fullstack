import React, { Component } from "react";

class Image extends Component {
    render() {
        return (
            <div className="background">
                <img src={process.env.PUBLIC_URL + "background.jpg"} key="background" alt="tt" />;
            </div>
        );
    }
}

export default Image;
