import { Link } from "react-router-dom"

export default function ProfileItem(props:any) {
    const {profile_id=1, img="https://cdn-icons-png.freepik.com/512/3135/3135715.png", username="User", sky_total=0, voted_receive=0, voted_send=0} = props
    return <div className="mt-4 rounded-xl drop-shadow-md flex flex-col sm:flex-row gap-10 justify-between items-center w-[66em] p-4 px-6 bg-white">
                <Link to={`/profile/${profile_id}`} className="flex items-center gap-10">
                    <img src={img} alt={username} width={120} height={120} className='rounded-full aspect-square object-cover border-2 border-white/30'></img>
                    <h2 className="text-3xl text-center sm:text-start font-semibold">{username}</h2>
                </Link>
                <div className="flex">
                    <div className="flex flex-col items-center w-44 border-r-2 border-slate-400/60">
                        <h3 className="text-2xl font-medium">{sky_total}</h3>
                        <h4 className="font-light mt-1">ท้องฟ้าที่ส่งประกวด</h4>
                    </div>
                    <div className="flex flex-col items-center w-44 border-r-2 border-slate-400/60">
                        <h3 className="text-2xl font-medium">{voted_receive}</h3>
                        <h4 className="font-light mt-1">ได้รับคะแนนโหวต</h4>
                    </div>
                    <div className="flex flex-col items-center w-44">
                        <h3 className="text-2xl font-medium">{voted_send}</h3>
                        <h4 className="font-light mt-1">ส่งคะแนนโหวต</h4>
                    </div>
                </div>
            </div>
}