import { toast } from 'react-toastify';
import SkyCard from '../../../components/skycard'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import moment, { now } from 'moment';
import Swal from 'sweetalert2';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export default function SkyPage() {
  const [sky_data, setSkyData] = useState<any>(null);
  const [sky_stats_data, setSkyStatsData] = useState<any>([]);
  const navigate = useNavigate()

  const {sky_id} = useParams()

  const [session, setSession] = useState<any>()
  
  useEffect(()=>{
    const js = JSON.parse(localStorage.getItem('session') || "{}")
    setSession(js)
  }, [])

  let days = []
  let days_temp:any = []
  for (let index = 7; index > 0; index--) {
    days.push(moment(Date.now()).subtract(index-1, 'day').format('D MMM'))
    days_temp.push(moment(Date.now()).subtract(index-1, 'day').format('D-M'))
  }
  // console.log(days_temp)

  useEffect(()=>{
    fetch(process.env.REACT_APP_API_ENDPOINT+`/sky/${sky_id}`, {
      method: 'GET',
    }).then(response=>response.json()).then((d)=>{
      if(d.error){
        navigate(`/`)
        return
      }
      setSkyData(d)
    })
  },[sky_id])

  useEffect(()=>{
    fetch(process.env.REACT_APP_API_ENDPOINT+`/sky/${sky_id}/stats`, {
      method: 'GET',
    }).then(response=>response.json()).then((res:any)=>{
      // .filter((f:any)=>f.skid!=sky_id)
      setSkyStatsData(res.map((d:any)=>{
        let crp = 0;
        return {
          skid: d.skid,
          name: d.title + " #" + d.skid,
          current_point: d.current_upvoted,
          data: days_temp.map((day:string, dint:number)=>{
            const s = d.stats.find((f:any)=>f.date == day)
            if(s != null) crp = s.point
            return s ? s.point : crp
          })
        }
      }))
    })
  },[])

  console.log(sky_stats_data)
  {
      // tooltip: {"enabled":true,"theme":false,"style":{"fontSize":"12px","fontFamily":"'Trim-Regularr', sans-serif"},
      //           "x":{"show":false}, // set to true to "fix" the bug
      //           "y":{"formatter":{"_custom":{"type":"function","display":"<span>ƒ</span> formatter(value, _ref)"}}}}
  }
  const sr = sky_stats_data.find((f:any)=>f.skid==sky_id) ? [
    ...sky_stats_data.filter((f:any)=>f.skid!=sky_id).sort((a:any, b:any) => b.current_point - a.current_point).slice(0,7),
    sky_stats_data.find((f:any)=>f.skid==sky_id)
  ] : [
    ...sky_stats_data.filter((f:any)=>f.skid!=sky_id).sort((a:any, b:any) => b.current_point - a.current_point).slice(0,7)
  ]
  const chartOptions:ApexOptions = {
    // Define your chart options here
    chart: {
      animations:{"enabled":false},
      dropShadow:{
        "enabled":true,
        "opacity":0.2,"top":6,"blur":4
      },
      fontFamily:"'Trim-Regularr', sans-serif",
      foreColor:"#769BA3",
      height:"auto",
      "toolbar":{
        "autoSelected":"zoom",
        "show":false,
        "tools":{
          "download":false,
          "selection":false,
          "zoom":false,
          "zoomin":false,
          "zoomout":false,
          "pan":false,
          "reset":"<i class=\"zmdi zmdi-refresh-alt\"></i>"
        }
      },
      "width":"100%",
      "zoom":{
        "enabled":true,
        "type":"x",
        "autoScaleYaxis":false,
        "zoomedArea":{
          "fill":{
            "color":"#2e62a1",
            "opacity":0.4
          },
          "stroke":{
            "color":"#70c3d0",
            "opacity":0.4,
            "width":1
          }
        }
      },
      type: 'line',
    },
    markers: {
      "strokeColors":["#2e62a1","#70c3d0","#fad57a"],
      "size":[7,7,0.01,7],
      "discrete":[],
      "strokeWidth":2,
      "strokeOpacity":1,
      "strokeDashArray":0,
      "fillOpacity":1,
      "shape":"circle",
      "radius":2,
      "showNullDataPoints":true,
      "hover":{"sizeOffset":0}
    },
    series: sr,
    xaxis: {
      categories: days,
    },
  };

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
                    tag={sky_data.tag}
                    pantone={sky_data.pantone}
                    img={`${process.env.REACT_APP_API_ENDPOINT}/sky/${sky_data.skid}/img`}
                  ></SkyCard>
            </div>
            <div className="mt-10 2xl:mt-0 w-full h-full flex flex-col justify-center">
              <div className="flex justify-between">
                <h2 className='text-xl underline'>ประวัติคะแนนท้องฟ้า</h2>
                <div className="flex gap-3">
                  {
                    session?.uid == sky_data.uid ? <>
                      <button onClick={()=>{
                        Swal.fire({
                          title: "ยืนยันการลบ",
                          text: "ลบแล้วลบเลยนะ",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes, delete it!"
                        }).then((result) => {
                          if (result.isConfirmed) {
                            fetch(process.env.REACT_APP_API_ENDPOINT+`/sky/${sky_id}`, {
                              method: 'DELETE',
                              headers: {
                                uid: session?.uid
                              }
                            }).then(response=>response.json()).then((d)=>{
                              if(d.success){
                                toast.success("ลบท้องฟ้าเรียบร้อย",{
                                  position: 'bottom-right',
                                  autoClose: 1500
                                })
                              navigate(`/profile/${session?.username}`)
                            } else {
                              toast.error("ลบท้องฟ้าไม่ได้",{
                                position: 'bottom-right',
                                autoClose: 1500
                              })
                            }
                            })
                          }
                        });
                      }} className={`mt-2 bg-red-600 border-red-800 text-slate-100 hover:border-2 hover:border-red-700 hover:bg-red-500 font-normal pt-2 pb-1 px-3 rounded-md border-b-2 text-xl transition-all duration-75`}>
                        <i className="bx bx-trash"></i> ลบ
                      </button>
                      <button onClick={()=>{}} className={`mt-2 bg-blue-300 border-blue-600 text-slate-800 hover:border-2 hover:border-blue-400 hover:bg-blue-50 font-normal pt-2 pb-1 px-3 rounded-md border-b-2 text-xl transition-all duration-75`}>
                        <i className="bx bx-edit"></i> แก้ไข
                      </button>
                    </> : null
                  }
                </div>
              </div>
              <div className="md:flex mt-4 items-end gap-10">
                <h2 className='text-4xl font-bold'>{sky_data.title == 'null' ? "ท้องฟ้าไม่มีชื่อ" : sky_data.title}</h2>
                <p>อัพโหลดวันที่: {moment(sky_data.create_at).format('D/MM/YYYY')}</p>
                <p>ท้องฟ้าอันดับที่: {sky_data.rank}</p>
              </div>
              <div className="mt-6 bg-white/80 p-4 rounded-2xl shadow-xl shadow-black/5 h-[50dvh] relative overflow-hidden">
                <ReactApexChart
                  options={chartOptions}
                  series={chartOptions.series}
                  type="line"
                  height={"100%"}
                />
              </div>
            </div>
                </>: null}
        </main>
        <section className="bg-gradient-to-t from-orange-200 fixed w-full h-full top-0 left-0 -z-10" />
    </>
  );
}
