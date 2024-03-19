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
  })

  const [userListData, setUserListData] = useState([])
  useEffect(()=>{
    fetch(process.env.REACT_APP_API_ENDPOINT+`/profile`, {
      method: 'GET',
    }).then(response=>response.json()).then((res:any)=>{
        setUserListData(res)
    })
  },[])
    return <>
        <main className="relative h-full grid grid-rows-[auto_1fr] pb-24">
            <div className="flex justify-center mt-10">
                <p className="text-xl bg-white/60 px-4 pb-1 pt-2 rounded-lg">รายการผู้ใช้</p>
            </div>
            <div className="mx-auto mt-10">
                <div className="flex justify-end"><button className="flex items-center gap-2 text-black/50 hover:text-black/80"><i className="bx bx-sort-alt-2 text-3xl"></i> <p>ได้รับคะแนนโหวต</p></button></div>
                {userListData.map((u:any, uindex:number)=><ProfileItem
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