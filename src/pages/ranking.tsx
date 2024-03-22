import { useEffect, useState } from 'react';
import SkyCardBadge from '../components/skycardbadge'

export default function RankingPage() {
  const [skyData, setSkyData] = useState([])
  useEffect(()=>{
    fetch(process.env.REACT_APP_API_ENDPOINT+`/sky`, {
      method: 'GET',
    }).then(response=>response.json()).then((res:any)=>{
      setSkyData(res)
    })
  },[])
  return (
    <>
        <main className="relative h-full grid grid-rows-[auto_1fr] pb-24">
            <div className="flex justify-center lg:mt-10">
                <p className="lg:block lg:text-xl font-light bg-white/60 px-4 pb-1 pt-2 rounded-lg">10 อันดับท้องฟ้า ที่มีคนถูกใจมากที่สุด</p>
            </div>
            <div className="grid justify-center mt-6">
              {skyData.slice(0,1).map((s:any)=><SkyCardBadge 
                id={s.skid}
                rank={s.rank}
                score={s.current_upvoted}
                title={s.title}
                tag={s.tag}
                profile_id={s.uid}
                profile_name={s.username}
                pantone={s.pantone}
                color_code={s.color_code}
                img={`${process.env.REACT_APP_API_ENDPOINT}/sky/${s.skid}/img`}
              />)}
            </div>

            <div className="flex flex-wrap gap-8 mt-12 max-w-[82em] mx-auto justify-center">
              {skyData.slice(1).map((s:any)=><SkyCardBadge 
                id={s.skid}
                rank={s.rank}
                score={s.current_upvoted}
                title={s.title}
                tag={s.tag}
                profile_id={s.uid}
                profile_name={s.username}
                pantone={s.pantone}
                color_code={s.color_code}
                img={`${process.env.REACT_APP_API_ENDPOINT}/sky/${s.skid}/img`}
              />)}
            </div>
        </main>
        {/* <section className="bg-gradient-to-t from-orange-200 fixed w-full h-full top-0 left-0 -z-10" /> */}
    </>
  );
}
