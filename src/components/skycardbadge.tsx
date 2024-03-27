import SkyCard from "../components/skycard"

export default function SkyCardBadge(props:any) {
    const {type="normal", img="", title="", color_code="", profile_name="User", pantone="Pantone", score=0, tag=1, profile_id=1, select=false, blur=false, blurSelected=false, id=1, onHover=()=>{}, onSelect=()=>{}, className, rank=1, yesterday_rank=rank} = props
    return <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2">
            <span className={`px-2 pt-1 rounded-md drop-shadow-md ${rank==1? "bg-yellow-400" : rank==2?"bg-slate-300" :rank==3?"bg-orange-300":"bg-white/50" }`}>{yesterday_rank != 9999 && rank != 9999 ? `#${rank}` : "ยังไม่ถูกโหวต"}</span>
            {rank != yesterday_rank && yesterday_rank != 9999 && rank != 9999 ? <span className={`pt-1 rounded-md drop-shadow-md text-xs`}><i className={`bx ${yesterday_rank > rank ? "bxs-upvote text-green-700" : yesterday_rank < rank ? "bxs-downvote text-red-700" : ""}`}></i>{yesterday_rank}</span> : null}
        </div>

        <SkyCard
        img={img}
        type={type}
        title={title}
        score={score}
        tag={tag}
        profile_id={profile_id}
        select={select}
        blur={blur}
        blurSelected={blurSelected}
        id={id}
        onHover={onHover}
        onSelect={onSelect}
        color_code={color_code}
        profile_name={profile_name}
        pantone={pantone}
        className={className}
        />
    </div>
}