import { Link, Outlet } from "react-router-dom";
import 'boxicons/css/boxicons.min.css'

export default function AuthLayout() {
  return (
      <div className={`ibm`}>
        <section className="body min-h-[100dvh] grid grid-rows-[auto_minmax(0,1fr)]">
          <nav className="p-8 flex justify-between sticky top-0 z-50 backdrop-blur-lg">
            <div className="sect-left flex items-center gap-8 font-light">
              <div className="mr-8">
                <Link to={"/"}><h1 className={`sky text-4xl`}>SkyMesh</h1></Link>
              </div>
            </div>
          </nav>
          <Outlet/>
          <section className="bg-gradient-to-r from-orange-200 to-blue-100 fixed w-full h-full top-0 left-0 -z-10" >
            <div className="w-full h-full bg-white/20">

            </div>
          </section>
        </section>
      </div>
  );
}
