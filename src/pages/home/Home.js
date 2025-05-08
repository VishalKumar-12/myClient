import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";

import { addToCart as addToCartAction } from "../../redux/features/cart/cartSlice";
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Home.css";
import TopSellers from './TopSellers';
import { Recommened } from "./Recommened";
// Import images
import img1 from '../../assets/img1.jpg';
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.png";

// Import bundle and about images
import b1 from "../../assets/b1.jpg";
import b2 from "../../assets/b2.jpg";
import b3 from "../../assets/b3.jpg";
import b4 from "../../assets/b4.jpg";
import about from "../../assets/About.png";

import au1 from "../../assets/author/au1.jpg";
import au2 from "../../assets/author/au2.jpg";
import au3 from "../../assets/author/au3.jpg";
import au4 from "../../assets/author/au4.jpg";
import au5 from "../../assets/author/au5.jpg";
import au6 from "../../assets/author/au6.jpg";
import au7 from "../../assets/author/au7.jpg";

export const Home = ({ productsCount, setProductsCount }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Auto-slider effect for background images: Change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProductsCount((prevCount) => (prevCount + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, [setProductsCount]);
  
  // Product images array
  const productImages = [img1, img2, img3];
  const selectedImage = productImages[productsCount] || img1;

  // Authors array
  const authors = [
    { id: 1, name: "John Smith", image: au1 },
    { id: 2, name: "Emily Johnson", image: au2 },
    { id: 3, name: "Michael Williams", image: au3 },
    { id: 4, name: "Sarah Brown", image: au4 },
    { id: 5, name: "David Jones", image: au5 },
    { id: 6, name: "Jennifer Davis", image: au6 },
    { id: 7, name: "Robert Wilson", image: au7 },
  ];
  
  // Settings for author slider with autoplay
  const authorSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1800,
    cssEase: "linear"
  };
  
  return (
    <main>
      <div className="discount">
        <p>Grab Bestselling Books Upto 50% Off!</p>
      </div>

      <div className="background-container">
        <img src={selectedImage} className="background fade-in" alt={`Background ${productsCount}`} />
      </div>
      <TopSellers/>
      <Recommened />
      
      <div className="bundle-products">
        <div className="bundle-slider">
          <Slider dots infinite speed={500} slidesToShow={3} slidesToScroll={1}>
            <Link to="/action">
              <div><img src={b1} alt="Bundle Product 1" /></div>
            </Link>
            <Link to="non-fiction">
              <div><img src={b2} alt="Bundle Product 2" /></div>
            </Link>
            <Link>
              <div><img src={b3} alt="Bundle Product 3" /></div>
            </Link>
            <div><img src={b4} alt="Bundle Product 4" /></div>
          </Slider>
        </div>
      </div>

      <div className="author">
        <div className="author-slider">
          <h2 style={{ marginTop: "15px" }}>Our Authors</h2>
          <Slider {...authorSliderSettings}>
            {authors.map((author) => (
              <div key={author.id} className="author-item">
                <img src={author.image} alt={`Author ${author.name}`} />
                <p className="author-name">{author.name}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      
      <div className="about">
      <Link to="/aboutpage">
      <img src={about} alt="About" className="about-image" />
      </Link>
        
        <p className="about-title">bookNest</p>
        <p className="about-description">
          Welcome to bookNest, your go-to platform for discovering and purchasing a wide variety of books from different genres.
          Whether you're into action, thriller, drama, or comics, we have something for every reader. Our mission is to provide 
          readers with a seamless, enjoyable experience and to help you find your next great read at the best prices.
        </p>
      </div> 
    </main>
  );
};