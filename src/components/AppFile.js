import React, { Component } from 'react';
import logophoto from '../Smartech.png';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import './App.css';
import Web3 from'web3'
import Meme from '../abis/Meme.json'
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import {Button,Modal,ButtonGroup} from 'react-bootstrap'
import Chart from "react-google-charts";
import { PieChart, Pie, AreaChart, Area, Cell,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import Axios from 'axios'
import DataIoT from '../client/components/Transactions'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host:'ipfs.infura.io', port : 5001, protocol :'https'})
class AppFile extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
//get account, network,smart contract,memeHash
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const n = web3.eth.getTransactionCount(this.state.account,(err,res)=>{
    })
   
    //const b = await web3.eth.getBlock(await web3.eth.getTransactionCount(this.state.account))
    //this.setState({b})
    web3.eth.getTransactionCount(this.state.account, (err, txCount) => {this.setState({txCount:txCount})})
   // web3.eth.getBlockNumber().then(console.log)
    const networkId = await web3.eth.net.getId()
    const networkData = Meme.networks[networkId]
    if(networkData) {
      const abi = Meme.abi
      const address = networkData.address
      this.setState({address})
      const contract = web3.eth.Contract(abi, address)
      this.setState({ contract })
      const memeHash = await contract.methods.get().call()
      this.setState({ memeHash })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }
  constructor(props){
    super(props);
    this.state = {
      txCount : '',
      b:{},
      show : false,
      num:'',
      blocks:[],
      txHash : '',
      account : '',
      address : '',
      buffer : null,
      contract : null,
      meme : '',
      url:'',
      getData:'',
      memeHash : '' //default value
    };
   
  }
  
  captureFile =(event)=>{
    event.preventDefault();
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({buffer: Buffer(reader.result)})
    }
  }               
  // exemple hash QmNuNVbTPh3UFzQr3x1ndvDsZ2S4Qt7ofvayLCJEtv2h1h
  //exemple path https://ipfs.infura.io/ipfs/QmNuNVbTPh3UFzQr3x1ndvDsZ2S4Qt7ofvayLCJEtv2h1h

  onSubmit = async (event) => {
    event.preventDefault()
    ipfs.add(this.state.buffer, (error,result)=>{
     console.log('IPFS Result ', result[0].hash)
     this.setState({meme : result[0].hash})
     this.setState({ url:'https://ipfs.infura.io/ipfs/'})
      const memeHash = result[0].hash
      if(error){
        console.error(error) 
        return
      }
      /*this.state.contract.methods.set(memeHash).send({ from: this.state.account }).then((err,txH) => {
        console.log(txH)
        console.log(err)
        this.state.setState({memeHash})
      })*/
      
    this.state.contract.methods.set(memeHash).send({ from: this.state.account },(err,txHash)=>{
      
       this.setState({txCount:this.state.txCount+1})
       this.setState({txHash})
       this.setState({memeHash})
       const tx =   window.web3.eth.getTransaction(txHash)
       console.log('ascii ',  window.web3.eth.getTransaction(txHash,(a,b)=>{
         
         console.log('b',b)
       }))
       //console.log('ascii ', window.web3.utils.hexToUtf8(txHash))
     //  web3.toAscii, just use web3.utils.toAscii
     })
    })
  }
  getAllBlock = async e =>{
    //const b = await window.web3.eth.getBlock(await window.web3.eth.getTransactionCount(this.state.account))
    //const b0 = await window.web3.eth.getBlock(0)
    //window.web3.eth.getTransaction(b0.transactions[0],(a,res)=>{
     // console.log(res)
      //console.log('from ',res.from)
      //console.log('to ',res.to)
   // })
    console.log('block 0 ',await window.web3.eth.getBlock(0))
    for (var i=1;i<await window.web3.eth.getTransactionCount(this.state.account);i++){
      const b = await window.web3.eth.getBlock(i)
      //console.log(b)
      console.log('parent hash ', b.parentHash)
      console.log('number ',b.number)
      console.log('hash ',b.hash)
      console.log('timestamp ',b.timestamp)
      console.log('transactions ',b.transactions[0])
      window.web3.eth.getTransaction(b.transactions[0],(a,res)=>{
        console.log('from ',res.from)
        console.log('to ',res.to)
        const newList = this.state.blocks.concat({num: b.number,hash:b.hash,parenthash:b.parentHash,timestamp:b.timestamp,transaction:b.transactions[0],from:res.from,to:res.to});
        this.setState({blocks:newList}); 
      })
    }
    console.log('block ',this.state.blocks)
   }
  getBlock = async e =>{
   // console.log(this.state.web3.getBlock(this.state.txCount))
   console.log(this.state.b.transactions[0])
  }  
  account = async e =>{
    window.alert('ijkjnbjhb')
   }  
   bc = async (e)  => {
    //e.preventDefault();
    window.alert('ok')
  }
  getData = async (e)  => {
   // e.preventDefault();
   const getData = await this.state.contract.methods.get().call();
   
   // .then(console.log)
   this.setState({getData})
  
   console.log(getData)
  // window.alert(JSON.stringify(getData))
   //console.log(res)
    
    /*
    this.state.contract.methods.set('123').send({from: this.state.account})
.on('transactionHash', function(hash){
  console.log('hash',hash)
})
.on('confirmation', function(confirmationNumber, receipt){
  console.log('confirmationNumber',confirmationNumber)
  console.log('receipt',receipt)
})
.on('receipt', function(receipt){console.log('receipt2',receipt);})*/
  }
  render() {
    const data = this.state.show ?  (<DataIoT name='amine'/>) : (<p></p>)
    const a = this.state.meme === null ? (<p></p>):(<a href={this.state.url + this.state.meme} target="_blank"> {this.state.url + this.state.meme}</a>)
  //  const a = this.state.meme === null ? (<p></p>):(<Link to="/dashboard">{this.state.url + this.state.meme}</Link>)
    return (
      <div>   
         {/* <button onClick={async hiStackOverflow => {if (window.confirm("Want to do this?")) { saving to database here }}}> bb</button>*/}
        {/*<nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            //href="http://www.istic.rnu.tn/fr/"
            href="https://smart-etech.tn/"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
          <ul className="navbar-nav px-3">
            <li className="raw-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white">{this.state.account}</small>
            </li>
          </ul>
    </nav>*/}
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="https://smart-etech.tn/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logophoto}   width="800" height="180"/>
                </a>
                <p>&nbsp;</p>
                <h2>Change Contract Data</h2>
                <form onSubmit = {this.onSubmit}>
                  <table>
                    <tr><td> <input type="file" onChange={this.captureFile}/></td><td> <input type="submit" value='Send Data to IPFS & Smart Contract' class="btn btn-success mb-2"/></td></tr>
                    <tr><td> <input type="file" onChange={this.captureFile}/></td><td> <input type="submit" value='Send Data to IPFS & Smart Contract' class="btn btn-success mb-2"/></td></tr>
                    <tr><td> <input type="file" onChange={this.captureFile}/></td><td> <input type="submit" value='Send Data to IPFS & Smart Contract' class="btn btn-success mb-2"/></td></tr>
                    </table>
                {/*  <input type="file" onChange={this.captureFile}/>
                  <input type="submit" value='Send Data to Smart Contract' class="btn btn-primary mb-2"/>*/}
                  <table className='table table-borderless'>
                    <br/>
                    <tr><td class='text-left'>Account </td><td class='text-left'>{this.state.account}</td></tr>
                    <tr><td class='text-left'>Contract Address </td><td class='text-left'>{this.state.address}</td></tr>
                    <tr><td class='text-left'>Transaction count</td><td class='text-left'>{this.state.txCount}</td></tr>
                    <tr><td class='text-left'>Transaction Hash </td><td class='text-left'>{this.state.txHash}</td></tr>
                    <tr><td class='text-left'>IPFS Hash</td><td class='text-left'>{a}</td></tr>
                    {/*<tr><td><button onClick={this.getData} class="text-left" type="button">Get Data From Contract</button></td><td>{this.state.getData}</td></tr>*/}
                 
                  </table>
                  
                  
                </form>
               <tr class='text-center'>
                 <td> <button type="button" class="btn btn-info" onClick={this.getAllBlock}>Blockchain get All Blocks</button></td>{' '}
                 <td> <DataIoT /></td>
                 <td> <button class="btn btn-info" onClick={()=>{this.getData(); this.setState({show:true})}}>Get Smart Contract Data</button></td>{' '}
                
                
               </tr>
                  {/*<button type="button" class="btn btn-secondary"  onClick={()=>{this.setState({show:true})}}>Data </button>{' '}*/}              
                  <table className='table table-borderless table-hover '> 
                   
                     {this.state.blocks.map(member =>
                      <table className='table table-borderless  table-striped'>
                        <tr><td colspan='2' class="table-dark">Block {member.num}</td></tr>
                        <br/>
                        <div style={{backgroundColor:'orange'}}>
                        <tr>
                              <td>Mined On <br/><SimpleDateTime dateSeparator="-" format="MYD" timeSeparator=":" meridians="1">{member.timestamp}</SimpleDateTime> </td>
                              <td class='text-left'>Block Hash <br/>{member.hash}</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td class='text-left'>parent Hash <br/>{member.parenthash}</td>
                        </tr>
                        <tr>
                          <td colspan='2'>TX Hash <br/>{member.transaction}</td>
                        </tr>
                        <tr>
                          <td>From <br/>{member.from}</td>
                          <td>To <br/>{member.to}</td>
                        </tr>
                        </div>
                      </table>
                      )}
                    </table>
              </div>
            </main>
          </div>
        </div>
       
        <Modal
              show={this.state.show}
              onHide={() => this.setState({show:false})}
            >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
               <h1 className="text-center"> Data stored in Smart Contract</h1>
               
              </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {this.state.getData}
               </Modal.Body>
               <Modal.Footer>
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>{this.setState({show:false})}}>Close</button>
              </Modal.Footer>
              </Modal>
     </div>
    );
  }
}
export default AppFile;