import avatar from '../../assets/candidate.png';

const CandidateCard = ({name, id, onVoteClick, isVoteDisabled, votedCandidateId}) => {
    const cardClass = id === votedCandidateId ? "voted-candidate-card" : "";

    return(
        <div className={`candidate-card ${cardClass}`}>
            <div className="card-body">
                <img className="candidate-avatar" src={avatar} alt="Candidate" />
                <h3 className='candidate-name'>{name}</h3>
            </div>
            {!isVoteDisabled && <button className='submit-vote-btn btn' onClick={onVoteClick}>Submit Vote</button>}
        </div>
    )
}

export default CandidateCard;