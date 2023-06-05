import React, {useState, useContext, useEffect} from 'react';
import api from '../../Providers/api';
import { UserContext } from '../../Providers/context';
import { roleActionArray } from "../../db_mock/IOES_db";
import Sidebar from '../../components/sidebar/SideBar';
import './ReviewCandidatesPage.css'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { SpinnerCircularFixed } from 'spinners-react';
import { formatDate } from '../../utils/FormatDate';
import AddCommentModal from '../../components/AddCommentModal/AddCommentModal';

export default function ReviewCandidatePage(){
    const {user} = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCandidateID, setSelectedCandidateID] = useState(null);
    const [dataPending, setDataPending] = useState(true);
    const [tableRows, setTableRows] = useState([]);
    const [filesLoading, setFilesLoading] = useState([]);

    useEffect(() => {
        const getPendingCandidates = async () => {
            try{
                const response = await api.get('/candidate/?departmentId='+user.departmentID+"&status=pending");
                if(response.status === 200){
                    const pendingCandidates = response.data;
                    setCandidateData(pendingCandidates)
                }
            }
            catch(error){
                alert(error.response.data.message);
            }
            finally{
                setDataPending(false);
            }
        }
        getPendingCandidates();
    },[]);

    const openCommentModal = (candidateID) => {
        setSelectedCandidateID(candidateID);
        setIsModalOpen(true);
    };

    const closeCommentModal = () => {
        setIsModalOpen(false);
    }

    const handleGetFiles = async (candidateID, rowIndex) => {
        try {
            setFilesLoading((prevLoading) => {
                const loadingStates = [...prevLoading];
                loadingStates[rowIndex] = true;
                return loadingStates;
            });
            const response = await api.get('/candidate/candidate-forms/'+candidateID);
            if(response.status === 200){
                const files = response.data;

                const container = document.createElement('div');
                files.forEach((file) => {
                    const { id, file_data, file_name } = file;
                    const blob = new Blob([new Uint8Array(file_data.data)], { type: file_data.type });
                    const downloadLink = document.createElement('a');
                    downloadLink.href = URL.createObjectURL(blob);
                    downloadLink.download = file_name;
                    downloadLink.textContent = file_name;
                    container.appendChild(downloadLink);
                });
                document.body.appendChild(container);

                const downloadLinks = container.querySelectorAll('a');
                downloadLinks.forEach((link) => link.click());

                document.body.removeChild(container);
            }
        } catch (error) {
            alert(error)
        }
        finally{
            setFilesLoading((prevLoading) => {
                const loadingStates = [...prevLoading];
                loadingStates[rowIndex] = false;
                return loadingStates;
            });
        }
    }

    const actionHandler = async (newStatus, candidateID) => {
        try {
            const response = await api.put('/candidate/update-status',
            {
                "candidateId": candidateID,
                "status": newStatus
            })
            if(response.status === 201){
                alert("Candidate "+newStatus);
                removeCandidateFromRow(candidateID);
            }
            
        } catch (error) {
            alert(error)
        }

    }

    const removeCandidateFromRow = (candidateID) => {
        setTableRows((prevRows) => prevRows.filter((row) => row.candidateID !== candidateID));
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
            cell: (row) => <button onClick={()=>openCommentModal(row.candidateID)} className='data-table-row-action data-table-add-comment'>Add Comment</button>,
        },
        {
            name: 'Files',
            cell: (row, rowIndex) => <button onClick={()=> handleGetFiles(row.candidateID, rowIndex)} className='data-table-row-action data-table-download-files'>{filesLoading[rowIndex] ? (<SpinnerCircularFixed size={15} thickness={150} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0)" />) : 'Download Files'}</button>
        },
        {
            name: 'Actions',
            cell: (row) => <div className='data-table-actions'>
                <button onClick={() => {actionHandler("approved", row.candidateID)}} className='data-table-action data-table-approve'><FontAwesomeIcon icon={faCheck} style={{color: "#ffffff",}} /></button>
                <button onClick={() => {actionHandler("rejected", row.candidateID)}} className='data-table-action data-table-reject'><FontAwesomeIcon icon={faXmark} style={{color: "#ffffff",}} /></button>
                </div>
        },
    ];


    const setCandidateData = (rowData) => {
        const mockArray = [];
        const loadingStates = [];
        rowData.forEach(row => {
            const candidateData = {
                applicationDate: formatDate(row.application_date),
                candidateID: row.candidate_id,
                candidateName: row.candidate_name,
                candidateDepartment: row.department_name,
                userID: row.student_id,
            };

            mockArray.push(candidateData);
            loadingStates.push(false);
        });
        setTableRows(mockArray);
        setFilesLoading(loadingStates);
    }

    const customStyles = {
        head: {
            style: {
                fontSize: '15px',
                color: 'black',
            },
        },
    }

    return(
        <div className='review-candidates-page'>
            <Sidebar roleActionArray={roleActionArray} userRole={user.role} />
            <div className='review-candidates-page-content'>
                <div className='review-candidates-data-table'>
                    <DataTable
                    columns={tableColumns}
                    data={tableRows}
                    customStyles={customStyles}
                    pagination
                    progressPending={dataPending}
                    />
                </div>
                {isModalOpen && 
                <AddCommentModal
                    onClose={closeCommentModal}
                    selectedCandidateID={selectedCandidateID}
                />}

            </div>
        </div>
    )
    
}