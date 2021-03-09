import React, {useState, useEffect } from 'react'; 
import Chart from "react-google-charts";
import {  AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import Axios from 'axios'

const Zone2 =()=>{
  const [dataT, setDataT]= useState([]);
  const [dataH, setDataH]= useState([]);
  const [dataA, setDataA]= useState([]);
  const [listT, setListT]= useState([])
  const [listH, setListH]= useState([])
  const [listA, setListA]= useState([])
  useEffect (()=>{
    Axios.get('http://localhost:3001/api/getData2').then((response)=>{
     console.log(response.data)
         setDataT(response.data[0])
         setDataH(response.data[1])
         setDataA(response.data[2])
       
         
    })
   },[])
   useEffect (()=>{
    Axios.get('http://localhost:3001/api/getDataIoT2').then((response)=>{
       // console.log(response.data)
        setListA(response.data[0])
        setListH(response.data[1])
        setListT(response.data[2])
       /* setDataT2(response.data[3])
        setDataH2(response.data[4])
        setDataA2(response.data[5])*/
      })
    },[])
   const areatT =  
   <AreaChart width={500} height={250} data={dataT} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis/>
        <YAxis/>
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey='temperature' stroke="#8884d8" fill="#8884d8" />
 </AreaChart>

 const areaH =  
 <AreaChart width={500} height={250} data={dataH} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis/>
        <YAxis/>
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey='humidite' stroke="#8884d8" fill="#8884d8" />
</AreaChart>
const areaA = 
        <AreaChart width={480} height={250} data={dataA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis/>
        <YAxis/>
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey='air' stroke="#8884d8" fill="#8884d8" />
</AreaChart>
const listTemp = 
<div>
  
 <table className='table table-sm table-borderless' style={{width:'300px'}}>
    <tr >
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      <td></td>
      <td><button type="button" class="btn btn-success btn-sm">Min</button></td>
      <td><button type="button" class="btn btn-danger  btn-sm">Max</button></td>
      <td><button type="button" class="btn btn-warning btn-sm">Avg</button></td>
   
    </tr>
    {listT.map(member =>
   <tr>
       <td></td>
       <td></td>
       <td></td>
        <td></td>
        <td></td>
       <td></td>
      
     <td></td>
      <td>{member.MINT}</td>
      <td>{member.MAXT}</td>
      <td>{member.AVGT}</td>
   </tr>
   )}
 </table>
  </div>

  const listHum = <div>
  {listH.map(member =>
  <table className='table table-sm table-borderless' style={{width:'350px'}}>
    <tr>
    <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><button type="button" class="btn btn-success btn-sm">Min</button></td>
      <td><button type="button" class="btn btn-danger  btn-sm">Max</button></td>
      <td><button type="button" class="btn btn-warning btn-sm">Avg</button></td>
    </tr>
   <tr>
   <td></td>
   <td></td>
        <td></td>
        <td></td>
        <td></td>
        
        <td></td>
      <td>{member.MINH}</td>
      <td>{member.MAXH}</td>
      <td>{member.AVGH}</td>
   </tr>
  </table>
  )}</div>
  
  const listAir = <div> {listA.map(member =>
    <table className='table table-sm table-borderless' style={{width:'350px'}}>
      <tr>
      <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><button type="button" class="btn btn-success btn-sm">Min</button></td>
      <td><button type="button" class="btn btn-danger  btn-sm">Max</button></td>
      <td><button type="button" class="btn btn-warning btn-sm">Avg</button></td>
      </tr>
     <tr>
     <td></td>
     <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>{member.MINA}</td>
        <td>{member.MAXA}</td>
        <td>{member.AVGA}</td>
     </tr>
    </table>
    )}</div>

const faible = (dataT.filter(i => i.temperature <11)).length
const moyen =  (dataT.filter(i => i.temperature <36 && i.temperature>10)).length
const eleve  = (dataT.filter(i => i.temperature >35)).length

const pieT =  <Chart
    width={'650px'}
    height={'350px'}
    chartType="PieChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['Task', 'Hours per Day'],
      ['Faible', (dataT.filter(i => i.temperature <11)).length],
      ['Moyen', (dataT.filter(i => i.temperature <36 && i.temperature>10)).length],
      ['Eleve', (dataT.filter(i => i.temperature >35)).length],
    ]}
    options={{
      title: 'Température zone 2',
      is3D: true,
    }}
  />
  const pieH = <Chart
    width={'650px'}
    height={'350px'}
    chartType="PieChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['Task', 'Hours per Day'],
      ['Faible',(dataH.filter(i => i.humidite <41)).length],
      ['Moyen', (dataH.filter(i => i.humidite <61 && i.humidite>40)).length],
      ['Eleve', (dataH.filter(i => i.humidite >60)).length],
    ]}
    options={{
      title: 'Humidité zone 2',
      is3D: true,
    }}
  />
  const pieA = <Chart
    width={'650px'}
    height={'350px'}
    chartType="PieChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['Task', 'Hours per Day'],
      ['Faible',(dataA.filter(i => i.air <31)).length],
      ['Moyen', (dataA.filter(i => i.air <71 && i.air>30)).length],
      ['Eleve', (dataA.filter(i => i.air >70)).length],
    ]}
    options={{
      title: 'Air zone 2',
      is3D: true,
    }}
  />

const divZone2 =  <div>
<table className='table table-borderless'>
    <tr>
        <td>{areatT}</td>
        <td>{areaH}</td>
        <td>{areaA}</td>
    </tr>
    <tr >
        <td>{listTemp}</td>
        <td>{listHum}</td>
        <td>{listAir}</td>
    </tr>
    <tr>
        <td>{pieT}</td>
        <td> {pieH}</td>
        <td>{pieA}</td>
    </tr>
</table>

</div>

  return(
    <div>
        <h1 className='text-center'>Data IoT Zone 2</h1>
        <br/><br/>

        {divZone2}
    </div>
  )
}
export default Zone2
