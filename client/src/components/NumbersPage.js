import React from 'react'

const NumbersPage = ({numbers , loading}) => {
    if(loading){
        return <h2>loading...</h2>
    }
    return (
        <ul className="list-group mb-4">
            {
                numbers.map(number =>(
                    <li key={number._id} className='list-group-item'>
                        {number.lineId} : {number.number}
                    </li>
                ))
            }
        </ul>
    )
}

export default NumbersPage
