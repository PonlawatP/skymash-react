import SkyCard from "../components/skycard"

export default function SkyCardBadge(props:any) {
    const {type="normal", img="", title="", color_code="", profile_name="User", pantone="Pantone", score=0, tag=1, profile_id=1, select=false, blur=false, blurSelected=false, id=1, onHover=()=>{}, onSelect=()=>{}, className, rank=1} = props
    return <div className="flex flex-col items-center gap-2">
        <span className={`px-2 pt-1 rounded-md drop-shadow-md ${rank==1? "bg-yellow-400" : rank==2?"bg-slate-300" :rank==3?"bg-orange-300":"bg-white/50" }`}>#{rank}</span>
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