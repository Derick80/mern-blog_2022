
type Props = {
    comments: Comment[]
}

const Comments = ({ comments }: Props) => {
    if (!comments) {
        return
        (<></>)
    }
    else {
        return (<>
            <ul>
                {comments.map(({ id, content, author, createdAt }) =>
                    <li key={id}>
                        <p>   {content}   </p>
                    </li>
                )}
            </ul>
        </>)
    }
}

export default Comments