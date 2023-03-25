import { useEffect, useState } from "react";

export default function LinkContainer({content}) {
    const[text, setText] = useState(content)

    return (
        <div className="roomSlider">
            <div className="ChatRoomCard">
                <img className="topicIllustration" src="https://i.pinimg.com/474x/df/de/62/dfde62852f2c3bd7f16f77a4d4bbb3a4--taekwondo-girl-karate-girl.jpg" alt="The topic's illustration" />
                <div className="">WKF Karate</div>
            </div>
            <div className="ChatRoomCard">
                <img className="topicIllustration" src="https://i.pinimg.com/474x/df/de/62/dfde62852f2c3bd7f16f77a4d4bbb3a4--taekwondo-girl-karate-girl.jpg" alt="The topic's illustration" />
                <div className="">WKF Karate</div>
            </div>
        </div>
    )
}