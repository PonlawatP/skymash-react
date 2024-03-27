/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, Outlet } from "react-router-dom";
import ProfileBadge from "../components/profilebadge";
import 'boxicons/css/boxicons.min.css'
import { useEffect, useState } from "react";

export default function RootLayout() {

  const [session, setSession] = useState<any>()
  
  useEffect(()=>{
    const js = JSON.parse(localStorage.getItem('session') || "{}")
    setSession(js)
  }, [])

  return (
      <div className={'ibm'}>
          <section className="body min-h-[100dvh] grid grid-rows-[auto_minmax(0,1fr)]">
            <nav className="p-8 flex justify-between sticky top-0 z-50 lg:backdrop-blur-lg">
              <div className="sect-left flex items-center gap-8 font-light">
                <div className="mr-8">
                  <Link to={"/"}><h1 className={`sky text-4xl`}>SkyMesh</h1></Link>
                </div>
                <div className="hidden lg:flex items-center gap-8">
                  <Link to={session?.username==undefined?"/auth/login":"/upload"}><button className={`bg-blue-300 border-blue-600 text-slate-800 font-normal pt-2 pb-1 px-3 rounded-md border-b-2 text-xl hover:border-2 hover:border-blue-400 hover:bg-blue-100 transition-all duration-75`}>อัพโหลดท้องฟ้า</button></Link>
                  <Link to={"/"}><h3 className={`text-xl transition-all duration-300 hover:font-bold`}>โหวตรูปภาพ</h3></Link>
                  <Link to={"/ranking"}><h3 className={`text-xl transition-all duration-300 hover:font-bold`}>จัดอันดับ</h3></Link>
                </div>
              </div>
              <ProfileBadge logged_in={session?.username!=undefined} session={session}></ProfileBadge>
            </nav>
            <Outlet/>
            <section className="bg-gradient-to-r from-orange-200 to-blue-100 fixed w-full h-full top-0 left-0 -z-10" >
              <div className="w-full h-full bg-white/20">

              </div>
            </section>
          </section>
          {/* <section className="mt-24">
          </section> */}
      </div>
  );
}
