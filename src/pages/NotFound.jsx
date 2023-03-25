import { Link } from "react-router-dom"
import bruh from '../assets/icons/branchCut.jpg'


export default function NotFound() {
    return(
        <div className="NotFound">
            <img className="imgOwnBranch" src={bruh} alt="Guy cutting his own branch"/>
            <div className="NFBigText">404</div>
            <div className="nothingToSee">Nothing to see here</div>
            <Link className="HomeButton" to="/">Get Back Home</Link>
        </div>
        

    )
}