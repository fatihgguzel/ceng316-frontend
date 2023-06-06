import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Sidebar from "../../components/sidebar/SideBar";
import { roleActionArray } from "../../db_mock/IOES_db";
import { UserContext } from "../../Providers/context";
import CandidateCard from "./CandidateCard";
import SubmitVoteModal from "./SubmitVoteModal";
import "./Candidates.css";
import api from "../../Providers/api";
import VoteSuccessModal from "./VoteSuccessModal";

export default function Candidates() {
  const { user } = useContext(UserContext);

  const navigation = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidateName, setSelectedCandidateName] = useState(null);
  const [isActiveElection, setIsActiveElection] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVoteSuccessful, setIsVoteSuccessful] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [hasUserVoted, setHasUserVoted] = useState(true);
  const [electionId, setElectionId] = useState(null);
  const [votedCandidateId, setVotedCandidateId] = useState(null);

  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        const res = await api.get(
          `/student/active-election-department/${user.departmentID}`
        );
        if (res.data.length > 0) {
          setIsActiveElection(true);
          setElectionId(res.data[0].id);
        }
      } catch (error) {
        alert(error.res.data.message);
      }
    };

    const fetchCandidatesData = async () => {
      try {
        const res = await api.get(
          `/candidate/?departmentId=${user.departmentID}&status=approved`
        );
        const filteredCandidates = res.data.map((candidate) => ({
          name: candidate.candidate_name,
          id: candidate.candidate_id,
        }));
        setCandidates(filteredCandidates);
      } catch (error) {
        console.log(error.res.data.message);
      }
      setLoading(false);
    };

    const fetchStudentVoteData = async () => {
      if (!electionId) {
        return;
      }
      try {
        const res = await api.get(
          `/vote/?studentId=${user.userID}&electionId=${electionId}`
        );
        setVotedCandidateId(res.data.candidate_id);
        setHasUserVoted(true);
      } catch (error) {
        if (error.response.status === 404) {
          setHasUserVoted(false);
        } else {
          console.log(error.res.data.message);
        }
      }
    };

    fetchElectionData();
    fetchCandidatesData();
    fetchStudentVoteData();
  }, [user.userID, user.departmentID, electionId]);

  const openModal = (candidate) => {
    setIsModalOpen(true);
    setSelectedCandidateName(candidate.name);
    setSelectedCandidateId(candidate.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleVote = async () => {
    try {
      await api.post("/vote/submit-vote", {
        "studentId": user.userID,
        "candidateId": selectedCandidateId,
        "electionId": electionId,
      });

      closeModal();

      setIsVoteSuccessful(true);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleContinue = () => {
    navigation("/dashboard");
  };

  return (
    <div className="candidates-content">
      <Sidebar roleActionArray={roleActionArray} userRole={user.role} />
      <div className="candidates-wrapper">
        {loading ? (
          <h1 id="candidates-loader">Loading...</h1>
        ) : (
          <>
            <div className="candidates-title-wrapper">
              <h1 className="candidates-header">Candidates</h1>
              <h2 className="candidates-header">{user.departmentName}</h2>
            </div>
            <div className="candidates-container">
              {candidates.map((candidate, index) => (
                <CandidateCard
                  key={index}
                  name={candidate.name}
                  id={candidate.id}
                  onVoteClick={() => openModal(candidate)}
                  isVoteDisabled={!isActiveElection || hasUserVoted}
                  votedCandidateId={votedCandidateId}
                />
              ))}
            </div>

            <SubmitVoteModal
              isOpen={isModalOpen}
              onVote={handleVote}
              onCancel={closeModal}
              candidateName={selectedCandidateName}
            />

            <VoteSuccessModal
              isOpen={isVoteSuccessful}
              onContinue={handleContinue}
              candidateName={selectedCandidateName}
            />
          </>
        )}
      </div>
    </div>
  );
}
