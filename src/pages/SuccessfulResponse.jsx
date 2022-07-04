import React from "react";
import '../components/styles/MyLabel.css'
import '../components/styles/MyDiv.css'


function SuccessfulResponse() {

    return (
        <div className="main">
            <div className="myDiv">
                <label className="myLabel">
                    <h3>Thank you!</h3>
                    <h4>Your response was saved.</h4>
                </label>
            </div>
        </div >
    )
}

export default SuccessfulResponse;
