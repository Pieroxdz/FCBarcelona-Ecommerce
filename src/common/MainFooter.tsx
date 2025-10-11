type FooterLink = { label: string; href: string };

const getHelp: FooterLink[] = [
    { label: "Contact Us", href: "#" },
    { label: "Delivery Information", href: "#" },
    { label: "Sale Terms & Conditions", href: "#" },
    { label: "Privacy Notice", href: "#" },
    { label: "Shopping FAQs", href: "#" },
    { label: "Returns & Refunds", href: "#" },
];

const categories: FooterLink[] = [
    { label: "Sneaker", href: "#" },
    { label: "Clothing & Stools", href: "#" },
    { label: "Helmet for Women’s", href: "#" },
    { label: "Basketball", href: "#" },
    { label: "Mens Running", href: "#" },
    { label: "Footwear", href: "#" },
    { label: "Outerwears", href: "#" },
    { label: "Men’s", href: "#" },
    { label: "Kids & Young", href: "#" },
];

const bottomLinks: FooterLink[] = [
    { label: "Site Map", href: "#" },
    { label: "Search Terms", href: "#" },
    { label: "Advanced Search", href: "#" },
    { label: "Contact Us", href: "#" },
];

const MainFooter = () => {
    const year = new Date().getFullYear();

    return (
        <footer id="main-footer" className="bg-neutral-900 text-neutral-300 py-20">
            {/* Top content */}
            <div className="container-custom sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Contact info */}
                    <section aria-labelledby="footer-contact" className="space-y-4">
                        <h2 id="footer-contact" className="text-sm font-semibold tracking-wider text-white/90">
                            CONTACT INFO
                        </h2>
                        <address className="not-italic text-sm leading-7 text-neutral-400">
                            <p>
                                <span className="block text-neutral-300">Add:</span>
                                734 Riverwood Drive, Suite 245 Cottonwood
                            </p>
                            <p>Beverly Hill, Melbourne, USA.</p>
                            <p>
                                <span className="text-neutral-300">Email:</span> <a className="hover:underline" href="mailto:Contact@erentheme.com">Contact@erentheme.com</a>
                            </p>
                            <p>
                                <span className="text-neutral-300">Fax:</span> (+100) 123 456 7890 - (+100) 123 456 7891
                            </p>
                        </address>

                        <div className="space-y-3 pt-1">
                            <p className="text-sm font-semibold tracking-wider text-white/90">FOLLOW US ON</p>
                            <div className="flex items-center gap-3">
                                <i className="fa-brands fa-facebook"></i>
                                <i className="fa-brands fa-x-twitter"></i>
                                <i className="fa-brands fa-instagram"></i>
                                <i className="fa-brands fa-google-plus-g"></i>
                                <i className="fa-brands fa-dribbble"></i>
                            </div>
                        </div>
                    </section>

                    {/* Get Help */}
                    <nav aria-labelledby="footer-help" className="space-y-4">
                        <h2 id="footer-help" className="text-sm font-semibold tracking-wider text-white/90">GET HELP</h2>
                        <ul className="space-y-3 text-sm">
                            {getHelp.map((l) => (
                                <li key={l.label}>
                                    <a href={l.href} className="text-neutral-400 hover:text-white">{l.label}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Popular Categories */}
                    <nav aria-labelledby="footer-popular" className="space-y-4">
                        <h2 id="footer-popular" className="text-sm font-semibold tracking-wider text-white/90">POPULAR CATEGORIES</h2>
                        <ul className="space-y-3 text-sm">
                            {categories.map((c) => (
                                <li key={c.label}>
                                    <a href={c.href} className="text-neutral-400 hover:text-white">{c.label}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Newsletter */}
                    <section aria-labelledby="footer-newsletter" className="space-y-4">
                        <h2 id="footer-newsletter" className="text-sm font-semibold tracking-wider text-white/90">GET IN TOUCH</h2>
                        <p className="text-sm leading-6 text-neutral-400">
                            Sign up for all the news about our latest arrivals and get an exclusive early access shopping. Join
                            <span className="mx-1 font-semibold text-white">60,000+ Subscribers</span> and get a new discount coupon on every Saturday.
                        </p>
                        <form className="flex w-full max-w-md items-stretch overflow-hidden rounded-xl bg-neutral-800/70 ring-1 ring-neutral-700 focus-within:ring-neutral-500">
                            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                            <input
                                id="newsletter-email"
                                type="email"
                                placeholder="Enter your email here..."
                                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="flex items-center gap-2 bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-500"
                            >
                                <i className="fa-solid fa-paper-plane"></i>
                                Subscribe
                            </button>
                        </form>
                    </section>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-neutral-800">
                <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-6 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <p>
                        Copyright © {year} <a href="#" className="font-semibold text-teal-400 hover:text-teal-300">Gota Store</a> All Rights Reserved. Powered by
                        <a href="#" className="ml-1 font-semibold text-teal-400 hover:text-teal-300">theme_pure</a>
                    </p>

                    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        {bottomLinks.map((b) => (
                            <li key={b.label}>
                                <a href={b.href} className="hover:text-white">{b.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default MainFooter