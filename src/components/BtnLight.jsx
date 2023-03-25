import { useEffect, useState } from "react";

export default function BtnLight({content}, ) {
    const[text, setText] = useState(content)

    return (
        <div className="buttonLight">
            {text}
        </div>
    )
}