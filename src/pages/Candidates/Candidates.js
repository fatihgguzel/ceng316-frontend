import { useState, useEffect } from "react";
import { useContext } from "react";
import Sidebar from "../../components/sidebar/SideBar";
import { roleActionArray } from "../../db_mock/IOES_db";
import { UserContext } from "../../Providers/context";
import CandidateCard from "./CandidateCard";
import SubmitVoteModal from "./SubmitVoteModal";
import "./Candidates.css";
import teyp from "../../assets/teyp.png";
import marem from "../../assets/marem.png";
import kemal from "../../assets/kemal.png";
import oğlan from "../../assets/oğlan.png";
import iztech from "../../assets/iztech.png";
import api from "../../Providers/api";

export default function Candidates() {
  const { user } = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [cards] = useState([
    {
      name: "Mr President",
      avatar: teyp,
    },
    {
      name: "Maarem İnce",
      avatar: marem,
    },
    {
      name: "Demokrat Dedem",
      avatar: kemal,
    },
    {
      name: "Soğan Oğlan",
      avatar: oğlan,
    },
    {
      name: "iztech",
      avatar: iztech,
    }
  ]);

  const openModal = (candidate) => {
    setIsModalOpen(true);
    setSelectedCandidate(candidate);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleVote = () => {
    // Perform vote submission logic here
    // ...

    // Close the modal after vote submission
    closeModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/election/${user.departmentID}`);
        console.log(response);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchData();
  }, [user.departmentID]);

  return (
    <div className="candidates-content">
      <Sidebar roleActionArray={roleActionArray} userRole={user.role} />
      <div className="candidates-wrapper">
        <div className="candidates-title-wrapper">
          <h1 className="candidates-header">Candidates</h1>
          <h2 className="candidates-header">{user.departmentID}</h2>
        </div>
        <div className="candidates-container">
          {cards.map((card, index) => {
            return (
              <CandidateCard
                key={index}
                name={card.name}
                avatar={card.avatar}
                onVote={() => openModal(card.name)}
              />
            );
          })}
        </div>
      </div>

      <SubmitVoteModal
        isOpen={isModalOpen}
        onVote={handleVote}
        onCancel={closeModal}
        candidateName={selectedCandidate}
      />
    </div>
  );
}
