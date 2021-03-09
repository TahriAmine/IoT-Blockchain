import Axios from 'axios'
import React ,{useEffect, useState}from 'react'

const Drop = () => {
  const [listT, setListT]= useState([])
  const [listH, setListH]= useState([])
  const [listA, setListA]= useState([])
  useEffect (()=>{
    Axios.get('http://localhost:3001/api/getDataIoT').then((response)=>{
        console.log(response.data)
        setListA(response.data[0])
        setListH(response.data[1])
        setListT(response.data[2])
      })
       

    },[])
    const listTemp = <div>{listT.map(member =>
      <table className='table table-sm table-borderless' style={{width:'200px'}}>
        <tr>temp</tr>
        <tr>
          <td>Min</td>
          <td>Max</td> 
          <td>Avg</td>
        </tr>
       <tr>
          <td>{member.MINT}</td>
          <td>{member.MAXT}</td>
          <td>{member.AVGT}</td>
       </tr>
      </table>
      )}
      </div>
      const listHum = <div>
      {listH.map(member =>
      <table className='table table-sm table-borderless' style={{width:'200px'}}>
        <tr>hum</tr>
        <tr>
          <td>Min</td>
          <td>Max</td> 
          <td>Avg</td>
        </tr>
       <tr>
          <td>{member.MINH}</td>
          <td>{member.MAXH}</td>
          <td>{member.AVGH}</td>
       </tr>
      </table>
      )}</div>

      const listAir = <div> {listA.map(member =>
        <table className='table table-sm table-borderless' style={{width:'200px'}}>
          <tr>air</tr>
          <tr>
            <td>Min</td>
            <td>Max</td> 
            <td>Avg</td>
          </tr>
         <tr>
            <td>{member.MINA}</td>
            <td>{member.MAXA}</td>
            <td>{member.AVGA}</td>
         </tr>
        </table>
        )}</div>
  return (
    <div className='container'>
      <h1 className='text-center'>Data IoT</h1>
      <table style={{width:'900px'}}>
        <tr>
          <td>{listTemp}</td>
          <td>{listHum}</td>
          <td>{listAir}</td>
        </tr>
      </table>
</div>
  )
}

export default Drop
