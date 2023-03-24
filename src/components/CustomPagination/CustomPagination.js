import React from 'react'
import { Pagination } from '@mui/material';



function CustomPagination({setPage, numOfPages=10}) {

    const handlePageChange =(page) => {
        setPage(page);
        window.scroll(0,0);
    }

  return (
    <div
    sx={{
        width:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginTop:10,
    }}
    >
   
    <Pagination
     count={numOfPages}
     onChange={(e)=> handlePageChange(e.target.textContent)}
    //  hideNextButton
    //  hidePrevButton
     color="primary"
     />
    
   
   </div>
  )
}

export default CustomPagination
