import React from 'react'

const usersList = (props) => {
  return (
   
   <div> {props.data.map((data)=>(
    <div style={{ marginBottom: '20px' }} key={data.id} >
        <div style={{display:'flex'}}><div style={{marginRight:'5px'}}>{data.name}</div>
        <div>{data.age}</div></div>
    </div>
    ))}</div>
  )
}

export default usersList