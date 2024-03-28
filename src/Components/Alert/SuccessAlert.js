import React, { useContext } from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import "./Alert.css"
import { IMDBContext } from '../../Context';
export default function SuccessAlert() {
  const{successCreateAlert,successDeleteAlert,successUpdateAlert}=useContext(IMDBContext)
  return (
    <div className='success-alert'>
      {successCreateAlert?"Successfully Created":successUpdateAlert?
    "Successfully Updated":successDeleteAlert?"Successfully Deleted":""}
    </div>
  );
}