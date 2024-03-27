import { useEffect, useState } from 'react'
import ProfileItem from '../../components/profileitem'
import { useNavigate } from 'react-router-dom'
export default function UserListPage(){
  const navigate = useNavigate()
  
  useEffect(()=>{
    const js = JSON.parse(localStorage.getItem('session') || 'false')
    if(js && js.uid > 0){
        if(!js.is_admin){
            navigate("/")
        }
    } else {
      navigate("/auth/login")
    }
  }, [])

  const [userListData, setUserListData] = useState([])
  const [userListSort, setUserListSort] = useState(0)
  useEffect(()=>{
    fetch(process.env.REACT_APP_API_ENDPOINT+`/profile`, {
      method: 'GET',
    }).then(response=>response.json()).then((res:any)=>{
        setUserListData(res)
    })
  },[])
    return <>
        <main className="relative h-full grid grid-rows-[auto_1fr] pb-24">
            <div className="flex justify-center lg:mt-10">
                <p className="lg:text-xl font-light bg-white/60 px-4 pb-1 pt-2 rounded-lg">รายการผู้ใช้</p>
            </div>
            <div className="mx-auto mt-10">
                <div className="flex justify-end">
                  <button 
                    onClick={()=>{
                      setUserListSort(prev=>prev >= 2 ? 0 : prev+1)
                    }}
                    className="flex items-center gap-2 text-black/50 hover:text-black/80 text-sm"
                  >
                    <i className="bx bx-sort-alt-2 text-lg lg:text-3xl"></i> 
                    {userListSort == 0 ?
                      <p>ได้รับคะแนนโหวต</p>
                      :userListSort == 1 ?
                      <p>ส่งคะแนนโหวต</p>
                      :
                      <p>ท้องฟ้าที่ส่งประกวด</p>
                    }
                  </button></div>
                {userListData.sort((b:any, a:any)=>userListSort == 0 ? a.voted_count-b.voted_count : userListSort == 0 ? a.voted_sended-b.voted_sended : a.upload_count-b.upload_count).map((u:any, uindex:number)=><ProfileItem
                    key={uindex}
                    profile_id={u.uid}
                    img={`${process.env.REACT_APP_API_ENDPOINT}/profile/${u.username}/img`}
                    username={u.username}
                    sky_total={u.upload_count}
                    voted_receive={u.voted_count}
                    voted_send={u.voted_sended}
                />)}
            </div>
        </main>
        {/* <section className="bg-gradient-to-t from-orange-200 fixed w-full h-full top-0 left-0 -z-10" /> */}
    </>
}