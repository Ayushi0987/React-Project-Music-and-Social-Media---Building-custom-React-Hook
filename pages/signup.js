import React, { useState } from 'react'
import Link from 'next/link';
import css from '@/styles/Login.module.css'
import constants from '@/constants'
import { useRouter } from 'next/router';
const {BASE_API_PATH, PROJECT_ID, APP_TYPE} = constants;

export default function signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function callSignUpApi() {
    // console.log(BASE_API_PATH);
    // console.log(PROJECT_ID);
    try {
      const response = await fetch(`${BASE_API_PATH}/api/v1/user/signup`, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          "projectId": PROJECT_ID
        },
        body: JSON.stringify({name, email, password, appType: APP_TYPE})
      });
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      const data = await response.json();
      setName('');
      setEmail('');
      setPassword('');
      router.push('/login');
    }
    catch (err) {
      console.error(err);
      alert('Signup failed. Please try again.');
    }
  }

  function handleSignUp(e){
    e.preventDefault();
    if(name.length <= 0 || email.length <= 0 || password.length <=0){
      alert('Please enter all the details')
      return;
    }
    if(name.length < 5){
      alert('Name canot be less than 5 characters');
      return;
    }
    callSignUpApi();
  }

return (
    <section className={` ${css.container}`}>
      <form className={`flex ${css.login}`} onSubmit={handleSignUp}>
        <label htmlFor=''>Name</label>
        <input type='text' name='name' value={name} onChange={(e)=>setName(e.target.value)}></input>
        <label htmlFor=''>Email</label>
        <input type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        <label htmlFor=''>Password</label>
        <input type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        <button type='submit'>Sign Up</button>
        <p>Already have an account?</p>
        <Link href={'/login'}><button>Sign In</button></Link>
      </form>
    </section>
  )
}
