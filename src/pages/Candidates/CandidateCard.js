const CandidateCard = ({name, avatar, onVote}) => {
    return(
        <div className="candidate-card">
            <div className="card-body">
                <img className="candidate-avatar" src={avatar} alt="Candidate" />
                <h3 className='candidate-name'>{name}</h3>
            </div>
            <button className='submit-vote-btn btn' onClick={onVote}>Submit Vote</button>
        </div>
    )
}

export default CandidateCard;