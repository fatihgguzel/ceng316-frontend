import './CandidateApplicationPage.css';
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Providers/context";
import Sidebar from "../../components/sidebar/SideBar";
import { roleActionArray } from "../../db_mock/IOES_db";
import DataTable from 'react-data-table-component';
import api from '../../Providers/api';
import { formatDate } from '../../utils/FormatDate';
import CandidateApplicationModal from '../../components/ApplicationModal/CandidateApplicationModal';


export default function CandidateApplicationPage(){
    const {user} = useContext(UserContext);
    const [studentLetter, setStudentLetter] = useState(null);
    const [studentCertificate, setStudentCertificate] = useState(null);
    const [politicalDoc, setPoliticalDoc] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);
    const [applicationDate, setApplicationDate] = useState(null);
    const [candidateName, setCandidateName] = useState(null);
    const [candidateDepartment, setCandidateDepartment] = useState(null);
    const [reviewerComment, setReviewerComment] = useState(null);
    const [candidateApplicationStatus, setCandidateApplicationStatus] = useState(null);
    const [pending, setPending] = useState(true);
    const [applyDisabled, setApplyDisabled] = useState(true);
    const [editDisabled, setEditDisabled] = useState(true);

    useEffect(()=> {
        const getCandidateInfoInitial = async () => {
            try{
                const response = await api.get('/candidate/candidate-information/' + user.userID)
                if(response.status === 200){
                    setInitialUser(response.data)
                }
            }
            catch(error){
                if(error.response.status === 404){
                    setApplyDisabled(false);
                }
                else{
                    alert(error.response.data.message)
                }
            }
            finally{
                setPending(false)
            }
        }
        getCandidateInfoInitial();
    })



    const openModal = (isEditModal) => {
        setIsModalOpen(true);
        if(isEditModal){
            setIsEditModal(true);
        }
    };

    const setInitialUser= (data) => {
        if(data.application_status !== "approved"){
            setEditDisabled(false);
        }
        setApplicationDate(formatDate(data.application_date));
        setCandidateName(data.candidate_name);
        setCandidateDepartment(data.department_name);
        setReviewerComment(data.comment);
        setCandidateApplicationStatus(data.application_status);

    }

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditModal(false);
    }


    const tableColumns = [
        {
            name: 'Application Date',
            selector: row => row.applicationDate,
        },
        {
            name: 'Candidate Name',
            selector: row => row.candidateName,
        },
        {
            name: 'Department',
            selector: row => row.candidateDepartment,
        },
        {
            name: 'Comment',
            selector: row => row.reviewerComment,
        },
        {
            name: 'Application Status',
            selector: row => row.candidateApplicationStatus,
        },
    ];

    const candidateData = {
        applicationDate: applicationDate,
        candidateName: candidateName,
        candidateDepartment: candidateDepartment,
        reviewerComment: reviewerComment,
        candidateApplicationStatus: candidateApplicationStatus,
    };

    const tableRows= [
        candidateData
    ];

    const customStyles = {
        head: {
            style: {
                fontSize: '15px',
                color: 'black',
            },
        },
    }




    return (
        <div className='candidate-application-page'>
            <Sidebar roleActionArray={roleActionArray} userRole={user.role}/>
            <div className='candidate-application-page-content'>
                <div className='data-table'>
                    <DataTable
                        columns={tableColumns}
                        data={tableRows}
                        customStyles={customStyles}
                        progressPending={pending}
                        
                    />
                </div>
                <div className='page-actions'>
                    <button disabled={applyDisabled}  onClick={() =>openModal(false)} className='candidate-apply-btn'>Apply</button>
                    <button disabled={editDisabled}  onClick={() =>openModal(true)} className='candidate-edit-btn'>Edit Files</button>
                </div>
                
                {isModalOpen &&
                 <CandidateApplicationModal
                    isEditModal={isEditModal}
                    onClose={closeModal}
                    studentLetter={studentLetter}
                    studentCertificate={studentCertificate}
                    politicalDoc={politicalDoc}
                    setStudentLetter={setStudentLetter}
                    setStudentCertificate={setStudentCertificate}
                    setPoliticalDoc={setPoliticalDoc}
                    setApplicationDate={setApplicationDate}
                    setCandidateName={setCandidateName}
                    setCandidateDepartment={setCandidateDepartment}
                    setReviewerComment={setReviewerComment}
                    setCandidateApplicationStatus={setCandidateApplicationStatus}
                    setApplyDisabled={setApplyDisabled}
                    setEditDisabled={setEditDisabled}
                    />}
            </div>
            
        </div>
        )
}