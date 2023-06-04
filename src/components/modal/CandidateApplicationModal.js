import './CandidateApplicationModal.css';
import React, {useState, useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import api from '../../Providers/api';
import { UserContext } from '../../Providers/context';
import { SpinnerCircularFixed } from 'spinners-react';



export default function CandidateApplicationModal(props){
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleStudentLetter = (e) => {
        const file = e.target.files[0];
        props.setStudentLetter(file);
    };

    const handleStudentCertificate = (e) => {
        const file = e.target.files[0];
        props.setStudentCertificate(file);
    };

    const handlePoliticalDoc = (e) => {
        const file = e.target.files[0];
        props.setPoliticalDoc(file);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
      
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');
      
        return `${formattedDay}/${formattedMonth}/${year}`;
    };

    const submitApplyHandler = async (isEdit) => {
        if(props.studentLetter && props.studentCertificate && props.politicalDoc){
            const formData = new FormData();
            const userID = user.userID;
            formData.append('pdf', props.studentLetter);
            formData.append('pdf', props.studentCertificate);
            formData.append('pdf', props.politicalDoc);
            formData.append('studentId', userID);

            const config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            };
            try{
                setIsLoading(true);
                const response = isEdit? await api.put('/candidate/edit-documents', formData, config)  : await api.post('/candidate/apply-become-candidate', formData, config);

                if(response.status === 200){
                    if(!isEdit){
                        props.setApplicationDate(formatDate(response.data.application_date));
                        props.setCandidateName(response.data.name);
                        props.setCandidateDepartment(response.data.department_name);
                        props.setCandidateApplicationStatus(response.data.status);
                        props.setApplyDisabled(true);
                        props.setEditDisabled(false);
                    }
                }
                else if(response.status === 201){
                    if(isEdit){
                        props.setApplicationDate(formatDate(response.data.application_date));
                    }
                }
            }
            catch(error){
                alert(error.response.data.message);
            }
            finally{
                setIsLoading(false)
                props.onClose();
            }
            
        }
        else{
            alert("A File is missing.")
        }
    };

    return(
        <div className='modal-overlay'>
           <div className='modal-content'>
                <div className='modal-header'>
                    <h3 className='modal-upload-header'>
                        {props.isEditModal ? 'Edit Your Files' : 'Upload Your Files'}
                    </h3>
                    <button className='modal-close-button' onClick={props.onClose}>&times;</button>
                </div>
                <div className='modal-upload'>
                    <input className='modal-upload-btn' onChange={handleStudentLetter} type='file' id="letter-of-candidature"></input>
                    <label className='modal-upload-label' htmlFor='letter-of-candidature'>
                        <i><FontAwesomeIcon icon={faPlus} /></i>Letter of Candidature</label>
                    <span className='modal-upload-filename'>: {props.studentLetter ? props.studentLetter.name : 'No file chosen'}</span>
                </div>

                <div className='modal-upload'>
                    <input className='modal-upload-btn' onChange={handleStudentCertificate} type='file' id="student-certificate"></input>
                    <label className='modal-upload-label' htmlFor='student-certificate'>
                        <i><FontAwesomeIcon icon={faPlus} /></i>Student Certificate </label>
                    <span className='modal-upload-filename' >: {props.studentCertificate ? props.studentCertificate.name : 'No file chosen'}</span>
                </div>

                <div className='modal-upload'>
                    <input className='modal-upload-btn' onChange={handlePoliticalDoc} type='file' id="political-membership-doc"></input>
                    <label className='modal-upload-label' htmlFor='political-membership-doc'>
                        <i><FontAwesomeIcon icon={faPlus} /></i>Political Party Membership Document </label>
                    <span className='modal-upload-filename' >: {props.politicalDoc ? props.politicalDoc.name : 'No file chosen'}</span>
                </div>
                <div className='modal-submit-wrapper'>
                    <button className='modal-submit-btn' onClick={props.isEditModal? () => submitApplyHandler(true) : () => submitApplyHandler(false)}>{isLoading ? (<SpinnerCircularFixed size={15} thickness={150} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0)" />) : 'Submit'}</button>
                </div>
                
           </div>
        </div>
    )
}