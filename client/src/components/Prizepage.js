import React from 'react'
import PropTypes, { number } from 'prop-types'

const Prizepage = ({ numberInfo , loading }) => {
    if(loading){
        return <h2>loading...</h2>
    }

    
    console.log(numberInfo.length)
    return (
        <div>
            <h5>ผู้ถูกรางวัล</h5>
             <ul className="list-group mb-4">
                {
                     numberInfo.length === 0  ?  <li  className='list-group-item'>ไม่มีผู้ถูกรางวัล</li> :    numberInfo.map(number =>(
                        <li key={number._id} className='list-group-item'>
                        ชื่อ : คุณ {number.name} {number.lastname} , เลข : {number.number}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

Prizepage.propTypes = {
    numberInfo : PropTypes.array.isRequired,
}

export default Prizepage
