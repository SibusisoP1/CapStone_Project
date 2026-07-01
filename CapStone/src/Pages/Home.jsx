import React from "react";
import { Link } from "react-router-dom";
import "../style/Home.css";
import Banner from "../assets/Banner.jpg";
import Sandton_City_Hotel from "../assets/Sandton_City_Hotel.jpg";
import Joburg_City_Hotel from "../assets/Joburg_City_Hotel.jpg";
import Woodmead_Hotel from "../assets/Woodmead_Hotel.jpg";
import Hydes_Park from "../assets/Hydes_Park.jpg";
import Canyon from "../assets/Canyon.jpg";
import berries from "../assets/berries.jpg";
import Gift_card from "../assets/Gift_card.jpg";
import hosting from "../assets/hosting.jpg";

const Home = () => {
  return (
    <div className="home">
      <div className="hero-container">
        {/* Background Image */}
        <img src={Banner} alt="Banner Background" className="hero-image" />

        {/* Content Overlaid on Top */}
        <div className="hero-content">
          <h1></h1>
          <p>Not sure where to go? Perfect</p>
          <Link to="/locations">
            <button className="hero-button">Get Started</button>
          </Link>
        </div>
      </div>
      <div className="body">
        <div className="cards_section">
          <h3>Inspiration for your next trip</h3>
          <div className="cards">
            <Link to="/location/1" className="card card-1">
              <img src={Sandton_City_Hotel} alt="Sandton City Hotel" />
              <h2>Sandton City Hotel</h2>
              <span>53 km away</span>
            </Link>
            <Link to="/location/2" className="card card-2">
              <img src={Joburg_City_Hotel} alt="Joburg City Hotel" />
              <h2>Joburg City Hotel</h2>
              <span>168 km away</span>
            </Link>
            <Link to="/location/3" className="card card-3">
              <img src={Woodmead_Hotel} alt="Woodmead Hotel" />
              <h2>Woodmead Hotel</h2>
              <span>30 miles away</span>
            </Link>
            <Link to="/location/4" className="card card-4">
              <img src={Hydes_Park} alt="Hydes Park" />
              <h2>Hydes Park</h2>
              <span>34 km away</span>
            </Link>
          </div>
        </div>
        <div className="todo_cards-section">
          <h3>Discover Airbnb Experiences</h3>
          <div className="todo_cards">
            <div className="todo_card">
              <img src={Canyon} alt="Todo Card" />
              <div className="todo_card_content">
                <h1>Things to do on your trip</h1>
                <button>Experinces</button>
              </div>
            </div>
            <div className="todo_card">
              <img src={berries} alt="Todo Card" />
              <div className="todo_card_content">
                <h1>Things to do from home</h1>
                <button>Online Experinces</button>
              </div>
            </div>
          </div>
        </div>
        <div className="gift_card_section">
          <div className="gift_card_header">
            <h3>Shop Airbnb gift cards</h3>
            <button>Learn more</button>
          </div>
          <img src={Gift_card} alt="Gift Card" className="gift_card" />
        </div>
        <div className="hosting_section">
          <img src={hosting} alt="Hosting" />
          <div className="hosting_content">
            <h1>Questions about hosting?</h1>
            <Link to="/admin">
              <button>Ask a Superhost</button>
            </Link>
          </div>
        </div>
        <div className="getaways">
          <h2>Inspiration for future getaways</h2>
          <div className="getaways_content">
            <div className="destinations">
              <span className="top_tittle">
                Destinations for arts & culture
              </span>
              <div className="destination">
                <span className="title">Phoenix</span>
                <span className="location">Arizona</span>
              </div>
              <div className="destination">
                <span className="title">San Francisco</span>
                <span className="location">California</span>
              </div>
              <div className="destination">
                <span className="title">Keswick</span>
                <span className="location">England</span>
              </div>
            </div>
            <div className="destinations">
              <span className="top_tittle">
                Destinations for outdoor adventure
              </span>
              <div className="destination">
                <span className="title">Hot Springs</span>
                <span className="location">Arkansas</span>
              </div>
              <div className="destination">
                <span className="title">Barcelona</span>
                <span className="location">Catalonia</span>
              </div>
              <div className="destination">
                <span className="title">London</span>
                <span className="location">England</span>
              </div>
            </div>
            <div className="destinations">
              <span className="top_tittle">Mountain cabins</span>
            </div>
            <div className="destinations">
              <span className="top_tittle">Beach destinations</span>
              <div className="destination">
                <span className="title">Los Angeles</span>
                <span className="location">California</span>
              </div>
              <div className="destination">
                <span className="title">Prague</span>
                <span className="location">Czechia</span>
              </div>
              <div className="destination">
                <span className="title">Scarborough</span>
                <span className="location">England</span>
              </div>
            </div>
            <div className="destinations">
              <span className="top_tittle">Popular destinations</span>
            </div>
            <div className="destinations">
              <span className="top_tittle">Unique Stays</span>
              <div className="destination">
                <span className="title">San Diego</span>
                <span className="location">California</span>
              </div>
              <div className="destination">
                <span className="title">Washington</span>
                <span className="location">District of Columbia</span>
              </div>
              <div className="Show_More">
                <span>Show More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;