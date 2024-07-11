import React from 'react'

const fetchData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    return res.json();
  }
 
const Users = async() => {
    const data = await fetchData()
    const dataLength =(length)=>{
      if(length == 1){
        return "пользователь"
      } else if(length >= 2 && length <5){
        return "пользователя"
      }else if(length >= 5 ){
        return "пользователей"
      }else if(length <= 0 ){
        return "нет пользователей"
      }
     }

  return (
    <div >
      {data.length} {dataLength(data.length)}
      <br/>
      <br/>
    {data.map((data)=>(
    <div style={{ marginBottom: '20px' }} key={data.id}>
        <div>{data.name}</div>
    </div>
    ))}
    </div>
  )
}

export default Users