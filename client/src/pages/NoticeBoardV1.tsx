import React, {FC, ChangeEvent, useState} from 'react';
import NoticeInput from '../components/Noticeboard/NoticeInputV1';
import Dropdown from '../components/Noticeboard/Dropdown';
import "../styles/NoticeBoard.scss";
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer/Footer';
import NoticeInputV1 from '../components/Noticeboard/NoticeInputV1';

function NoticeBoardV1(){

  return  (
     <div>  
            <div><Navbar2 /></div>
            
            <div className="NoticeBoard">
                  <span className ="NoticeBoard-title">  
                 
                   <div id='leftbox'>
                   <h1>Notice Board</h1>
                   </div>

                   <div id='rightbox'>
                   <p>Order by:</p>
                   <Dropdown/>
                   </div>                
                                  
                  </span>
                  <br></br>
                  <div>
                  <NoticeInputV1 />
                  </div>  
                    
         </div>
                  <div>
                  <Footer/>
                  </div> 
     </div> 
     
     
       
);
}

     

export default NoticeBoardV1;
   