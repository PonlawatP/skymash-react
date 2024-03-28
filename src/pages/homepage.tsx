import { useEffect, useRef, useState } from "react";
import SkyCard from "../components/skycard";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Home() {
  const [session, setSession] = useState<any>()
  
  useEffect(()=>{
    if(localStorage.getItem('session') == null){
      localStorage.setItem('session', JSON.stringify({uid: Math.round((Math.random()-1)*1000)}))
    }
    const js = JSON.parse(localStorage.getItem('session') || "false")
    console.log(js)
    setSession(js)
  }, [])
  
  const [anim_vote, setAnimVote] = useState({
    hover: 0,
    select: 0,
    status: 0
  })
  const [anim_vote_res, setAnimVoteRes] = useState<any>({})
  function handleHoverChange(e:number){
    const t = {...anim_vote, hover:e}
    setAnimVote(t)
  }
  function handleSelected(e:number){
    const t = {hover:0, select:e, status: 1}
    let s:any = anim_vote_res
    setAnimVote(t)

    const lose_skid = sky_data.sky.filter((s:any)=>s.skid!=t.select)[0].skid;
    // console.log({
    //   username: JSON.parse(localStorage.getItem('session') || "{username: ''}").username
    // })
    // send result here
    axios.post(process.env.REACT_APP_API_ENDPOINT+"/vote", {
        ref: sky_data.voted_id,
        win_sky: t.select,
        lose_sky: lose_skid
    }, {headers: {
      uid: JSON.parse(localStorage.getItem('session') || '{ "uid": ""}').uid
    }})
    .then(
    (res)=>{
      if(res.data.result.win.skid == sky_data.sky[0].skid){
        s[0] = res.data.result.win
        s[1] = res.data.result.lose
      } else {
        s[1] = res.data.result.win
        s[0] = res.data.result.lose
      }
      console.log(s)
      setAnimVoteRes(s)

      setTimeout(()=>{
        setAnimVote({...t, status: 2})
        setTimeout(()=>{
          setAnimVote({...t, select: 0, status: 3})
          fetchPair().then((s)=>{
            setTimeout(()=>{
              setAnimVote({...t, select: 0, status: 0})
              let r:any = {}
              r[0] = 0
              r[1] = 0
              setAnimVoteRes(r)

              if(s.error || s.remaining_sky <= 1){
                // console.log(s.waiting, s.adjustment)
                let waiting = s.waiting
                setSecondsRemaining(waiting)
                setTimeout(() => {
                  const intervalId = setInterval(() => {
                    if(waiting < 0){
                      clearInterval(intervalId)
                      window.location.reload();
                    } 
                    waiting = waiting - 1
                    setSecondsRemaining(waiting);
                  }, 1000); // Update every second
                }, s.adjustment*1000); // Update every second
              }
            },500)
          })
        },1500)
      },600)
  }

  ).catch((err)=>{
    console.log(err)

    fetchPair().then((s)=>{
      setTimeout(()=>{
        setAnimVote({...t, select: 0, status: 0})
        let r:any = {}
        r[0] = 0
        r[1] = 0
        setAnimVoteRes(r)

        if(s.error || s.remaining_sky <= 1){
          // console.log(s.waiting, s.adjustment)
          let waiting = s.waiting
          setSecondsRemaining(waiting)
          setTimeout(() => {
            const intervalId = setInterval(() => {
              if(waiting < 0){
                clearInterval(intervalId)
                window.location.reload();
              } 
              waiting = waiting - 1
              setSecondsRemaining(waiting);
            }, 1000); // Update every second
          }, s.adjustment*1000); // Update every second
        }
      },500)
    })
  })
  }

  function getScoreAnimation(old_score=0, new_score=0, diff_form="", diff=0, result_form="", result=0.0){
    return <div className={`absolute text-center transition-all duration-300 pointer-events-none ${anim_vote.status == 0 || anim_vote.status == 3 ? "opacity-0" : ""}`}>
            <h4 className={`transition-all duration-300 font-medium text-xl ${anim_vote.status>=2 ? "" : "translate-y-3"}`}>คะแนนท้องฟ้า</h4>
            <h3 className={`transition-all duration-300 mt-3 text-[2em] font-bold ${anim_vote.status>=2 ? "" : "translate-y-3"}`}>{anim_vote.status >= 2 ? new_score : old_score}</h3>
            <h3 className={`transition-all duration-300 ${anim_vote.status==2 ? "" : "translate-y-3 opacity-0"}`}><i className={`bx ${new_score - old_score > 0 ? "bxs-upvote text-green-700" : "bxs-downvote text-red-700"}`}></i> {new_score - old_score}</h3>
            
            <h3 className={`transition-all duration-300 mt-10 ${diff!=0 ? "" : "translate-y-3 opacity-0"}`}>diff: {diff_form} = {diff}</h3>
            <h3 className={`transition-all duration-300 ${diff!=0 ? "" : "translate-y-3 opacity-0"}`}>result: {result_form} = {result}</h3>
          </div>
  }

  const [sky_data, setSkyData] = useState<any>(null);
  async function fetchPair(){
      return await fetch(process.env.REACT_APP_API_ENDPOINT+`/vote`, {
        method: 'GET',
        headers: {
          uid: JSON.parse(localStorage.getItem('session') || '{ "uid": ""}').uid
        }
      }).then(response=>response.json()).then((d)=>{
        setSkyData(d)
        console.log(d)
        return d
      })
  }
  const renderAfterCalled = useRef(false);
  const [secondsRemaining, setSecondsRemaining] = useState(300);

  useEffect(() => {
      if (!renderAfterCalled.current) {
        fetchPair().then((s:any)=>{
          let t:any = {}
          t[0] = 0
          t[1] = 0
          setAnimVoteRes(t)

          let intervalId:any = 0;
          if(s.error || s.remaining_sky <= 1){
            // console.log(s.waiting, s.adjustment)
            let waiting = s.waiting
            setSecondsRemaining(waiting)
            setTimeout(() => {
              intervalId = setInterval(() => {
                if(waiting < 0){
                  clearInterval(intervalId)
                  window.location.reload();
                } 
                waiting = waiting - 1
                setSecondsRemaining(waiting);
              }, 1000); // Update every second
            }, s.adjustment*1000); // Update every second
          }

          return () => clearInterval(intervalId);
        })
        setAnimVote({...anim_vote, select: 0, status: 0})
      }
  
      renderAfterCalled.current = true;
  }, []);
  
  // useEffect(()=>{
  //   fetchPair().then((s:any)=>{
  //     let t:any = {}
  //     t[s.sky[0].skid] = 0
  //     t[s.sky[1].skid] = 0
  //     setAnimVoteRes(t)
  //   })
  //   setAnimVote({...anim_vote, select: 0, status: 0})
  // },[])

  return (
    <>
      <main className="relative h-full w-full grid grid-rows-[auto_1fr] select-none">
              <div className="flex justify-center lg:mt-10">
                  <p className="hidden lg:block lg:text-xl font-light bg-white/60 px-4 pb-1 pt-2 rounded-lg">เลือกรูปภาพท้องฟ้าที่ถูกใจที่สุด</p>
              </div>
              {sky_data==null || secondsRemaining <= 0 ? <div className="relative w-full h-full flex flex-col justify-center items-center">
                <i className="bx bx-cloud text-[4rem] animate-bounce"></i>
                <p>กำลังโหลด</p>
                <p>อดใจรอซักแปบ</p>
              </div>:
              sky_data.error ? <div className="relative w-full h-full flex flex-col justify-center items-center">
                <i className="bx bx-cloud text-[4rem] animate-bounce"></i>
                <p>ท้องฟ้าหมด</p>
                <p>ร่วมแข่งขัน ประชันท้องฟ้ากับชาวท้องฟ้ากันเลย</p>

                <Link to={session?.username==undefined?"/auth/login":"/upload"}><button className={`mt-4 bg-blue-300 border-blue-600 text-slate-800 font-normal pt-2 pb-1 px-3 rounded-md border-b-2 text-xl hover:border-2 hover:border-blue-400 hover:bg-blue-100 transition-all duration-75`}>อัพโหลดท้องฟ้า</button></Link>

                <p className="mt-8">หรือรออีก {moment.utc(secondsRemaining*1000).format("mm:ss")} วินาที เพื่อโหวตไหม่ </p>
              </div>:
              <div className={`flex flex-col lg:flex-row items-center justify-center lg:gap-40 ${anim_vote.status!=0 ? "pointer-events-none" : ""}`}>
                  <div className="relative flex justify-center items-center">
                    <SkyCard
                      className={anim_vote.status>=1?"scale-90 opacity-0":""}
                      type="vote" blur={anim_vote.hover!=0 && anim_vote.hover!=sky_data.sky[0].skid} select={anim_vote.select==sky_data.sky[0].skid} blurSelected={anim_vote.select!=0&&anim_vote.select!=sky_data.sky[0].skid} 
                      onHover={(e:number)=>{handleHoverChange(e)}}
                      onSelect={(e:number)=>{handleSelected(e)}}
                      score={sky_data.sky[0].current_upvoted} 
                      color_code={sky_data.sky[0].color_code}
                      pantone={sky_data.sky[0].pantone}
                      id={sky_data.sky[0].skid}
                      tag={sky_data.sky[0].tag}
                      title={sky_data.sky[0].title}
                      img={`${process.env.REACT_APP_API_ENDPOINT}/sky/${sky_data.sky[0].skid}/img`}
                      profile_id={sky_data.sky[0].uid}
                      profile_name={sky_data.sky[0].username}
                    />
                    {getScoreAnimation(sky_data.sky[0].current_upvoted, anim_vote_res[0].new_score, anim_vote_res[0]?.formular?.expectedScore?.result_form, anim_vote_res[0]?.formular?.expectedScore?.result, anim_vote_res[0]?.formular?.rating?.form, anim_vote_res[0]?.formular?.rating?.result)}
                  </div>
                  <p className="text-black/40 py-8">หรือ</p>
                  <div className="relative flex justify-center items-center">
                    <SkyCard 
                      className={anim_vote.status>=1?"scale-90 opacity-0":""}
                      type="vote" blur={anim_vote.hover!=0 && anim_vote.hover!=sky_data.sky[1].skid} select={anim_vote.select==sky_data.sky[1].skid} blurSelected={anim_vote.select!=0&&anim_vote.select!=sky_data.sky[1].skid} 
                      tag={sky_data.sky[1].tag}
                      onHover={(e:number)=>{handleHoverChange(e)}}
                      onSelect={(e:number)=>{handleSelected(e)}}
                      score={sky_data.sky[1].current_upvoted} 
                      color_code={sky_data.sky[1].color_code}
                      pantone={sky_data.sky[0].pantone}
                      id={sky_data.sky[1].skid}
                      title={sky_data.sky[1].title}
                      img={`${process.env.REACT_APP_API_ENDPOINT}/sky/${sky_data.sky[1].skid}/img`}
                      profile_id={sky_data.sky[1].uid}
                      profile_name={sky_data.sky[1].username}
                    />
                    {getScoreAnimation(sky_data.sky[1].current_upvoted, anim_vote_res[1].new_score, anim_vote_res[1]?.formular?.expectedScore?.result_form, anim_vote_res[1]?.formular?.expectedScore?.result, anim_vote_res[1]?.formular?.rating?.form, anim_vote_res[1]?.formular?.rating?.result)}
                  </div>
              </div>
            }
          </main>
        </>
  );
}
