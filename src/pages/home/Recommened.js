import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

export const Recommened = () => {
    const {data: books = []} = useFetchAllBooksQuery();
    
    return (
        <div className="recommended-section">
        <h2 style={{ marginTop: "15px" }} className="recommended-title">Recommended for you</h2>
        
        <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 10 },
                480: { slidesPerView: 2, spaceBetween: 15 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 40 },
                1024: { slidesPerView: 3, spaceBetween: 50 },
                1180: { slidesPerView: 5, spaceBetween: 60 }
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="recommended-swiper"
        >
            {books.length > 0 && books.slice(5, 18).map((book, index) => (
                <SwiperSlide key={index} className="recommended-slide">
                    <BookCard book={book} />
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
    );
};