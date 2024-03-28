import { useEffect, useState } from 'react'
import SkyCardBadge from '../../components/skycardbadge'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function ProfilePage() {
  const {profile_id} = useParams()
  const navigate = useNavigate()
  const [session , setSession] = useState<any>(null)
  const [userData , setUserData] = useState<any>(undefined)
  const [userSkyData , setUserSkyData] = useState<any>(undefined)

  useEffect(()=>{
    const js = JSON.parse(localStorage.getItem('session') || 'false')
    setSession(js)
    setUserExistValue(js.username)
    setUserBio(js.bio)

      if(js && js.uid > 0){
        if(profile_id == undefined){
          navigate("/profile/"+js.username)
        }
      } else {
        navigate("/auth/login")
      }

    fetch(process.env.REACT_APP_API_ENDPOINT+`/profile/${profile_id}`, {
      method: 'GET',
    }).then(response=>response.json()).then((res:any)=>{
    if(res.err){
      navigate("/")
      return
    }
    setUserData(res)
    })

    fetch(process.env.REACT_APP_API_ENDPOINT+`/profile/${profile_id}/sky`, {
      method: 'GET',
    }).then(response=>response.json()).then((res:any)=>{
      setUserSkyData(res)
    })
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
  const [pass, setPass] = useState({value:"", success: false})
  function handleChangePassCheckFunction(e:any){
    setPass({...pass, success: pass.value == e.target.value})
  }

  const [userBio, setUserBio] = useState("")
  const [userExistValue, setUserExistValue] = useState("")
  const [userExist, setUserExist] = useState(false)
  function handleChangeUsernameCheckFunction(e:any){
    setUserExistValue(e.target.value);

    fetch(process.env.REACT_APP_API_ENDPOINT+`/checkuser/${e.target.value}`, {
      method: 'GET',
    }).then(response=>response.json()).then((res:any)=>{
      setUserExist(res.exist)
    })
  }

  function handleChangePassFunction(e:any){
    e.preventDefault()
    if(e.target.change_password.value != e.target.change_passwordc.value){
      toast.error("รหัสผ่านไม่ตรงกัน", {
        position: 'bottom-right',
        autoClose: 1500
      })
      return
    }
    const data = { 
      username: session?.username,
      password: e.target.password.value,
      change_password: e.target.change_password.value,
    }

    axios.post(process.env.REACT_APP_API_ENDPOINT+"/changepass", data)
    .then(
    (res)=>{
      if(res.data.err){
      }
      toast.success("สมัครสมาชิกสำเร็จ", {
        position: 'bottom-right',
        autoClose: 1500
      })
      // localStorage.setItem('session',JSON.stringify(res.data))
      setPopStatus({...popStatus, password: false})
    }
    ).catch((err)=>{
      console.log(err.response.data)
      
      toast.error(err.response.data.err, {
        position: 'bottom-right',
        autoClose: 1500
      })
    })
  }

  const [image, setImage] = useState<any>(undefined);
  const handleChangeUserDetailFunction = async (e:any) => {
    e.preventDefault()
    let formData = new FormData();
    formData.append("image", image);
    formData.append("username", e.target.username.value);
    formData.append("bio", e.target.bio.value);

    try {
      const response = await toast.promise(
        fetch(process.env.REACT_APP_API_ENDPOINT+"/profile/"+session?.uid, {
          method: 'PUT',
          body: formData,
        }),
        {
          pending: 'กำลังแก้ไขข้อมูล',
          success: '👌 แก้ไขข้อมูลสำเร็จ',
          error: 'เกิดข้อผิดพลาด 🤯'
        },
        {
          position: "bottom-right",
          autoClose: 1500,
        }
    );

      if (response.ok) {
        console.log('Image uploaded successfully!');
        // Reset the form or handle success
        const rs = await response.json()
        console.log(rs)
        const ss = {...session, ...rs.result}
        localStorage.setItem('session', JSON.stringify(ss))
        setSession(ss)
        setUserData({...userData, ...rs.result})
        setPopStatus({...popStatus, edit:false})
        navigate(`/profile/${rs.result.username}`)
        window.location.reload();
      } else {
        console.error('Image upload failed: ', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const [imagePreview, setImagePreview] = useState(null);
  const handleImage = (event:any) => {
      const file = event.target.files[0];
  
      const reader = new FileReader();
      reader.onload = () => {
          let a:any = reader.result
          setImagePreview(a);
      };
      reader.readAsDataURL(file);
      return file
  };

  return (
    <>
      <main className="container mx-auto">
        <div className="flex flex-col-reverse gap-20 items-center xl:items-start xl:flex-row xl:max-w-[82em] xl:mx-auto">

          <div className="flex flex-col items-center gap-4">
            <p className="w-fit lg:text-xl font-light bg-white/60 px-4 pb-1 pt-2 rounded-lg">รูปท้องฟ้าโดดเด่นของโปรไฟล์</p>
            {userSkyData?.popularSky == undefined ? <>
              <div className="relative w-full flex flex-col justify-center items-center h-[28rem]">
                <i className="bx bx-cloud text-[4rem] animate-bounce"></i>
                {session?.username != userData?.username ? <p>แย่จัง ไม่มีท้องฟ้าเลย</p> : <><p>ไม่มีท้องฟ้าเลย</p>
                <p>ร่วมแข่งขัน ประชันท้องฟ้ากับชาวท้องฟ้ากันเลย</p>

                <Link to={"/upload"}><button className={`mt-4 bg-blue-300 border-blue-600 text-slate-800 font-normal pt-2 pb-1 px-3 rounded-md border-b-2 text-xl hover:border-2 hover:border-blue-400 hover:bg-blue-100 transition-all duration-75`}>อัพโหลดท้องฟ้า</button></Link></>}
                
              </div>
            </> : <SkyCardBadge 
              id={userSkyData?.popularSky.skid}
              rank={userSkyData?.popularSky.rank}
              score={userSkyData?.popularSky.current_upvoted}
              title={userSkyData?.popularSky.title}
              tag={userSkyData?.popularSky.tag}
              profile_id={userSkyData?.popularSky.uid}
              profile_name={profile_id}
              pantone={userSkyData?.popularSky.pantone}
              color_code={userSkyData?.popularSky.color_code}
              img={`${process.env.REACT_APP_API_ENDPOINT}/sky/${userSkyData?.popularSky.skid}/img`}
            />}
            
          </div>

          <div className="lg:mt-20">
            <div className="flex flex-col sm:flex-row gap-10 items-center">
              <img src={userData ? process.env.REACT_APP_API_ENDPOINT+"/profile/"+userData?.username+"/img" : "https://cdn-icons-png.freepik.com/512/3135/3135715.png"} onError={(e:any)=>{e.target.src="https://cdn-icons-png.freepik.com/512/3135/3135715.png"}} alt='' width={170} height={170} className='rounded-full aspect-square w-[120px] h-[120px] lg:w-[170px] lg:h-[170px] object-cover border-2 border-white/30'></img>
              <div className="">
                <div className="relative flex justify-center gap-2 lg:gap-0 lg:justify-between">
                  <h2 className="text-xl lg:text-4xl text-center sm:text-start font-semibold">{userData?.username}</h2>
                  {session?.username != userData?.username ? null :
                    <button onClick={handleTogglePopupEdit}><i className="bx bx-edit text-2xl lg:text-4xl"></i></button>
                }
                </div>
                <div className="mt-5 grid grid-cols-3 lg:flex">
                  <div className="flex flex-col items-center lg:w-44 border-r-2 border-slate-400/60 px-2">
                    <h3 className="text-2xl font-medium">{userData?.upload_count}</h3>
                    <h4 className="font-light text-center mt-1">ท้องฟ้าที่ส่งประกวด</h4>
                  </div>
                  <div className="flex flex-col items-center lg:w-44 border-r-2 border-slate-400/60 px-2">
                    <h3 className="text-2xl font-medium">{userData?.voted_count}</h3>
                    <h4 className="font-light text-center mt-1">ได้รับคะแนนโหวต</h4>
                  </div>
                  <div className="flex flex-col items-center lg:w-44 px-2">
                    <h3 className="text-2xl font-medium">{userData?.voted_sended}</h3>
                    <h4 className="font-light text-center mt-1">ส่งคะแนนโหวต</h4>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-14 font-light px-6 sm:px-0">{userData?.bio}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 mt-8 max-w-[82em] mx-auto items-end justify-center mb-20">
          {userSkyData?.all.map((s:any, sindex:number)=><SkyCardBadge 
              key={sindex}
              id={s.skid}
              rank={s.rank}
              score={s.current_upvoted}
              title={s.title}
              tag={s.tag}
              profile_id={s.uid}
              profile_name={profile_id}
              pantone={s.pantone}
              color_code={s.color_code}
              img={`${process.env.REACT_APP_API_ENDPOINT}/sky/${s.skid}/img`}
            />)}
{/*           
          <SkyCard/>
          <SkyCardBadge rank={3}/>
          <SkyCard/>
          <SkyCard/> */}
        </div>
        {/* overlay */}
        {
          popStatus.init && session?.username == userData?.username ? <>
          <section className={`transition-all duration-200 ${popStatus.edit ? "bg-black/20 backdrop-blur-sm" : "opacity-0 invisible"} w-full h-full fixed top-0 left-0 grid items-center justify-center`}>
            <div className="w-[26em] p-6 bg-slate-50 rounded-xl">
              <div className="flex justify-between">
                <h3 className='font-semibold text-2xl'>แก้ไขข้อมูล</h3>
                <button onClick={handleTogglePopupEdit}><i className="bx bx-x text-3xl"></i></button>
              </div>
              <form className='relative' onSubmit={handleChangeUserDetailFunction}>
                <div className="flex justify-center pt-2 pb-8">
                  <input type="file" name="" id="img_preview" onChange={(e)=>{setImage(handleImage(e))}} hidden />
                  <label htmlFor='img_preview' className="relative block w-[170px] rounded-full overflow-hidden cursor-pointer group">
                    <img src={imagePreview ? imagePreview : userData ? `${process.env.REACT_APP_API_ENDPOINT}/profile/${userData?.username}/img` : "https://cdn-icons-png.freepik.com/512/3135/3135715.png"} onError={(e:any)=>e.target.src="https://cdn-icons-png.freepik.com/512/3135/3135715.png"} alt='' width={170} height={170} className='aspect-square object-cover'></img>
                    <div className={`transition-all duration-300 absolute top-0 w-full h-full p-3 group-hover:bg-black/50 group opacity-0 hover:opacity-100 backdrop-blur-sm`}>
                        <div className="transition-all duration-300 rounded-full flex flex-col justify-center items-center w-full h-full border-2 border-dashed border-white text-white">
                            <i className="bx bx-image-add text-[3.5em] mb-1"></i>
                            <p>เปลี่ยนรูปภาพ</p>
                        </div>
                    </div>
                  </label>
                </div>
                
                
                <div className="flex flex-between items-center gap-4 mb-4">
                <div className="relative w-full min-w-[200px] h-10">
                  <input
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" " value={userExistValue}
                    onChange={handleChangeUsernameCheckFunction}
                    id="username"
                    /><label
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">ชื่อผู้ใช้
                  </label>
                </div>
                    {passIcon(!userExist)}
                </div>
                <div className="relative mt-4 w-full min-w-[200px]">
                  <textarea
                    className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    value={userBio}
                    onChange={(e)=>setUserBio(e.target.value)}
                    id="bio"
                    ></textarea>
                  <label
                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    แนะนำตัวเอง
                  </label>
                </div>
                <button type='button' onClick={handleTogglePopupPasswd} className={`mt-10 mb-3 bg-blue-200 border-blue-500 text-slate-800 font-normal pt-2 pb-1 px-3 rounded-md border-b-2 text-xl hover:border-2 hover:border-blue-300 hover:bg-white transition-all duration-75 w-full`}>เปลี่ยนรหัสผ่าน</button>
                <button type='submit' className={`bg-green-300 border-green-600 text-slate-800 font-normal pt-2 pb-1 px-3 rounded-md border-b-2 text-xl hover:border-2 hover:border-green-400 hover:bg-green-100 transition-all duration-75 w-full`}>อัพเดตข้อมูล</button>
              </form>
            </div>
          </section>

          <section className={`transition-all duration-200 ${popStatus.password ? "bg-black/20 backdrop-blur-sm" : "opacity-0 invisible"} w-full h-full fixed top-0 left-0 grid items-center justify-center`}>
            <div className="w-[26em] p-6 bg-slate-50 rounded-xl">
              <div className="flex justify-between">
                <h3 className='font-semibold text-2xl'>เปลี่ยนรหัสผ่าน</h3>
                <button onClick={handleTogglePopupPasswd}><i className="bx bx-x text-3xl"></i></button>
              </div>
              <form onSubmit={handleChangePassFunction}>
                <div className="flex flex-between items-center gap-4 my-4">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                      placeholder=" "
                      type='password'
                      id="password"
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
                      id="change_password"
                      onChange={(e)=>setPass({...pass, value: e.target.value})}
                      /><label
                      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                        รหัสผ่านใหม่
                    </label>
                  </div>
                </div>
                <div className="flex flex-between items-center gap-4 mb-4">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                      placeholder=" "
                      type='password'
                      id="change_passwordc"
                      onChange={handleChangePassCheckFunction}
                      /><label
                      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                        รหัสผ่านใหม่อีกครั้ง
                    </label>
                  </div>
                    {passIcon(pass.success)}
                </div>
                <button type="submit" className={`bg-green-300 border-green-600 text-slate-800 font-normal pt-2 pb-1 px-3 rounded-md border-b-2 text-xl hover:border-2 hover:border-green-400 hover:bg-green-100 transition-all duration-75 w-full`}>อัพเดตข้อมูล</button>
              </form>
            </div>
          </section>
          </> : null
        }
      </main>
    </>
  );
}
