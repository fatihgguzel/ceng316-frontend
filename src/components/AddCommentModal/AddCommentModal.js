import './AddCommentModal.css';
import React, {useState, useContext, useEffect, useRef} from "react";
import api from '../../Providers/api';
import { UserContext } from '../../Providers/context';
import { SpinnerCircularFixed } from 'spinners-react';
import { SpinnerCircularSplit } from 'spinners-react';

export default function AddcommentModal(props){
    const { user } = useContext(UserContext);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [initialComment, setInitialComment] = useState('');
    const textAreaRef = useRef();
    useEffect(()=> {
        const getInitialComment = async () => {
            try {
                const response = await api.get('/candidate/comment/'+props.selectedCandidateID);
                if(response.status === 200){
                    const comment = response.data.comment;
                    setInitialComment(comment)
                }
            } catch (error) {   
                //TODO
            }
            finally{
                setCommentsLoading(false);
            }
        }
        getInitialComment();
    },[])

    const handleCommentSubmit = async () => {
        try {
            setIsLoading(true);
            const response = await api.post('/candidate/submit-comment',
            {
                "candidateId": props.selectedCandidateID,
                "comment": textAreaRef.current.value
            })
            if(response.status === 201){
                props.onClose();
            }
            
        } catch (error) {
            alert(error.response.data.message);
        }
        finally{
            setIsLoading(false);
        }
    }
    return(
        <div className='comment-modal-overlay'>
            <div className='comment-modal-content'>
                <div className='comment-modal-header'>
                    <h3 className='comment-header'>
                        Add Comment
                    </h3>
                    <button className='comment-modal-close-button' onClick={props.onClose}>&times;</button>
                </div>
                <div className='comment-modal-body'>
                    {commentsLoading? <SpinnerCircularSplit size={50} thickness={180} speed={140} color="rgba(172, 57, 59, 1)" secondaryColor="rgba(0, 0, 0, 0)" />: 
                    <textarea ref={textAreaRef} defaultValue={initialComment} className='comment-modal-review-comment' placeholder='Add your comment' id='review-comment' rows="10" cols="40" autoFocus>

                    </textarea>
                    }
                    <button className='comment-modal-submit-btn' onClick={handleCommentSubmit}>
                    {isLoading ? (<SpinnerCircularFixed size={15} thickness={150} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0)" />) : 'Submit'}
                    </button>
                </div>
            </div>

        </div>
    )
}