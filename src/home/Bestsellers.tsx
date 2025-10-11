import { useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Bestsellers = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const allProducts = [
        {
            id: 1,
            name: 'Lotto Flip-Flop Sports Slippers',
            price: '$180.00 - $280.00',
            category: 'Shoes, Clothing',
            productCategory: 'Men',
            imageUrl: 'https://store.fcbarcelona.com/cdn/shop/files/base-ambilight.webp?v=12057333375252784091'
        },
        {
            id: 2,
            name: 'Lotto Professional Sports',
            price: '$80.00 - $60.00',
            category: 'Shoes, Clothing',
            productCategory: 'Women',
            imageUrl: 'https://store.fcbarcelona.com/cdn/shop/files/base-ambilight.webp?v=12057333375252784091'
        },
        {
            id: 3,
            name: 'Vibox With Mash Lining',
            price: '$90.00 - $50.00',
            category: 'Shoes, Clothing',
            productCategory: 'Men',
            imageUrl: 'https://store.fcbarcelona.com/cdn/shop/files/base-ambilight.webp?v=12057333375252784091'
        },
        {
            id: 4,
            name: 'Running Shoes For Men',
            price: '$70.00 - $60.00',
            category: 'Shoes, Clothing',
            productCategory: 'Men',
            imageUrl: 'https://store.fcbarcelona.com/cdn/shop/files/base-ambilight.webp?v=12057333375252784091'
        },
        {
            id: 5,
            name: 'Women\'s Yoga Pants',
            price: '$50.00 - $70.00',
            category: 'Clothing',
            productCategory: 'Women',
            imageUrl: 'https://store.fcbarcelona.com/cdn/shop/files/base-ambilight.webp?v=12057333375252784091'
        },
        {
            id: 6,
            name: 'Kids Sneakers',
            price: '$40.00 - $60.00',
            category: 'Shoes',
            productCategory: 'Kids',
            imageUrl: 'https://store.fcbarcelona.com/cdn/shop/files/base-ambilight.webp?v=12057333375252784091'
        }
    ];

    const categories = ['All', 'Men\'s', 'Women\'s', 'Kids'];

    const filteredProducts = selectedCategory === 'All'
        ? allProducts
        : allProducts.filter(product => product.productCategory === selectedCategory.replace('\'s', ''));

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToScroll: 3,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <section id="bestsellers" className="py-20">
            <div className="container-custom">
                <div>
                    <div className="flex flex-col text-center mb-14">
                        <h2 className="uppercase font-bold text-4xl leading-normal mb-2">Explore Our Bestsellers</h2>
                        <p className="max-w-lg mx-auto mb-4 text-[var(--Color1)]">Commodo sociosqu venenatis cras dolor sagittis integer luctus sem primis eget maecenas sed urna malesuada.</p>
                        <div className="mx-auto flex justify-center mt-4">
                            {categories.map((category) => (
                                <div key={category}>
                                    <button
                                        className={`px-11 py-2.5 border-2 font-medium ${selectedCategory === category
                                            ? 'border-[var(--Color4)] text-[var(--Color4)]'
                                            : 'border-[var(--Color7)]'
                                            }`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="slider-container mt-6">
                        <Slider {...settings}>
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="px-2">
                                    <div className="border border-gray-200 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                        <img src={product.imageUrl} alt={product.name} className="w-full min-h-2/4 object-cover rounded" />
                                        <div className="text-left p-2">
                                            <span className="text-sm text-gray-500 block">{product.category}</span>
                                            <h3 className="text-md font-semibold mt-1">{product.name}</h3>
                                            <p className="text-md font-bold mt-1">{product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Bestsellers;