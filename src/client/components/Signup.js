import React, { useState,useEffect } from 'react'
import './User.css'
import Axios from 'axios'
import './style.css'
import {Form} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

function Signup (){

    const { register, handleSubmit, errors } = useForm();
    let history = useHistory();
    const [date, setDate] = useState('')
    const [fname,setName] = useState('')
    const [lname,setLName] = useState('')
    const [email, setEmail] = useState('')
    const [emailC, setEmailC] = useState('')
    const [password,setPassword] = useState('')
    const [passwordC,setpasswordC] = useState('')
    const [tel, setTel] = useState('')
    const [addBoxn ,setAddBox] = useState(false)
    const [listUser, setUserList]= useState([])
    const onSubmit =(data,e)=>{
       
       //e.preventDefault()
            Axios.get('http://localhost:3001/api/getU',{ params: {email: email,password: password}})
            .then(res=>{
                console.log(res)
              if (res.data.length>0){
                  window.alert('Email || Password exist !!')
              }else{
                  console.log(date)
                Axios.post('http://localhost:3001/api/insert',
                {fname:fname,lname:lname,email:email,password:password,tel:tel,date:date
                }).then(res=>{
                    console.log(res.data)
                    history.push('/sign-in')
                })
              }
            })
}
const handleKeyPress = e =>{
      setAddBox(true)
}
    return (
        
        <div className='container'>
        <div className="c1">
        <div className="c2">
        <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Sign Up</h3>
       
        <div className="form-group">
            <label> First Name</label>
            <span style={{color: "red"}}>*</span>
            <input type="text"
                   value={fname}
                   name='fname'
                   className="form-control" 
                   placeholder="First Name" 
                   onChange={(e)=>{setName(e.target.value)}}
                   ref={register({required: true, minLength : 3, maxLength: 35, pattern: /^[A-Za-z]+$/i })}
                   />
                    {errors.fname && errors.fname.type === "required"  && <div className="text-danger">Please enter your First Name</div>}
                    {errors.fname && errors.fname.type === "minLength" && <div className="text-danger">Min Length is 3</div> }
                    {errors.fname && errors.fname.type === "maxLength" && <div className="text-danger">Maximum 35 characters are allowed</div> }
                    {errors.fname && errors.fname.type === "pattern"   && <div className="text-danger">Enter a valid value !!</div> }   
        </div>
        <div className="form-group">
            <label> Last Name</label>
            <span style={{color: "red"}}>*</span>
            <input type="text"
                   value = {lname}
                   name ='lname'
                   className="form-control"
                   placeholder="Last Name" 
                   onChange={(e)=>{setLName(e.target.value)}} 
                   ref={register({required: true, minLength : 3, maxLength: 35, pattern: /^[A-Za-z]+$/i })}
                   />
                    {errors.lname && errors.lname.type === "required"  && <div className="text-danger">Please enter your Last Name</div>}
                    {errors.lname && errors.lname.type === "minLength" && <div className="text-danger">Min Length is 3</div> }
                    {errors.lname && errors.lname.type === "maxLength" && <div className="text-danger">Maximum 35 characters are allowed</div> }
                    {errors.lname && errors.lname.type === "pattern"   && <div className="text-danger">Enter a valid value !!</div> }
        </div>
        
        <div className="form-group">
            <label>Email</label>
            <span style={{color: "red"}}>*</span>
            <input type="email"
                   value= {email} 
                   onClick={handleKeyPress}
                   name= 'email'
                   className="form-control"
                   placeholder="Enter Email" 
                   onChange={(e)=>{setEmail(e.target.value)}} 
                   ref={register({required: true, minLength : 6,maxLength: 35, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                />
                 {errors.email && errors.email.type === "required"  && <div className="text-danger">Please enter your email address</div>}
                 {errors.email && errors.email.type === "minLength" && <div className="text-danger">Please enter your email address</div> }
                 {errors.email && errors.email.type === "maxLength" && <div className="text-danger">Maximum 35 characters are allowed</div> }
                 {errors.email && errors.email.type === "pattern"   && <div className="text-danger">Enter a valid email address</div> } 
        </div>
        <div className="form-group">
            <label>Confirm Email</label>
            <span style={{color: "red"}}>*</span>
            <input type="email"
                   value= {emailC} 
                   name= 'emailC'
                   className="form-control"
                   placeholder="Re Enter Email" 
                   onChange={(e)=>{setEmailC(e.target.value)}} 
                   ref={register({
                    validate: value =>value === email || <div className="text-danger">Email not match</div>})}
                />
                 {errors.emailC && <p>{errors.emailC.message}</p>}
        </div>

        <div className="form-group">
            <label>Password</label>
            <span style={{color: "red"}}>*</span>
            <input type="password"
                   value ={password}
                   name='password'
                   className="form-control"
                   placeholder="Enter Password" 
                   onChange={(e)=>{setPassword(e.target.value)}}
                   ref={register({required:true, minLength: 8 })}
                   />
                    {errors.password && errors.password.type === "required"  && <div className="text-danger">You must specify a password</div> }               
                    {errors.password && errors.password.type === "minLength" && <div className="text-danger">Minimum 8 characters are allowed</div> }
        </div>
        <div className="form-group">
            <label>Confirm Password</label>
            <span style={{color: "red"}}>*</span>
            <input type="password"
                   value ={passwordC}
                   name='passwordC'
                   className="form-control"
                   placeholder="Re Enter Password" 
                   onChange={(e)=>{setpasswordC(e.target.value)}}
                   ref={register({
                    validate: value =>value === password ||  <div className="text-danger">Password not match</div>})}
                />
                 {errors.passwordC && <p>{errors.passwordC.message}</p>}
        </div>
        <div className="form-group">
            <label>Tél</label>
            <span style={{color: "red"}}>*</span>
            <input type="number"
                   value ={tel}
                   name='tel'
                   className="form-control"
                   placeholder="(+216) 98 584 475" 
                   onChange={(e)=>{setTel(e.target.value)}}
                   ref={register({required:true, minLength: 8 })}
                   />
                    {errors.tel && errors.tel.type === "required"  && <div className="text-danger">You must specify a Tel number</div> }               
                    {errors.tel && errors.tel.type === "minLength" && <div className="text-danger">Minimum 8 characters are allowed</div> }
        </div>
        <div className="form-group">
            <label>Date of Birth</label>
            <span style={{color: "red"}}>*</span>
            <input type="date"
            value ={date}
            name='date'
            className="form-control"
            placeholder="Date of Birth"
            onChange={(e)=>{setDate(e.target.value)}}/>
     </div>
      

        <button type="submit" className="btn btn-primary btn-block"/* onClick={submit}*/>Sign Up</button>
                <p className="forgot-password text-right">Already registered <a href="/sign-in">sign in?</a></p>
    </form>
        </div>
        </div>
        </div>
    )
}
export default  Signup