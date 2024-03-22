import { toast } from 'react-toastify';
import SkyCard from '../components/skycard'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function UploadPage() {
  const [image, setImage] = useState<any>(null);
  const [title, setTitle] = useState<any>(null);
  const [tag, setTag] = useState<any>(null);
  const [upload, setUpload] = useState(false);
  const navigate = useNavigate()


  const imageUpload = async () => {
    // console.log(image)
    if(image == undefined){
      toast.error("เพิ่มรูปภาพก่อน", 
        {
          position: "bottom-right",
          autoClose: 1500,
        })
      return
    }
    if(tag == null){
      toast.error("เพิ่มแท็กก่อน", 
        {
          position: "bottom-right",
          autoClose: 1500,
        })
      return
    }

    setUpload(true)
    let formData = new FormData();
    const uid = JSON.parse(localStorage.getItem('session') || 'null').uid;
    formData.append("uid", uid);
    formData.append("image", image);
    formData.append("title", title);
    formData.append("tag", tag);

    // console.log(formData.get('image'))
    try {
      const response = await toast.promise(
        fetch(process.env.REACT_APP_API_ENDPOINT+"/sky", {
          method: 'POST',
          body: formData,
        }),
        {
          pending: 'กำลังอัพโหลด',
          error: 'เกิดข้อผิดพลาด 🤯'
        },
        {
          position: "bottom-right",
          autoClose: 1500,
        }
    );

      if (response.ok) {
        toast.success("👌 อัพโหลดสำเร็จ", 
          {
            position: "bottom-right",
            autoClose: 1500,
          })
        const rs = await response.json()
        console.log('Image uploaded successfully!');
        // Reset the form or handle success
        navigate(`/sky/${rs.result.skid}`)
      } else {
        const rs = await response.json()
        if(rs.err){
          toast.error(rs.err, 
          {
            position: "bottom-right",
            autoClose: 1500,
          })
          setUpload(false)
          return
        }
        console.error('Image upload failed: ', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    setUpload(false)
  };

  console.log()

  return (
    <>
        <main className="relative h-full grid grid-rows-[auto_1fr] mb-20">
            <div className="flex justify-center lg:mt-10">
                <p className="lg:text-xl font-light bg-white/60 px-4 pb-1 pt-2 rounded-lg">อัพโหลดท้องฟ้า</p>
            </div>
            <div className="flex flex-col gap-10 justify-center items-center">
                <SkyCard type="edit" 
                  onImgChange={(e:any)=>{
                    setImage(e)
                  }}
                  onTitleChange={(e:any)=>{
                    setTitle(e.target.value)
                  }}
                  onTagChange={(e:any)=>{
                    setTag(e)
                  }}
                ></SkyCard>

                <button onClick={()=>{imageUpload()}} className={`mt-2 ${upload ? "opacity-50 pointer-events-none" : "" } bg-green-300 border-green-600 text-slate-800 hover:border-2 hover:border-green-400 hover:bg-green-50 font-normal pt-2 pb-1 px-3 rounded-md border-b-2 text-xl transition-all duration-75`}>อัพโหลดท้องฟ้า</button>
            </div>
        </main>
        <section className="bg-gradient-to-t from-orange-200 fixed w-full h-full top-0 left-0 -z-10" />
    </>
  );
}
