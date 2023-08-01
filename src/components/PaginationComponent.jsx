import Pagination from '@mui/material/Pagination';

const PaginationComponent = ({ setPage, numOfPages = 100 }) => {
    let targetValue;
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    }
    return (
        <div className='pagination'>
            <Pagination count={numOfPages}
                onChange={(e, page) => {
                    console.log(e.target.dataset.testid, page);
                    targetValue = e.target.tagName === 'button' ? e.target.textContent : page + 1;
                    handlePageChange(targetValue)
                }
                }
            />
        </div>
    );
}

export default PaginationComponent;