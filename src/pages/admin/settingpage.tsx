import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
export default function SettingPage(){
  const navigate = useNavigate()
  
  const [session , setSession] = useState<any>(null)
  useEffect(()=>{
    const js = JSON.parse(localStorage.getItem('session') || 'false')
    if(js && js.uid > 0){
        if(!js.is_admin){
            navigate("/")
        }
        setSession(js)
    } else {
      navigate("/auth/login")
    }
  }, [])

  const [settingData, setSettingData] = useState({
    voted_interval: 0,
    voted_points: 0,
  })
  useEffect(()=>{
    fetch(process.env.REACT_APP_API_ENDPOINT+`/admin/setting`, {
      method: 'GET',
    }).then(response=>response.json()).then((res:any)=>{
      setSettingData(res)
    })
  },[])


  function handleSettingFunction(e:any){
    e.preventDefault()
    if(e.target.voted_interval.value <= 0 || e.target.voted_points.value <= 0){
      toast.error("ค่าไม่ถูกต้อง", {
        position: 'bottom-right',
        autoClose: 1500
      })
      return
    }
    const data = {
      username: session?.username,
      voted_interval: settingData.voted_interval,
      voted_points: settingData.voted_points,
    }

    axios.post(process.env.REACT_APP_API_ENDPOINT+"/admin/setting", data)
    .then(
    (res)=>{
      if(res.data.err){
      }
      toast.success("บันทึกการตั้งค่าแล้ว", {
        position: 'bottom-right',
        autoClose: 1500
      })
      // localStorage.setItem('session',JSON.stringify(res.data))
    }
    ).catch((err)=>{
      console.log(err.response.data)
      
      toast.error(err.response.data.err, {
        position: 'bottom-right',
        autoClose: 1500
      })
    })
  }

    return <>
        <main className="relative h-full grid grid-rows-[auto_1fr] pb-24">
            <div className="flex justify-center lg:mt-10">
                <p className="lg:text-xl font-light bg-white/60 px-4 pb-1 pt-2 rounded-lg">ตั้งค่าระบบ</p>
            </div>
            <div className="px-20 mx-auto w-full h-full mt-10">
                <div className="w-full h-full bg-white/80 rounded-xl p-10">
                  <form onSubmit={handleSettingFunction} className='relative w-full h-full'>
                    <div className="items-center gap-4 mb-4">
                      <p>เวลาในการโหวต</p>
                      <div className="relative w-full min-w-[200px] h-10 mt-2">
                        <input
                          className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                          placeholder=" "
                          type='number'
                          id="voted_interval"
                          value={settingData.voted_interval}
                          onChange={(e:any)=>{setSettingData(prev=>({...prev, voted_interval: e.target.value}))}}
                          /><label
                          className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                            เวลาในการโหวต
                        </label>
                      </div>
                    </div>
                    <div className="items-center gap-4 my-4">
                      <p>ตัวแปรคำนวณคะแนน</p>
                      <div className="relative w-full min-w-[200px] h-10 mt-2">
                        <input
                          className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                          placeholder=" "
                          type='number'
                          id="voted_points"
                          value={settingData.voted_points}
                          onChange={(e:any)=>{setSettingData(prev=>({...prev, voted_points: e.target.value}))}}
                          /><label
                          className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                            ตัวแปรคำนวณคะแนน
                        </label>
                      </div>
                    </div>
                    <button type="submit" className={`absolute bottom-0 right-0 bg-green-300 border-green-600 text-slate-800 font-normal pt-2 pb-1 px-3 rounded-md border-b-2 text-xl hover:border-2 hover:border-green-400 hover:bg-green-100 transition-all duration-75`}>บันทึกการตั้งค่า</button>
                  </form>
                  {/* <button className="flex items-center gap-2 text-black/50 hover:text-black/80 text-sm"><i className="bx bx-sort-alt-2 text-lg lg:text-3xl"></i> <p>ได้รับคะแนนโหวต</p></button> */}
                </div>
            </div>
        </main>
        {/* <section className="bg-gradient-to-t from-orange-200 fixed w-full h-full top-0 left-0 -z-10" /> */}
    </>
}