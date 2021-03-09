import axios from 'axios';
import React, { useState ,useEffect} from 'react'
import { useHistory, Link } from "react-router-dom";
import './style.css'
import Axios from 'axios'
import logophoto from '../Smartech.png';
import { useForm } from "react-hook-form";


const Login = () => {
    const { register, handleSubmit, errors } = useForm();

    let history = useHistory();

    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [warning, setWarning]= useState(false)
    const [user, setUser] = useState (0)
  

    const submit = (data, e) => {
        e.preventDefault()
        Axios.get('http://localhost:3001/api/getU',{ params: {
            email: email,
            password: password}
      }).then(res=>{
          if(res.data.length >0){
              history.push('/Statistiques')
          }else{
              window.alert('Email or Password not exist !!')
          }
        })
        /*let req1 = `http://localhost:3001/api/getUserByEmail/${email}` 
        let req2 = `http://localhost:3001/api/getUserByPassword/${password}`
        const axios1 = Axios.get(req1)
        const axios2 = Axios.get(req2)
        Axios.all([axios1, axios2]).then(res=>{
            console.log(res[0].data.length)
            console.log(res[1].data.length)


            if (res[0].data.length > 0 && res[1].data.length > 0) {
                history.push('/Statistiques')
            }else{
                window.alert('data not exist !!')
            }
        })*/
            /*if (res[0].data.length >0) setExistEmail(true) if (res[1].data.length >0) setExistPassword(true)*/

       
        
       
     //   Axios.get(`http://localhost:3001/api/getUser/${email}`, {
          /*  Axios.get(`http://localhost:3001/api/getUser/`, {
            params: {
              email: email,
              password: password
        }})
        .then(res => {
          //console.log(res.data.length > 0)
          if (res.data.length >0 ) {
              //setExist(true) 
              history.push('/statistiques')} else {
                  console.log(res.data)
              setEmail('')
              setPassword('')
              window.alert('data not exist !!')
             
          } },[])*/
        
        /*
        if (exist){
            history.push('/Welcome') 
        }else {
            exist && setExist(false)
        }*/
       
    }
    //const msg  = !exist && <div className="alert alert-danger" role="alert">data existe</div>
    
    const msgError =  warning && <div className="alert alert-danger" role="alert">
        password must have 8 caracter at least
  </div>
        return (
            <div className="c1">
            <div className="c2">
            <form onSubmit={handleSubmit(submit)}>
                <h3>Sign In</h3>

             <div className="form-group">
                    <label>Email address</label>
                    <span style={{color: "red"}}>*</span>
                    <input
                        type="email"
                        name='email'
                        value= {email}
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
                    <label>Password</label>
                    <span style={{color: "red"}}>*</span>
                    <input type="password" name="password" value ={password} className="form-control" placeholder="Enter Password" 
                    onChange={(e)=>{setPassword(e.target.value)}} 
                    ref={register({required:true, minLength: 8 })}
                    />
                    {errors.password && errors.password.type === "required"  && <div className="text-danger">You must specify a password</div> }               
                    {errors.password && errors.password.type === "minLength" && <div className="text-danger">Minimum 8 characters are allowed</div> }
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Don't have an account  <a href="sign-up">Sign-up?</a>
                </p>
               
            </form>            {msgError}
                        <img src={logophoto}   width="200" height="100"/>

</div></div>
        );
}

export default Login
