import Kids from "../assets/images/Kids.jpg"
import Women from "../assets/images/Women.jpg"
import Men from "../assets/images/Memorabilia.jpg"

const Categories = () => {
    return (
        <>
            <section id="categories" className="hidden min-[648px]:flex">
                <div className="flex-1 relative overflow-hidden">
                    <a href="">
                        <img src={Kids} className="h-104.5 w-full object-cover transform transition-transform duration-300 hover:scale-110" alt="" />
                    </a>
                    <div className="absolute text-white bottom-6 left-1/2 -translate-x-1/2">
                        <h3 className="text-5xl uppercase leading-tight font-semibold mb-10">Kids</h3>
                        <p className="text-lg uppercase font-[var(--fontPrimary)] font-semibold">All products <span className="text-[var(--Color6)]"> up to 70% off</span> limited time discount</p>
                    </div>
                </div>
                <div className="flex-1 relative overflow-hidden">
                    <a href="">
                        <img src={Women} className="h-104.5 w-full object-cover transform transition-transform duration-300 hover:scale-110" alt="" />
                    </a>
                    <div className="absolute text-white bottom-6 left-1/2 -translate-x-1/2">
                        <h3 className="text-5xl uppercase leading-tight font-semibold mb-10">Womes</h3>
                        <p className="text-lg uppercase font-[var(--fontPrimary)] font-semibold">Gota store with a tool that makes design simple for everyone</p>
                    </div>
                </div>
                <div className="flex-1 relative overflow-hidden">
                    <a href="">
                        <img src={Men} className="h-104.5 w-full object-cover transform transition-transform duration-300 hover:scale-110" alt="" />
                    </a>
                    <div className="absolute text-white bottom-6 left-1/2 -translate-x-1/2">
                        <h3 className="text-5xl uppercase leading-tight font-semibold mb-10">Memorabilia</h3>
                        <p className="text-lg uppercase font-[var(--fontPrimary)] font-semibold">All products <span className="text-[var(--Color6)]">up to 70% off</span> limited time discount</p>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Categories