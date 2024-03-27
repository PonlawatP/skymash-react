import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from "react-toastify";

export default function SkyCard(props:any) {
    let {type="normal", no_click=false, title="", score=0, tag="morning", img="", not_img=false, profile_name="User", color_code="#ffffff", pantone = "Pantone", select=false, blur=false, blurSelected=false, id=1, onImgChange=()=>{}, onTitleChange=()=>{}, onTagChange=()=>{}, onHover=()=>{}, onSelect=()=>{}, className} = props
    
    title = title == 'null' ? "" : title

    const [e_tag, seteTag] = useState<any>(img!=""?tag:null);
    const [imagePreview, setImagePreview] = useState(null);
    
    const handleImage = (event:any) => {
        const file = event.target.files[0];
    
        const reader = new FileReader();
        reader.onload = () => {
            let a:any = reader.result
            setImagePreview(a);
        };
        reader.readAsDataURL(file);
        return file
    };

    function setTag(tag:string){
        onTagChange(tag)
        seteTag(tag)
    }

    function handleClickCc(){
        toast.success(`คัดลอกโค้ดสีแล้ว! ${color_code}`, {autoClose:1500, position:"bottom-right"})
    }

    function getTagDetail(tag:string){
        const res = {
            className: tag=='sunset' ? 'bg-yellow-300 border-yellow-600 text-slate-800 hover:border-yellow-400 hover:bg-yellow-100' :
            tag=='noon' ? 'bg-cyan-200 border-cyan-600 text-slate-800 hover:border-cyan-400 hover:bg-cyan-100' :
            tag=='evening' ? 'bg-orange-300 border-orange-600 text-slate-800 hover:border-orange-400 hover:bg-orange-100' :
            tag=='night' ? 'bg-purple-800 border-purple-950 text-slate-200 hover:border-purple-700 hover:bg-purple-600' :
            'bg-blue-300 border-blue-600 text-slate-800 hover:border-blue-400 hover:bg-blue-100',
            name: tag=='sunset' ? 'เช้า' :
            tag=='noon' ? 'กลางวัน' :
            tag=='evening' ? 'เย็น' :
            tag=='night' ? 'กลางคืน' :
            'เพิ่มแท็ก'
        }

        return res;
    }

    return <div>
    {
        type=="normal" ?
            <div className="sky-card bg-white drop-shadow-xl p-4 rounded-sm w-[20rem] max-w-[26rem]">
                {no_click?
                    <div className="sky-img relative aspect-square rounded-sm group bg-slate-200">
                        <img className="w-full h-full object-cover" src={img==""?"https://www.adorama.com/alc/wp-content/uploads/2017/11/shutterstock_114802408.jpg":img} alt="" />
                        <div className="w-full h-full absolute top-0 shadow-inner shadow-black/30"></div>
                    </div>:<Link to={`/sky/${id}`}>
                    <div className="sky-img relative aspect-square rounded-sm group bg-slate-200">
                        <img className="w-full h-full object-cover" src={img==""?"https://www.adorama.com/alc/wp-content/uploads/2017/11/shutterstock_114802408.jpg":img} alt="" />
                        <div className="w-full h-full absolute top-0 shadow-inner shadow-black/30"></div>
                    </div>
                </Link>}
                
                <div className="sky-detail pt-4 px-2 grid grid-cols-[1fr_auto] items-start gap-4">
                    <div className="flex flex-col justify-between relative gap-4">
                        <div className="flex flex-between">
                                {no_click?<h3 className="relative font-medium text-lg lg:text-xl lg:px-1 line-clamp-1 w-full h-7">
                                    {title}
                                </h3>:
                                <h3 className="relative font-medium text-lg lg:text-xl lg:px-1 line-clamp-1 w-full h-7">
                                    <Link to={`/sky/${id}`}>
                                        {title}
                                    </Link>
                                </h3>
                                    }
                            <span className="flex items-center gap-1 text-slate-500 text-sm">{score}<i className="bx bx-heart"></i></span>
                        </div>
                        <div className="sky-lowerdetail flex justify-between items-end transition-all duration-150">
                            {no_click?
                                <div className="flex gap-4 items-center font-light group">
                                    <img src={`${process.env.REACT_APP_API_ENDPOINT}/profile/${profile_name}/img`} onError={(e:any)=>{e.target.src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} alt="" className="w-8 lg:w-11 aspect-square bg-white rounded-full object-cover" />
                                    <p className="text-sm lg:text-md">โดย {profile_name}</p>
                                </div>
                            :
                                <Link to={`/profile/${profile_name}`} className="flex gap-4 items-center font-light group">
                                    <img src={`${process.env.REACT_APP_API_ENDPOINT}/profile/${profile_name}/img`} onError={(e:any)=>{e.target.src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} alt="" className="w-8 lg:w-11 aspect-square bg-white rounded-full object-cover" />
                                    <p className="group-hover:font-normal text-sm lg:text-md">โดย {profile_name}</p>
                                </Link>}
                            <span className="flex gap-2 items-center group">
                                <p className={`text-xs text-center lg:text-sm px-2 rounded-lg border transition-all duration-150 ${getTagDetail(tag).className}`}>{getTagDetail(tag).name}</p>
                            </span>
                        </div>
                    </div>
                    <div className="sky-palatte relative w-12 lg:w-16">
                    <CopyToClipboard text={color_code} onCopy={handleClickCc}>
                        <button className="pantone-sky block w-full aspect-square rounded-md bg-slate-200 group" style={{backgroundColor: color_code}}>
                            <i className="bg-white p-2 rounded-full bx bx-copy text-xl opacity-0 group-hover:opacity-50 transition-all duration-100"></i>
                        </button>
                    </CopyToClipboard>
                        <p className="mt-1 relative w-full line-clamp-2 text-center font-light text-sm whitespace-normal">{pantone}</p>
                    </div>
                </div>
            </div>
        :
        type=="vote" ?
            <div onMouseEnter={()=>{onHover(id)}} onMouseLeave={()=>{onHover(0)}} onTouchStart={()=>{onHover(id)}} onTouchEnd={()=>{onHover(0)}} className={`cursor-pointer transition-all duration-300 relative group/main ${blur ? "blur-[2px] translate-y-2 rotate-2" : blurSelected ? "blur-md translate-y-2 rotate-6" : ""} ${select ? "ease-in -translate-y-[80dvh] -rotate-6" : "ease-out"} ${className}`}>
            {/* <div onMouseEnter={()=>{onHover(id)}} onMouseLeave={()=>{onHover(0)}} onClick={()=>{onSelect(id)}} className={`cursor-pointer hover:pb-20 hover:2xl:pb-20 transition-all duration-300 relative group/main ${blur ? "blur-[2px] translate-y-2 rotate-2" : blurSelected ? "blur-md translate-y-2 rotate-6" : ""} ${select ? "ease-in -translate-y-[80dvh] -rotate-6" : "ease-out"} ${className}`}> */}
                <div onClick={()=>{onSelect(id)}} className="sky-card bg-white drop-shadow-xl p-3 lg:p-4 rounded-sm w-[13rem] lg:w-[20rem] 2xl:w-[26rem] transition-all duration-300 md:group-hover/main:-translate-y-10">
                    <div className="vote-box hidden md:block pointer-events-none absolute -bottom-0 opacity-0 text-center group-hover/main:opacity-100 group-hover/main:translate-y-14 right-1/2 translate-x-1/2 text-slate-500 transition-all duration-300 ">
                        <i className="bx bxs-hand-up text-lg lg:text-2xl"></i>
                        <p className="text-sm lg:text-normal">โหวตให้รูปนี้</p>
                    </div>
                    <div className="sky-img relative aspect-square rounded-sm group bg-slate-200">
                        <img className="w-full h-full object-cover" src={img==""?"https://www.adorama.com/alc/wp-content/uploads/2017/11/shutterstock_114802408.jpg":img} alt="" />
                        <div className="w-full h-full absolute top-0 shadow-inner shadow-black/30"></div>
                    </div>
                    <div className="sky-detail pt-4 px-2 hidden lg:grid grid-cols-[1fr_auto] items-start gap-4">
                        <div className="flex flex-col justify-between relative gap-4">
                            <div className="flex flex-between">
                                <h3 className="relative font-medium text-md 2xl:text-xl lg:px-1 line-clamp-1 w-full h-6 2xl:h-7">{title}</h3>
                                <span className="flex items-center gap-1 text-slate-500 text-xs 2xl:text-sm">{score}<i className="bx bx-heart"></i></span>
                            </div>
                            <div className="sky-lowerdetail flex justify-between items-end transition-all duration-150">
                                <div className="flex gap-3 items-center font-light group">
                                    <img src={`${process.env.REACT_APP_API_ENDPOINT}/profile/${profile_name}/img`} onError={(e:any)=>{e.target.src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} alt="" className="hidden lg:block w-11 aspect-square bg-white rounded-full object-cover" />
                                    <p className="hidden lg:block text-sm 2xl:text-md">{profile_name}</p>
                                </div>
                                <span className="flex gap-2 items-center group">
                                    <p className={`text-xs 2xl:text-sm px-2 rounded-lg border transition-all duration-150 ${getTagDetail(tag).className}`}>{getTagDetail(tag).name}</p>
                                </span>
                            </div>
                        </div>
                        <div className="sky-palatte relative w-8 lg:w-16">
                            <div className="pantone-sky block w-full aspect-square rounded-md bg-slate-200 group" style={{backgroundColor: color_code}}>
                            </div>
                            <p className="mt-1 relative w-full line-clamp-2 text-center font-light text-xs 2xl:text-sm whitespace-normal">{pantone}</p>
                        </div>
                    </div>
                </div>
            </div>
        :
        type=="edit" ?
            <div className="sky-card bg-white drop-shadow-xl p-4 rounded-sm w-[20rem] lg:w-[26rem]">
                    <input type="file" name="" id="img_preview" onChange={(e)=>{onImgChange(handleImage(e))}} hidden />
                    <label htmlFor='img_preview'  className="sky-img block cursor-pointer relative aspect-square w-[18rem] lg:w-[24rem] rounded-sm group bg-slate-200 shadow-inner overflow-hidden">
                        <>
                        {imagePreview != null || img != "" ? 
                            <img src={imagePreview != null ? imagePreview : img} alt="sky's preview" className="absolute w-full h-full object-cover" />
                        : null
                        }
                            <div className={`transition-all duration-300 relative w-full h-full p-3 ${not_img ? "opacity-0 group-hover:opacity-100" : ""} group-hover:bg-black/50 group ${imagePreview != null ? "opacity-0 hover:opacity-100 backdrop-blur-sm" : ""}`}>
                                <div className="transition-all duration-300 rounded-md flex flex-col justify-center items-center w-full h-full border-2 border-dashed border-slate-500 text-slate-500 group-hover:border-white group-hover:text-white">
                                    <i className="bx bx-image-add text-[4.5em] mb-4"></i>
                                    <p>คลิกเพื่อเพิ่มรูปภาพ</p>
                                </div>
                            </div>
                        </>
                    </label>
                <form className="sky-detail pt-4 px-2 grid grid-cols-[1fr_auto] items-start gap-4"
                    onSubmit={(e)=>{
                        e.preventDefault()
                    }}
                >
                    <div className="flex flex-col justify-between relative gap-4">
                        <div className="flex flex-between gap-4">
                            <input className="appearance-none font-medium text:md lg:text-xl border-b-2 rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="pic_name" type="text" placeholder="ชื่อรูปภาพ" defaultValue={title} onChange={(e)=>{onTitleChange(e)}}/>
                            <span className="flex items-center gap-1 text-slate-500 text-sm">{score}<i className="bx bx-heart"></i></span>
                        </div>
                        <Menu as="div" className={'absolute bottom-0 right-0'}>
                            <div>
                                <Menu.Button className={`
                                mt-2 ${e_tag == null ? "pt-2 pb-1 px-3 rounded-md text-xl" : "px-2 rounded-full"} font-normal border-b-2 hover:border-2 transition-all duration-75
                                ${
                                    e_tag=='sunset' ? 'bg-yellow-300 border-yellow-600 text-slate-800 hover:border-yellow-400 hover:bg-yellow-100' :
                                    e_tag=='noon' ? 'bg-cyan-200 border-cyan-600 text-slate-800 hover:border-cyan-400 hover:bg-cyan-100' :
                                    e_tag=='evening' ? 'bg-orange-300 border-orange-600 text-slate-800 hover:border-orange-400 hover:bg-orange-100' :
                                    e_tag=='night' ? 'bg-purple-800 border-purple-950 text-slate-200 hover:border-purple-700 hover:bg-purple-600' :
                                    'bg-blue-300 border-blue-600 text-slate-800 hover:border-blue-400 hover:bg-blue-100'
                                }
                                `}>
                                {
                                    e_tag=='sunset' ? 'เช้า' :
                                    e_tag=='noon' ? 'กลางวัน' :
                                    e_tag=='evening' ? 'เย็น' :
                                    e_tag=='night' ? 'กลางคืน' :
                                    'เพิ่มแท็ก'
                                }
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
                                <Menu.Items className="absolute overflow-hidden right-8 z-10 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {() => (
                                        <button
                                            onClick={() => {
                                                setTag('sunset')
                                            }}
                                            type="button"
                                            className={
                                            "profile-badge-li block cursor-pointer text-sm py-2 w-full text-pr-text-menu hover:bg-blue-300"
                                            }
                                        >
                                            เช้า
                                        </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {() => (
                                        <button
                                            onClick={() => {
                                                setTag('noon')
                                            }}
                                            type="button"
                                            className={
                                            "profile-badge-li block cursor-pointer text-sm py-2 w-full text-pr-text-menu hover:bg-blue-300"
                                            }
                                        >
                                            กลางวัน
                                        </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {() => (
                                        <button
                                            onClick={() => {
                                                setTag('evening')
                                            }}
                                            type="button"
                                            className={
                                            "profile-badge-li block cursor-pointer text-sm py-2 w-full text-pr-text-menu hover:bg-blue-300"
                                            }
                                        >
                                            เย็น
                                        </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {() => (
                                        <button
                                            onClick={() => {
                                                setTag('night')
                                            }}
                                            type="button"
                                            className={
                                            "profile-badge-li block cursor-pointer text-sm py-2 w-full text-pr-text-menu hover:bg-blue-300"
                                            }
                                        >
                                            กลางคืน
                                        </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <div className="sky-lowerdetail flex justify-between items-end transition-all duration-150 opacity-0 invisible">
                            <div className="flex gap-4 items-center font-light">
                                <img src={`${process.env.REACT_APP_API_ENDPOINT}/profile/${profile_name}/img`} onError={(e:any)=>{e.target.src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}} alt="" className="w-11 border-2 border-white/50 aspect-square bg-red-400 rounded-full object-cover" />
                                <p className="text-sm 2xl:text-md">โดย {profile_name}</p>
                            </div>
                            <button className="flex gap-2 items-center group">
                                <i className="bx bx-edit-alt text-slate-600 group-hover:text-slate-800"></i>
                                <p className="text-sm px-2 rounded-lg bg-orange-200 border border-black/20 group-hover:mb-1 group-hover:opacity-55 transition-all duration-150">เช้า</p>
                            </button>
                        </div>
                    </div>
                    <div className="sky-palatte relative w-14 lg:w-16 pointer-events-none">
                        <div className="pantone-sky block w-full aspect-square rounded-md bg-slate-200 group" style={{backgroundColor: color_code}}>
                        </div>
                        <p className="mt-1 relative w-full line-clamp-2 text-center font-light text-sm whitespace-normal text-black/40">{pantone}</p>
                    </div>
                </form>
            </div>
        : null}
    </div>
}