/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate()

  useEffect(()=>{
    const js = JSON.parse(localStorage.getItem('session') || 'false')
    if(js && js.uid > 0){
      navigate("/")
    }
  })

  function handleLoginFunction(e:any){
    e.preventDefault()
    const data = { 
      username: e.target.username.value,
      password: e.target.password.value
    }

    axios.post(process.env.REACT_APP_API_ENDPOINT+"/login", data)
    .then(
    (res)=>{
      console.log(res.data)
      // setSession(res.data)
      localStorage.setItem('session',JSON.stringify(res.data))
      navigate("/")
    }
    ).catch((err)=>{
      console.log(err)
    })
  }
  
  return (
    <>
      {/* <Head>
        <title>เข้าสู่ระบบ : ShyMash</title>
      </Head> */}
      <section className="relative bg-gradient-to-t from-pr-blue/80 to-pr-bg h-full flex items-center justify-center z-10">
          <div className="bg-gray-100 px-5 py-12 md:w-96 rounded-2xl shadow-lg">
            <div className="px-8">
              <h2 className="font-bold text-2xl text-blue-700">เข้าสู่ระบบ</h2>
              <form onSubmit={(e)=>{handleLoginFunction(e)}} className="text-sm flex flex-col gap-4 mt-4">
                <input
                  type="text"
                  id="username"
                  className="p-2 rounded-xl border"
                  placeholder="Email / ชื่อผู้ใช้"
                />
                <input
                  type="password"
                  id="password"
                  className="p-2 rounded-xl border w-full"
                  placeholder="รหัสผ่าน"
                />
                <button className={`bg-blue-300 border-blue-600 text-slate-800 font-normal pt-2 pb-1 px-3 rounded-md border-b-2 hover:border-2 hover:border-blue-400 hover:bg-blue-100 transition-all duration-75 w-full`}>เข้าสู่ระบบ</button>
              </form>
              <div className="mt-2 text-xs text-[#002D74] underline">
              </div>
            </div>

            <div className="px-8 mt-5 text-xs flex justify-between items-center">
                <p className="text-gray-400">คุณยังไม่มีบัญชีใช่หรือไม่?</p>
                <Link to={{pathname: "/auth/register"}} className="text-[#002D74]">
                  สมัครสมาชิก
                </Link>
              </div>
          </div>
      </section>
      <div className="logo-rainslide"/>
    </>
  );
}

export default LoginPage