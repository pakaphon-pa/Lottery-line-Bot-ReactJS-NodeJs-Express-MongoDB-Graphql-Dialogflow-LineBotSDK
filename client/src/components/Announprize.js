import React , {useState , useEffect } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'


import Prizepage from './Prizepage'

const ANNOUNPRIZE = gql`
    query($number : String){
      lotteryAnnoucementPrize(record:{
        number:$number
      }){
        name
        lastname
        lineId
        number
      }
    } 
    `


const Announprize = () => {

  const [number , setnumber] = useState('')
  const [announprize, { loading, data }] = useLazyQuery(ANNOUNPRIZE);
  const [ prizenumber , setPrizenumber ] = useState(null)

  const handleChange = (e) =>{
    setnumber(e.target.value)
  }

  useEffect(() =>{
    if(data && data.lotteryAnnoucementPrize && !loading){
        setPrizenumber(data.lotteryAnnoucementPrize)
    }
  },[data , loading])

  const handleSubmit  = async (e) =>{
      e.preventDefault()

      await announprize({variables: { number : number }})
      
  }



    return (
        <div className='container mt-5'>   
        <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item >
            <Input
              prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="กรอกเลข"
              value={number}
              name="number"
              onChange={handleChange}
            />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form><br/>
      { prizenumber && <Prizepage numberInfo={prizenumber} loading={loading}/>}
      </div>

    )
}

export default Announprize
