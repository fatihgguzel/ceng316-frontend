import React from "react";

const SubmitVoteModal = ({ isOpen, onVote, onCancel, candidateName }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="vote-modal-overlay">
      <div className="vote-modal">
        <h2>
          Are you sure you want to vote for{" "}
          <span style={{ color: "red" }}>{candidateName}</span>?
        </h2>
        <div className="vote-modal-buttons">
          <button className="vote-btn btn" onClick={onVote}>Vote</button>
          <button className="cancel-btn btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SubmitVoteModal;
