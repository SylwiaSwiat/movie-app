import Pagination from '@mui/material/Pagination';

const PaginationComponent = ({setPage, numOfPages=100}) => {
    const handlePageChange=(page)=>{
setPage(page);
window.scroll(0,0);
    }
    return ( 
        <div className='pagination'>
<Pagination count={numOfPages}
onChange={(e)=> handlePageChange(e.target.textContent)}
/>
        </div>
     );
}
 
export default PaginationComponent;