import { calculateLikeCount } from '../hooks'

export default function ReactionBox() {
    //stuff
    return (
        <div className="r_box">
            {calculateLikeCount}
        </div>
    )
}