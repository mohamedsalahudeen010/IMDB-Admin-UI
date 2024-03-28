import  React, { useContext } from 'react';
import { IMDBContext } from '../../Context';

export default function FailureAlert() {
  const{failureCreateAlert,failureUpdateAlert,failureDeleteAlert}=useContext(IMDBContext)
  return (
    <div className='failure-alert'>
    {failureCreateAlert?"Can not Create Data":failureUpdateAlert?
    "Can not Update Data":failureDeleteAlert?"Can not Delete Data":""}
    </div>
  );
}