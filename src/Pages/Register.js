import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
 // colors
 const primary = '#000000';
 const secondary = '#1b1b1b';
 const ternary = '#ff153c';
 const tetra = '#808080' ;
 const fifth = '#dbeeff';
 // colors

 let [submit, setSubmit] = useState({
  name: '',
  password: ''
});
let setData = async (e) => {
  let { name, value } = e.target;

  setSubmit({
   ...submit, [name]: value
  })
}


function handleSubmit(e) {
  try {
    console.log('posted 1');
    e.preventDefault();
    console.log('posted 2');
    axios.post('https://scatch-gold.vercel.app/create', submit);
    console.log('posted 3'); 
  } catch (err) {
    console.log(err.message)
  }
}


  return (
    <div className={`h-screen flex flex-col justify-center items-center bg-[${primary}] text-[${fifth}]`}>
     <label className={`py-4 text-[18px] transition-[.2s] inline ${0 ? 'text-[red]' : 'text-[black]'}`}>Input is not valid</label>
        <form onSubmit={(e)=>handleSubmit(e)}>
         <div className={`bg-[${secondary}] rounded p-5 flex flex-col gap-6`}>

          <h1 className='text-center text-[28px] font-semibold'>Register</h1>

          <div className='flex flex-col gap-1'>
           <label>NAME</label>
           <input 
           type='text'
           value={submit.name} 
           onChange={setData}
           name='name' 
           className={`p-3 bg-[${primary}] outline-none`}
           />
          </div>

          <div className='flex flex-col gap-1'>
           <label>PASSWORD</label>
           <input 
           value={submit.password}
           onChange={setData}
           type='text' 
           name='password' 
           className={`p-3 bg-[${primary}] outline-none`}
           />
          </div>

          <div className='flex justify-center pt-5'>
           <button className={`bg-[${ternary}] px-4 py-2`}>Submit</button>
          </div>

          <div className='text-center text-[#18f0ff] text-[13px]'>
          <Link to='/'><a href='/' className='text-center'>Already have an account!</a></Link>
          </div>

         </div>
        </form>
    </div>
  )
}
