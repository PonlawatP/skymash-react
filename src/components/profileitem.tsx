import { Link } from "react-router-dom"

export default function ProfileItem(props:any) {
    const {img="https://cdn-icons-png.freepik.com/512/3135/3135715.png", username="User", sky_total=0, voted_receive=0, voted_send=0} = props
    return <div className="m-4 lg:mt-4 rounded-xl drop-shadow-md flex flex-col sm:flex-row gap-4 lg:gap-10 justify-between sm:items-center max-w-[66em] p-4 px-6 bg-white">
                <Link to={`/profile/${username}`} className="flex items-center gap-4 lg:gap-10">
                    <img src={img} onError={(e:any)=>{e.target.src="https://cdn-icons-png.freepik.com/512/3135/3135715.png"}} alt={username} width={120} height={120} className='rounded-full w-[70px] h-[70px] lg:w-[120px] lg:h-[120px] aspect-square object-cover border-2 border-white/30'></img>
                    <h2 className="text-lg lg:text-3xl text-center sm:text-start font-semibold">{username}</h2>
                </Link>
                <div className="grid grid-cols-3 lg:flex">
                    <div className="flex flex-col items-center lg:w-44 border-r-2 border-slate-400/60 px-2">
                        <h3 className="text-lg lg:text-2xl font-medium">{sky_total}</h3>
                        <h4 className="font-light text-xs lg:text-base mt-1 text-center">ท้องฟ้าที่ส่งประกวด</h4>
                    </div>
                    <div className="flex flex-col items-center lg:w-44 border-r-2 border-slate-400/60 px-2">
                        <h3 className="text-lg lg:text-2xl font-medium">{voted_receive}</h3>
                        <h4 className="font-light text-xs lg:text-base mt-1 text-center">ได้รับคะแนนโหวต</h4>
                    </div>
                    <div className="flex flex-col items-center lg:w-44 px-2">
                        <h3 className="text-lg lg:text-2xl font-medium">{voted_send}</h3>
                        <h4 className="font-light text-xs lg:text-base mt-1 text-center">ส่งคะแนนโหวต</h4>
                    </div>
                </div>
            </div>
}