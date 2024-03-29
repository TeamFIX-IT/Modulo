import React, {FC, ChangeEvent, useState} from 'react';
import {INotice} from "./interface";
import "../../styles/NoticeInput.scss";
import NoticeCard from './NoticeCard';




const NoticeInput :FC = () => {

    const [notice, setNotice] =useState<string>("");
    const [description, setDescription] =useState<string>("");
    const [noticeList, setNoticeList] =useState<INotice[]>([]);
    const [edit, setEdit] =useState<boolean>(false);
    const [error, setError] = React.useState('');
    const [value, setValue] = useState({});
 



    const handleChange =(event:ChangeEvent<HTMLInputElement> ) : void => {
     
     if(event.target.name==="notice"){
       setNotice(event.target.value);
     }
     else if (event.target.value==="null"){
        setError('Title is required');
     }
     else {
        setDescription(event.target.value);
     }
    
    };
   
     const addNotice = (): void => {
       const newNotice ={noticeTitle: notice, description: description };
        setNoticeList([...noticeList, newNotice]);
        setNotice("");
        setDescription(""); 
     
     };
   
     const deleteNotice =(noticeTitleToDelete: string): void =>
      {
         setNoticeList(noticeList.filter((notice)=>{
          return notice.noticeTitle !== noticeTitleToDelete;
   
        }));
     };

     const editNotice =(noticeToEdit: string): void =>
     {
        setNoticeList(noticeList.filter((notice)=>{
         return notice.noticeTitle !== noticeToEdit;
  
       }));
    };

    const sendSMS =(noticeToSendSMS: string): void =>
    {
       setNoticeList(noticeList.filter((notice)=>{
        return notice.noticeTitle !== noticeToSendSMS;
 
      }));
   };
  
   
     return  (
       <div className="NoticeInput">
        
            <div className="header">
            <br>
            </br>
            <div className="InputTitle">
            <p>New Notice</p>
            </div>

                <hr></hr>
                <br></br>

            <div>
            <p>Notice Title:</p>
            <div className="inputContainer">
            <input 
            type="text" 
            name="notice" 
            // placeholder="Notice Title" required
            value={notice}
            onChange={handleChange}
           
            />
           
            </div>
            </div>
         
        <br></br>

        <div>
            <p>Description:</p>
            <div className="inputContainer">
            <input 
            type="text" 
            name="description" 
            // placeholder="Description" required
            value={description}
            onChange={handleChange}/>
       
         </div>
        </div>
        <br></br>
        

         <div className="AddButton">
            
              <button onClick={addNotice}>+ Add Notice</button>
         </div>
        
         </div>
         <div className="noticeList">
          {noticeList.map((notice: INotice, key:number) => {
         return <NoticeCard key={key} notice={notice} deleteNotice={deleteNotice} editNotice={editNotice} sendSMS={sendSMS}/>;
       })}
        </div>
       </div>
     );
   };
   
export default NoticeInput;