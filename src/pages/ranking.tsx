import SkyCardBadge from '../components/skycardbadge'

export default function RankingPage() {
  return (
    <>
        <main className="relative h-full grid grid-rows-[auto_1fr] pb-24">
            <div className="flex justify-center mt-10">
                <p className="text-xl bg-white/60 px-4 pb-1 pt-2 rounded-lg">10 อันดับท้องฟ้า ที่มีคนถูกใจมากที่สุด</p>
            </div>
            <div className="grid justify-center mt-6">
              <SkyCardBadge rank={1}/>
            </div>

            <div className="flex flex-wrap gap-8 mt-12 max-w-[82em] mx-auto justify-center">
              <SkyCardBadge rank={2}/>
              <SkyCardBadge rank={3}/>
              <SkyCardBadge rank={4}/>
              <SkyCardBadge rank={5}/>
              <SkyCardBadge rank={6}/>
              <SkyCardBadge rank={7}/>
              <SkyCardBadge rank={8}/>
              <SkyCardBadge rank={9}/>
              <SkyCardBadge rank={10}/>
            </div>
        </main>
        {/* <section className="bg-gradient-to-t from-orange-200 fixed w-full h-full top-0 left-0 -z-10" /> */}
    </>
  );
}
