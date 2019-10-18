import React , { useState , useEffect } from 'react'
import { useQuery , useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import Panigation from './Panigation';
import NumbersPage from './NumbersPage'

const Querynumber = gql`
    query{
        findnumberAll{
        _id
        number
        lineId
    
        }
    }
`


const QueryNumber = () => {

    const {loading , error , data} = useQuery(Querynumber)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);


    if(loading) return <h1>Loading ...</h1>
    if(error) return <h1>Error :(</h1>

    /// logic for paginationg /////
    const { findnumberAll } = data
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentNumber =   findnumberAll.slice(indexOfFirstPost,indexOfLastPost)
    const paginate = pageNumber => setCurrentPage(pageNumber);

        
    return (
        
        <div className='container mt-5'>
            <NumbersPage numbers={currentNumber} loading={loading}/>
            <Panigation numberPerPage={postsPerPage}
                         totalNumber={findnumberAll.length}
                         paginate={paginate}
             />
        </div>
    )
}

export default QueryNumber
