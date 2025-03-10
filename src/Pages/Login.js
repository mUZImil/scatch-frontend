import React, { useState, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
// axios.defaults.withCredentials = true; 

export default function Login() {
  // colors
  const primary = '#000000';
  const secondary = '#1b1b1b';
  const ternary = '#ff153c';
  const tetra = '#808080';
  const fifth = '#dbeeff';
  // colors

  const navigate = useNavigate();

  let [submit, setSubmit] = useState({
    name: '',
    password: ''
  });
  const [cookies, setCookies] = useState({});
  let [toLink, setToLink] = useState(false);
  let setData = async (e) => {
    let { name, value } = e.target;

    setSubmit({
     ...submit, [name]: value
    })
  }


 async function handleSubmit(e) {
    try {
      e.preventDefault();
      let res = await axios.post('http://localhost:3004/find', submit);
      console.log('post', res.data)
      // const response = await axios.get('http://localhost:3001/get-cookie');
      // console.log('get', response.data.cookies)
      setCookies(res.data.cookies);
      setToLink(res.data)
    } catch (err) {
      console.log(err.message)
    }
  }

console.log(cookies)

  if(toLink){
    navigate('/home');
  }

  return (
    <div className={`h-screen flex flex-col justify-center items-center bg-[${primary}] text-[${fifth}]`}>
      <label className={`py-4 text-[18px] transition-[.2s] inline ${0 ? 'text-[red]' : 'text-[black]'}`}>Input is not valid</label>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={`bg-[${secondary}] rounded p-5 flex flex-col gap-6`}>

          <h1 className='text-center text-[28px] font-semibold'>Login</h1>

          <div className='flex flex-col gap-1'>
            <label>NAME</label>
            <input
              onChange={setData} 
              value={submit.name}
              type='text'
              name='name' 
              className={`p-3 bg-[${primary}] outline-none`} 
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label>PASSWORD</label>
            <input 
              onChange={setData} 
              value={submit.password}
              type='text' 
              name='password' 
              className={`p-3 bg-[${primary}] outline-none`}
             />
          </div>

          <div className='flex justify-center pt-5'>
            <button className={`bg-[${ternary}] px-4 py-2`}>Submit</button>
          </div>

          <div className='text-[#18f0ff] text-[13px]'>
            <Link to='/register'><a className='text-center'>Don't have an account? Register now</a></Link>
          </div>

        </div>
      </form>
    </div>
  )
}
