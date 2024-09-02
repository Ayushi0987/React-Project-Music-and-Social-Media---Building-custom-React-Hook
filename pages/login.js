import Link from 'next/link'
import React, {useState} from 'react'
import css from '@/styles/Login.module.css'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import constants from '@/constants'
const {BASE_API_PATH, PROJECT_ID, APP_TYPE} = constants;

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();
  const router = useRouter();

  async function callLoginApi() {
    try {
      const response = await fetch(`${BASE_API_PATH}/api/v1/user/login`, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          "projectId": PROJECT_ID
        },
        body: JSON.stringify({email, password, appType: APP_TYPE})
      });
      // if (!response.ok) {
      //   const data = await response.json();
      //   throw new Error(data.message)
      // }
      const data = await response.json();
      setEmail('');
      setPassword('');
      login(data.token, data?.data?.user?.name);
      router.push('/');
    }
    catch (err) {
      // alert(err.message);
      console.log(err);
    }
  }

  function handleLogin(e){
    e.preventDefault();
    if(email.length <= 0 || password.length <= 0){
      alert('Please enter all the details');
      return;
    }
    callLoginApi();
  }
  return (
    <section className={` ${css.container}`}>
      <form className={`flex ${css.login}`} onSubmit={handleLogin}>
        <label htmlFor=''>Email</label>
        <input type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        <label htmlFor=''>Password</label>
        <input type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        <button type='submit'>Sign In</button>
        <p>Dont't have an account?</p>
        <Link href={'/signup'}><button>SignUp here</button></Link>
      </form>
    </section>
  )
}
