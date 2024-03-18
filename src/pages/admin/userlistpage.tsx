import ProfileItem from '../../components/profileitem'
export default function UserListPage(){
    return <>
        <main className="relative h-full grid grid-rows-[auto_1fr] pb-24">
            <div className="flex justify-center mt-10">
                <p className="text-xl bg-white/60 px-4 pb-1 pt-2 rounded-lg">รายการผู้ใช้</p>
            </div>
            <div className="mx-auto mt-10">
                <div className="flex justify-end"><button className="flex items-center gap-2 text-black/50 hover:text-black/80"><i className="bx bx-sort-alt-2 text-3xl"></i> <p>ได้รับคะแนนโหวต</p></button></div>
                <ProfileItem/>
                <ProfileItem/>
                <ProfileItem/>
                <ProfileItem/>
                <ProfileItem/>
                <ProfileItem/>
                <ProfileItem/>
                <ProfileItem/>
                <ProfileItem/>
                <ProfileItem/>
                <ProfileItem/>
                <ProfileItem/>
            </div>
        </main>
        {/* <section className="bg-gradient-to-t from-orange-200 fixed w-full h-full top-0 left-0 -z-10" /> */}
    </>
}