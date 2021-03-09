import {BrowserRouter, Route, Switch}  from 'react-router-dom';
import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import logophoto from '../Smartech.png';
import { useHistory } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from "react-bootstrap-table2-paginator"
import * as ReactBootstrap from 'react-bootstrap'
//import {Button,Modal} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Link } from "react-router-dom";
import cellEditFactory from 'react-bootstrap-table2-editor';
import {Button,Modal,ButtonGroup} from 'react-bootstrap'
import { useForm } from "react-hook-form";

//import Modal from 'react-modal'
const Pagination = () => {

    const { register, handleSubmit, errors } = useForm();
    let history = useHistory();
    const [editMsg, setEditMsg] = useState('');
    const [deleteMsg, setDeletMsg] = useState('');
    const [editShow, setEditShow] = useState(false);
    const [deleteShow, setDeleteShow]=useState(false)
    const [users, setUsers]     = useState([]);
    const [edit, setEdit] = useState(false)
    const [delet,setDelete]=useState(false)
    const [date,setDate]=useState('')
    const [fname,setFname]=useState('')
    const [lname,setLname]=useState('')
    const [email,setEmail]=useState('')
    const [tel,setTel]=useState('')
    const [id,setId]=useState()
    const [password,setPassword]=useState('')
    const [passwordC,setpasswordC]=useState('')          
    const { SearchBar, ClearSearchButton } = Search;
    const [addBox ,setAddBox] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => { setEditMsg('') }, 1500);
        return () => clearTimeout(timer);
      }, [editMsg]);
      useEffect(() => {
        const timer = setTimeout(() => { setDeletMsg('') }, 1500);
        return () => clearTimeout(timer);
      }, [deleteMsg]);
    const updateUser = async () =>{
       
            Axios.put(`http://localhost:3001/api/editUser/`,{id:id,fname:fname,lname:lname,email:email,password:password,tel:tel,date:date})
            const data = await Axios.get('http://localhost:3001/api/get')
            //console.log(data.data)
            getUsersData()
            //setEditMsg(<div class="alert alert-warning"role="alert">Row Updated</div>)
            //setEdit(true)
            setEditShow(false)
      
        
            
    }

    const getUsersData = async () => {
        try {
            const data = await Axios.get('http://localhost:3001/api/get')
            setUsers(data.data)
        } catch (e) {
            console.log(e)
        }
    }

   useEffect (()=>{
    getUsersData();
 },[])
 useEffect (()=>{
    updateUser();
 },[])
    const deleteUser =(id) =>{
        
        Axios.delete(`http://localhost:3001/api/delete/${id}`)
       
        const updateUsers = [...users].filter(i => i.id !== id);
         setUsers(updateUsers);
         setDelete(true);
         setDeleteShow(false)
         
    }
   
    const addButtonLancamento = (cell, row) => {
     return(
         <div>
                  <Button  className="btn btn-warning badge-pill" 
                      onClick={()=>{
                      setEditShow(true)
                      setId(row.id)
                      setFname(row.first_name);
                      setLname(row.last_name);
                      setEmail(row.email);
                      setPassword(row.password);
                      setTel(row.tel);
                      setDate(row.date)
                  }}>Edit</Button>{' '}
                  <Button className="btn btn-danger  badge-pill" 
                  style={{width:'60px',margin: '0 auto;'}}
                      onClick={() =>{ 
                      setDeleteShow(true);
                      setId(row.id)
                      setFname(row.first_name);
                      setLname(row.last_name);
                      setEmail(row.email);
                      setPassword(row.password);
                      setTel(row.tel);
                      setDate(row.date)
                      }}>Delete</Button>
        </div>
     ) 

       }
    
    const columns =[{dataField : 'id',         text :'ID',width:'10px' }, 
                    {dataField : 'first_name', text :'First_Name'},
                    {dataField : 'last_name',  text :'Last_Name'},
                    {dataField : 'email',      text :'Email'},
                    {dataField : 'password',   text :'Password'},
                    {dataField : 'tel',        text :'Tél',},
                  //  {dataField : 'date',       text :'Date of Birth'},
                    {dataField : 'Action',     text :'Action',formatter: addButtonLancamento
                }                    
                ]
     const pagination = paginationFactory({
        page: 2,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: 'next',
        prePageText: 'prev',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
          console.log('page', page);
          console.log('sizePerPage', sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
          console.log('page', page);
          console.log('sizePerPage', sizePerPage);
        }});
      const container = <ToolkitProvider
      bootstrap4
      keyField='id'
      data={users}
      columns={columns}
      search
  >
  {
  props => (
      
      <div>
      <SearchBar {...props.searchProps} />
      <ClearSearchButton {...props.searchProps} /><br/>
      <div className='text-right'>
      <Link className="btn btn-primary badge-pill" to="/users/add">Add User </Link>
      <br/>
      </div>
      <BootstrapTable
          pagination={pagination}
          {...props.baseProps}
      />
      </div>
  )
  }
  
</ToolkitProvider>
  const handleKeyPress = e =>{
    setAddBox(true)
}

<input type="password"
       value ={passwordC}
       name='passwordC'
       className="form-control"
       placeholder="Re Enter Password" 
       onChange={(e)=>{setpasswordC(e.target.value)}}
       ref={register({
        validate: value =>value === password || <div className="text-danger">Password not match</div>})}
    />
     {errors.passwordC && <p>{errors.passwordC.message}</p>}

 
const add = addBox ? ( <tr><td>Confirm Password:  </td>
                         <td><input type="password"
                                    value ={passwordC}
                                    name='passwordC'
                                    className="form-control"
                                    placeholder="Re Enter Password" 
                                    onChange={(e)=>{setpasswordC(e.target.value)}}
                                    ref={register({
                                    validate: value =>value === password || <div className="text-danger">Password not match</div>})}
                          />
                                          {errors.passwordC && <p>{errors.passwordC.message}</p>}
                            </td></tr>) :(<div> </div>)
    return (
        <div className="container">  
            <Modal
                show={deleteShow}
                onHide={() => setDeleteShow(false)}
             >
          <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Delete User
             </Modal.Title>
           </Modal.Header>
            <Modal.Body>
                Are you sure to delte  this User ?
                <table>
                       <tr><div style={{color: "red"}}><td>{'  '}</td><td><h2>{fname}</h2></td><td>{'  '}</td><td><h2>{lname}</h2></td></div></tr></table>
                <button type="button" className="btn btn-danger"  data-dismiss="modal" onClick={()=>{setDeletMsg(<div class="alert alert-danger" role="alert">Row Deleted</div>); deleteUser(id)}}>Delete</button>
            </Modal.Body>
            <Modal.Footer>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>{setDeleteShow(false)}}>Close</button>
            </Modal.Footer>
          </Modal>
            <Modal
                show={editShow}
                onHide={() => setEditShow(false)}
            >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                Edit User
                </Modal.Title>
                    </Modal.Header>
                <Modal.Body>
                <table>
                        <tr><td>ID : {id}</td></tr>
                        <tr><td>First_Name:</td><td><input type='text' value={fname} onChange={(e)=>{setFname(e.target.value)}} /></td></tr>
                        <tr><td>Last_Name: </td><td><input type='text' value={lname} onChange={(e)=>{setLname(e.target.value)}} /></td></tr>
                        <tr><td>Emai:     </td><td><input  type='text' value={email} onChange={(e)=>{setEmail(e.target.value)}} /></td></tr>
                        <tr><td>Password:  </td><td><input type='password'name='password'  onClick={handleKeyPress} value={password} onChange={(e)=>{setPassword(e.target.value)}} /></td></tr>
                        {add}
                        <tr><td>Tél:       </td><td><input type='text' value={tel} onChange={(e)=>{setTel(e.target.value)}} /></td></tr>
                        <tr><td>Date:      </td><td><input type='date' value={date} onChange={(e)=>{setDate(e.target.value)}} /></td></tr>
                    </table>
                </Modal.Body>
                <Modal.Footer>
               
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>{setEditShow(false)}}>Close</button>
                <button type="button" className="btn btn-primary"  onClick={()=>{setEditMsg(<div class="alert alert-warning"role="alert">Row Updated</div>);updateUser(fname,lname,email,password,tel,date);}}>Save changes</button>
                {/*setEditMsg(<div class="alert alert-warning"role="alert">Row Updated</div>) */}
                </Modal.Footer>
            </Modal>
            
            <br/><br/>
            {/*loading ? ({container}):(<ReactBootstrap.Spinner animation='border'/>)*/}
            {container}
            {/*<img src={logophoto}   width="800" height="250"/>*/}
            {editMsg || null}
            {deleteMsg || null}
        </div>
    )
}

export default Pagination