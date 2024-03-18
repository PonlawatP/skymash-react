import { toast } from 'react-toastify';
import SkyCard from '../../../components/skycard'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';

export default function SkyPage() {
  const [sky_data, setSkyData] = useState<any>(null);
  const navigate = useNavigate()

  const {sky_id} = useParams()

  useEffect(()=>{
    fetch(process.env.REACT_APP_API_ENDPOINT+`/sky/${sky_id}`, {
      method: 'GET',
    }).then(response=>response.json()).then((d)=>{
      setSkyData(d)
    })
  },[sky_id])

  // const img = useBlobUrl(JSON.stringify(sky_data.img))

  return (
    <>
        <main className="relative h-full flex flex-col gap-16 2xl:flex-row w-10/12 2xl:w-5/6 3xl:w-4/6 mx-auto">
                {sky_data != null ? <>
            <div className="flex flex-col gap-10 justify-center items-center">
                  <SkyCard 
                    type="normal"
                    title={sky_data.title}
                    profile_id={sky_data.uid}
                    profile_name={sky_data.username}
                    color_code={sky_data.color_code}
                    img={`${process.env.REACT_APP_API_ENDPOINT}/sky/${sky_data.skid}/img`}
                  ></SkyCard>
            </div>
            <div className="mt-10 2xl:mt-44 w-full">
              <div className="flex justify-between">
                <h2 className='text-xl underline'>ประวัติคะแนนท้องฟ้า</h2>
                <div className="flex gap-3">
                  <button onClick={()=>{
                    Swal.fire({
                      title: "ยืนยันการลบ",
                      text: "ลบแล้วลบเลยนะ",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Yes, delete it!"
                    }).then((result) => {
                      if (result.isConfirmed) {
                        // delete
                        toast.success("ลบท้องฟ้าเรียบร้อย",{
                          position: 'bottom-right',
                          autoClose: 1500
                        })
                        navigate(`/profile/${sky_data.uid}`)
                      }
                    });
                  }} className={`mt-2 bg-red-600 border-red-800 text-slate-100 hover:border-2 hover:border-red-700 hover:bg-red-500 font-normal pt-2 pb-1 px-3 rounded-md border-b-2 text-xl transition-all duration-75`}>
                    <i className="bx bx-trash"></i> ลบ
                  </button>
                  <button onClick={()=>{}} className={`mt-2 bg-blue-300 border-blue-600 text-slate-800 hover:border-2 hover:border-blue-400 hover:bg-blue-50 font-normal pt-2 pb-1 px-3 rounded-md border-b-2 text-xl transition-all duration-75`}>
                    <i className="bx bx-edit"></i> แก้ไข
                  </button>
                </div>
              </div>
              <div className="md:flex mt-4 items-end gap-10">
                <h2 className='text-4xl font-bold'>{sky_data.title}</h2>
                <p>อัพโหลดวันที่: {moment(sky_data.create_at).format('D/MM/YYYY')}</p>
                <p>ท้องฟ้าอันดับที่: </p>
              </div>
            </div>
                </>: null}
        </main>
        <section className="bg-gradient-to-t from-orange-200 fixed w-full h-full top-0 left-0 -z-10" />
    </>
  );
}
