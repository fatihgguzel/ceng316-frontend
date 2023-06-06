const VoteSuccessModal = ({ isOpen, onContinue, candidateName }) => {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="vote-modal-overlay">
        <div className="vote-modal">
          <h2>Your vote for <span style={{ color: "red" }}>{candidateName}</span> has been registered successfully!</h2>
          <div className="vote-modal-buttons">
            <button className="continue-btn btn" onClick={onContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default VoteSuccessModal;
  