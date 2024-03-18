import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function ProfileBadge(props:any){
  const {logged_in=false, session} = props

  function signOut(){
    localStorage.removeItem('session')
    window.location.reload();
  }

  if(!logged_in){
    return  <Link to={"/auth/login"} className="pr-account hidden sm:flex group gap-3 items-center text-pr-gray-1 text-md font-normal leading-4 hover:underline">
              <div className="text-right font-light hidden md:block mt-2">
                <p className=''>เข้าสู่ระบบ</p>
              </div>
            </Link>
  }

  return <Menu as="div">
    <div>
      <Menu.Button className="pr-account hidden sm:flex group gap-3 items-center text-pr-gray-1 text-md font-normal leading-4 hover:underline">
        <div className="text-right font-light hidden md:block mt-2">
          <p className=''>{session.username}</p>
        </div>
        <img src={session.profile == "" ? 'https://cdn-icons-png.freepik.com/512/3135/3135715.png' : session.profile} alt='' width={50} height={50} className='rounded-full aspect-square object-cover border-2 border-white/30'></img>
      </Menu.Button>
    </div>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute overflow-hidden right-8 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        
        <Menu.Item>
          {() => (
            <Link
              to='/profile/1'
              className={
                "profile-badge-li block cursor-pointer text-sm py-2 pl-3 w-full text-pr-text-menu hover:bg-blue-300 hover:pl-4"
              }
            >
              จัดการบัญชี
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {() => (
            <a
              onClick={() => {
                signOut()
              }}
              className={
                "profile-badge-li block cursor-pointer text-sm py-2 pb-3 pl-3 w-full text-pr-text-menu hover:bg-blue-300 hover:pl-4"
              }
            >
              ออกจากระบบ
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Transition>
</Menu>
}