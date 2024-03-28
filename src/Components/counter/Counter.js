import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
export function Counter() {
  let [like, setLike] = useState(0);

  let [disLike, setDisLike] = useState(0);

  const increamentLike = () => setLike(like + 1);
  const increamentDisLike = () => setDisLike(disLike + 1);

  return (
    <div>
      <IconButton aria-label="delete" onClick={increamentLike} 
      color="primary"><Badge badgeContent= {like}color="primary">👍</Badge>
      
       </IconButton>
     
      <IconButton aria-label="delete" onClick={increamentDisLike}  
      color="error"><Badge badgeContent= {disLike}color="primary">👎</Badge> 
       </IconButton>
    </div>
  );
}