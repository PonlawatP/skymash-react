import { useEffect, useState } from 'react'
import SkyCardBadge from '../../components/skycardbadge'
import SkyCard from '../../components/skycard'
import { useNavigate, useParams } from 'react-router-dom'

export default function ProfilePage() {
  const {profile_id} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    console.log(profile_id)
    if(profile_id == undefined){
      const js = JSON.parse(localStorage.getItem('session') || 'false')
      if(js && js.uid > 0){
        navigate("/profile/"+js.username)
      } else {
        navigate("/auth/login")
      }
    }
  },[])
  
  function passIcon(pass=false){
    return <i className={"bx bx-check text-4xl "+(!pass?"text-black/10":"text-green-600")}></i>
  }
  const [popStatus, setPopStatus] = useState({init: false, edit: false, password: false})

  useEffect(()=>{
    setPopStatus({...popStatus, init: true})
  }, [])

  function handleTogglePopupEdit(){
    setPopStatus({...popStatus, edit:!popStatus.edit})
  }

  function handleTogglePopupPasswd(){
    setPopStatus({...popStatus, password:!popStatus.password})
  }
  return (
    <>
      <main className="container mx-auto">
        <div className="flex flex-col-reverse gap-20 items-center xl:items-start xl:flex-row xl:max-w-[82em] xl:mx-auto">
          <div className="flex flex-col items-center gap-4">
            <p className="w-fit text-xl font-light bg-white/60 px-4 pb-1 pt-2 rounded-lg">รูปท้องฟ้าโดดเด่นของโปรไฟล์</p>
            <SkyCardBadge title="ชื่อรูปภาพชื่อรูปภาพชื่อรูปภาพชื่อรูปภาพ" score={32} tag={1} rank={1}></SkyCardBadge>
          </div>

          <div className="mt-20">
            <div className="flex flex-col sm:flex-row gap-10 items-center">
              <img src='https://cdn-icons-png.freepik.com/512/3135/3135715.png' alt='' width={170} height={170} className='rounded-full aspect-square object-cover border-2 border-white/30'></img>
              <div className="">
                <div className="relative flex justify-between">
                  <h2 className="text-4xl text-center sm:text-start font-semibold">User</h2>
                  <button onClick={handleTogglePopupEdit}><i className="bx bx-edit text-4xl"></i></button>
                </div>
                <div className="mt-5 flex">
                  <div className="flex flex-col items-center w-44 border-r-2 border-slate-400/60">
                    <h3 className="text-2xl font-medium">4</h3>
                    <h4 className="font-light mt-1">ท้องฟ้าที่ส่งประกวด</h4>
                  </div>
                  <div className="flex flex-col items-center w-44 border-r-2 border-slate-400/60">
                    <h3 className="text-2xl font-medium">4</h3>
                    <h4 className="font-light mt-1">ได้รับคะแนนโหวต</h4>
                  </div>
                  <div className="flex flex-col items-center w-44">
                    <h3 className="text-2xl font-medium">4</h3>
                    <h4 className="font-light mt-1">ส่งคะแนนโหวต</h4>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-14 font-light px-6 sm:px-0">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 mt-8 max-w-[82em] mx-auto items-end justify-center">
          <SkyCardBadge rank={1}/>
          <SkyCard/>
          <SkyCardBadge rank={3}/>
          <SkyCard/>
          <SkyCard/>
        </div>
        {/* overlay */}
        {
          popStatus.init ? <>
          <section className={`transition-all duration-200 ${popStatus.edit ? "bg-black/20 backdrop-blur-sm" : "opacity-0 invisible"} w-full h-full fixed top-0 left-0 grid items-center justify-center`}>
            <div className="w-[26em] p-6 bg-slate-50 rounded-xl">
              <div className="flex justify-between">
                <h3 className='font-semibold text-2xl'>แก้ไขข้อมูล</h3>
                <button onClick={handleTogglePopupEdit}><i className="bx bx-x text-3xl"></i></button>
              </div>
              <img src='https://cdn-icons-png.freepik.com/512/3135/3135715.png' alt='' width={170} height={170} className='my-4 mx-auto rounded-full aspect-square object-cover border-2 border-white/30'></img>
              <div className="flex flex-between items-center gap-4 mb-4">
                  
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" " /><label
                  className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">ชื่อผู้ใช้
                </label>
              </div>
                  {passIcon(true)}
              </div>
              <div className="relative mt-4 w-full min-w-[200px]">
                <textarea
                  className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "></textarea>
                <label
                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  แนะนำตัวเอง
                </label>
              </div>
              <button onClick={handleTogglePopupPasswd} className={`mt-10 mb-3 bg-blue-200 border-blue-500 text-slate-800 font-normal pt-2 pb-1 px-3 rounded-md border-b-2 text-xl hover:border-2 hover:border-blue-300 hover:bg-white transition-all duration-75 w-full`}>เปลี่ยนรหัสผ่าน</button>
              <button className={`bg-green-300 border-green-600 text-slate-800 font-normal pt-2 pb-1 px-3 rounded-md border-b-2 text-xl hover:border-2 hover:border-green-400 hover:bg-green-100 transition-all duration-75 w-full`}>อัพเดตข้อมูล</button>
            </div>
          </section>

          <section className={`transition-all duration-200 ${popStatus.password ? "bg-black/20 backdrop-blur-sm" : "opacity-0 invisible"} w-full h-full fixed top-0 left-0 grid items-center justify-center`}>
            <div className="w-[26em] p-6 bg-slate-50 rounded-xl">
              <div className="flex justify-between">
                <h3 className='font-semibold text-2xl'>เปลี่ยนรหัสผ่าน</h3>
                <button onClick={handleTogglePopupEdit}><i className="bx bx-x text-3xl"></i></button>
              </div>
              <div className="flex flex-between items-center gap-4 my-4">
                <div className="relative w-full min-w-[200px] h-10">
                  <input
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" "
                    type='password'
                    /><label
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      รหัสผ่านเก่า
                  </label>
                </div>
              </div>
              <div className="flex flex-between items-center gap-4 mb-4">
                <div className="relative w-full min-w-[200px] h-10">
                  <input
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" "
                    type='password'
                    /><label
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      รหัสผ่านใหม่
                  </label>
                </div>
                  {passIcon(true)}
              </div>
              <div className="flex flex-between items-center gap-4 mb-4">
                <div className="relative w-full min-w-[200px] h-10">
                  <input
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" "
                    type='password'
                    /><label
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      รหัสผ่านใหม่อีกครั้ง
                  </label>
                </div>
                  {passIcon(false)}
              </div>
              <button onClick={handleTogglePopupPasswd} className={`bg-green-300 border-green-600 text-slate-800 font-normal pt-2 pb-1 px-3 rounded-md border-b-2 text-xl hover:border-2 hover:border-green-400 hover:bg-green-100 transition-all duration-75 w-full`}>อัพเดตข้อมูล</button>
            </div>
          </section>
          </> : null
        }
      </main>
    </>
  );
}
