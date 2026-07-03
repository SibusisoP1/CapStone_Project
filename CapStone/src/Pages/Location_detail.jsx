import React, { useState, useEffect } from "react";
import red_star from "../assets/red_star.png";
import red_badge from "../assets/red_badge.png";
import share from "../assets/share.png";
import heart from "../assets/heart.png";
import "../style/Location_details.css";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";
import flag from "../assets/flag.png";
import bedroom from "../assets/bedroom.png";
import leaf from "../assets/leaf.png";
import toast from "../assets/toast.png";
import wifi from "../assets/wifi.png";
import music from "../assets/music.png";
import fire from "../assets/fire.png";
import wind from "../assets/wind.png";
import camera from "../assets/camera.png";
import house from "../assets/house.png";
import byce from "../assets/byce.png";
import bone from "../assets/bone.png";
import Date_selector from "../components/Date_selector";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance, { resolveImageUrl } from "../api/axiosInstance";
import { createReservation } from "../action/reservationAction";
import { RESERVATION_CREATE_RESET } from "../types/reservationTypes";
import calender from "../assets/calender.png";
import big_star from "../assets/big_star.png";
import Bar from "../assets/Bar.png";
import Low_Bar from "../assets/Low_Bar.png";
import Jose from "../assets/Jose.png";
import Shayna from "../assets/Shayna.png";
import Vladko from "../assets/Vladko.png";
import Luke from "../assets/Luke.png";
import Josh from "../assets/Josh.png";
import Jennifer from "../assets/Jennifer.png";
import Ghazel from "../assets/Ghazel.png";
import Shield from "../assets/shield_tick.png";
import Frame from "../assets/Frame.png";
import clock from "../assets/clock.png";
import door_enter from "../assets/door_enter.png";
import credit_card from "../assets/credit_card.png";
import spray_paint from "../assets/spray_paint.png";
import shopping_cart from "../assets/shopping_cart.png";
import party from "../assets/party.png";
import starIcon from "../assets/star.png";

const Location_detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [hotel, setHotel] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reservationCreate = useSelector((state) => state.reservationCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = reservationCreate;

  useEffect(() => {
    let ignore = false;
    const fetchHotel = async () => {
      try {
        const { data } = await axiosInstance.get(`/hotel/hotels/${id}`);
        if (!ignore) setHotel(data);
      } catch {
        if (!ignore) setHotel(null);
      }
    };
    if (id) fetchHotel();
    return () => {
      ignore = true;
    };
  }, [id]);

  useEffect(() => {
    if (createSuccess) {
      dispatch({ type: RESERVATION_CREATE_RESET });
      navigate("/admin/reservations");
    }
  }, [createSuccess, dispatch, navigate]);

  const formatDay = (date) =>
    date ? date.toLocaleDateString() : "Select date";

  const toInputValue = (date) => {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const parseInputValue = (value) =>
    value ? new Date(`${value}T00:00:00`) : null;

  const todayValue = toInputValue(new Date());

  const minCheckOutValue = checkIn
    ? toInputValue(new Date(checkIn.getTime() + 86400000))
    : todayValue;

  const handleCheckInChange = (e) => {
    const next = parseInputValue(e.target.value);
    setCheckIn(next);
    if (next && checkOut && checkOut <= next) {
      setCheckOut(null);
    }
  };

  const handleReserve = () => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }
    dispatch(
      createReservation({
        hotel_id: id,
        checkin: checkIn.toISOString(),
        checkout: checkOut.toISOString(),
      }),
    );
  };

  return (
    <div className="Location_detail">
      <div className="details_container">
        <div className="loc_detail_header">
          <div className="detail_left">
            <h1>{hotel ? hotel.name : "Getaway"}</h1>
            <div className="left_details">
              <div className="l_left">
                <span>
                  <img src={red_star} alt="" />
                </span>
                <span>5.0</span>
                <span>7 reviews</span>
                <span>
                  <img src={red_badge} alt="" />
                </span>
                <span> Superhost </span>
                <span> Bordex, france</span>
              </div>
              <div className="l_right">
                <span>
                  <img src={share} alt="" />
                </span>
                <span>share</span>
                <span>
                  <img src={heart} alt="" />
                </span>
                <span>save</span>
              </div>
            </div>
          </div>
        </div>
        <div className="loc_detail_body">
          <div className="loc_detail_images">
            <div className="big_image">
              <span>
                <img src={resolveImageUrl(hotel?.img)} alt="big image" />
              </span>
            </div>
            <div className="small_images">
              <div className="top_images">
                <span>
                  <img src={resolveImageUrl(hotel?.img)} alt="top1" />
                </span>
                <span>
                  <img src={resolveImageUrl(hotel?.img)} alt="top2" />
                </span>
              </div>
              <div className="bottom_images">
                <span>
                  <img src={resolveImageUrl(hotel?.img)} alt="bottom1" />
                </span>
                <span>
                  <img src={resolveImageUrl(hotel?.img)} alt="bottom2" />
                </span>
              </div>
            </div>
          </div>
          <div className="loc_body_section1">
            <div className="section1_left">
              <div className="sect1_header">
                <div className="sect1_header_left">
                  <h1>Entire Rental unit hosted by Gazel</h1>
                  <div className="sect1_header_left_d">
                    <span>2 Guest</span>
                    <span>1 bedroom</span>
                    <span>1 bed</span>
                    <span>1 bath</span>
                  </div>
                </div>
                <div className="sect1_header_right">
                  <span>
                    <img src={Ghazel} alt="profile" />
                  </span>
                </div>
              </div>
              <div className="sect1_body">
                <div className="row">
                  <div className="icon1">
                    <img src={icon1} alt="" />
                  </div>
                  <div className="icon1_detail">
                    <h3>Entire Home</h3>
                    <span>youll have the apartment for your self</span>
                  </div>
                </div>
                <div className="row">
                  <div className="icon2">
                    <img src={icon2} alt="" />
                  </div>
                  <div className="icon2_detail">
                    <h3>Enhance clean</h3>
                    <span>
                      The host is commited to air bnb 5-enhancement cleaning
                      process
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="icon3">
                    <img src={icon3} alt="" />
                  </div>
                  <div className="icon3_detail">
                    <h3>Self check-in</h3>
                    <span>Check your self in with keypad</span>
                  </div>
                </div>
                <div className="row">
                  <div className="icon4">
                    <img src={icon4} alt="" />
                  </div>
                  <div className="icon4_detail">
                    <h3>Free cancellationFeb 14</h3>
                  </div>
                </div>
              </div>
              <div className="sect1_footer">
                <span>
                  Come and stay in this superb duplex T2, in the heart of the
                  historic center of Bordeaux. Spacious and bright, in a real
                  Bordeaux building in exposed stone, you will enjoy all the
                  charms of the city thanks to its ideal location. Close to many
                  shops, bars and restaurants, you can access the apartment by
                  tram A and C and bus routes 27 and 44. ...
                </span>
                <span className="show_more">Show More</span>
              </div>
            </div>
            <div className="section1_right">
              <div className="sect1_price_container">
                <div className="price_header">
                  <span className="p">${hotel ? hotel.price : 75}/ night</span>
                  <div className="price_header_right">
                    <span>
                      <img src={starIcon} alt="star" />
                    </span>
                    <span>5.0</span>
                    <span>7 reviews</span>
                  </div>
                </div>
                <div className="check_sect">
                  <div className="check">
                    <div className="checkin">
                      <span className="check_tittle">check-in</span>
                      <input
                        type="date"
                        className="check_input"
                        min={todayValue}
                        value={toInputValue(checkIn)}
                        onChange={handleCheckInChange}
                      />
                    </div>
                    <div className="checkout">
                      <span className="check_tittle">check-out</span>
                      <input
                        type="date"
                        className="check_input"
                        min={minCheckOutValue}
                        value={toInputValue(checkOut)}
                        onChange={(e) =>
                          setCheckOut(parseInputValue(e.target.value))
                        }
                      />
                    </div>
                  </div>
                  <div className="guest">
                    <span className="check_tittle">Guests</span>
                    <select
                      className="guest_select"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="btn_reserve">
                  <button onClick={handleReserve} disabled={createLoading}>
                    {createLoading ? "Reserving..." : "Reserve"}
                  </button>
                  {createError ? (
                    <span className="listing_error">{createError}</span>
                  ) : (
                    <span>You wount be charged yet</span>
                  )}
                </div>
                <div className="price_detail">
                  <div className="p_row1">
                    <span>$79 x 7 nights</span>
                    <span>$555</span>
                  </div>
                  <div className="p_row1">
                    <span>Weekly discount</span>
                    <span className="discount">-$28</span>
                  </div>
                  <div className="p_row1">
                    <span>Cleaning fee</span>
                    <span>$62</span>
                  </div>
                  <div className="p_row1">
                    <span>Service fee</span>
                    <span>$83</span>
                  </div>
                  <div className="p_row1">
                    <span>Occupancy taxes and fees</span>
                    <span>$29</span>
                  </div>
                </div>
                <div className="total_price">
                  <span>Total</span>
                  <span>$701</span>
                </div>
              </div>
              <div className="sect1_right_footer">
                <span>
                  <img src={flag} alt="" />
                </span>
                <span>Report this listing</span>
              </div>
            </div>
          </div>
          <div className="loc_body_section2">
            <div className="sect2_tittle">
              <h2>Where you'll sleep</h2>
            </div>
            <div className="sect2_img">
              <img src={bedroom} alt="sect2_img" />
            </div>
            <div className="sect2_footer">
              <h4>Bedroom</h4>
              <span>1 queen bed</span>
            </div>
          </div>
          <div className="loc_body_section3">
            <div className="sect3_tittle">
              <h1>What this place offers</h1>
            </div>
            <div className="sect3_details">
              <div className="sect3_left">
                <div className="sect3_l">
                  <span>
                    <img src={leaf} alt="" />
                  </span>
                  <span>Garden view</span>
                </div>
                <div className="sect3_l">
                  <span>
                    <img src={wifi} alt="" />
                  </span>
                  <span>Wifi</span>
                </div>
                <div className="sect3_l">
                  <span>
                    <img src={music} alt="" />
                  </span>
                  <span>Fresh washer - in building</span>
                </div>
                <div className="sect3_l">
                  <span>
                    <img src={wind} alt="" />
                  </span>
                  <span>Central air conditioning</span>
                </div>
                <div className="sect3_l">
                  <span>
                    <img src={house} alt="" />
                  </span>
                  <span>Refrigerator</span>
                </div>
              </div>
              <div className="sect3_right">
                <div className="sect3_r">
                  <span>
                    <img src={toast} alt="" />
                  </span>
                  <span>Kitchen</span>
                </div>
                <div className="sect3_r">
                  <span>
                    <img src={bone} alt="" />
                  </span>
                  <span>Pets allowed</span>
                </div>
                <div className="sect3_r">
                  <span>
                    <img src={fire} alt="" />
                  </span>
                  <span>Dryer</span>
                </div>
                <div className="sect3_r">
                  <span>
                    <img src={camera} alt="" />
                  </span>
                  <span>Security cameras on property</span>
                </div>
                <div className="sect3_r">
                  <span>
                    <img src={byce} alt="" />
                  </span>
                  <span>Bicycles</span>
                </div>
              </div>
            </div>
            <div className="sect3_button">
              <button>Show all 37 amenities</button>
            </div>
          </div>
          <div className="loc_body_section4">
            <div className="sect4_tittles">
              <h1>7 nights in New York</h1>
              <span>
                <span>
                  {checkIn ? checkIn.toLocaleDateString() : "Select Check-in"}
                </span>
                {" - "}
                <span>
                  {checkOut
                    ? checkOut.toLocaleDateString()
                    : "Select Check-out"}
                </span>
              </span>
            </div>
            <div className="date">
              <Date_selector
                checkIn={checkIn}
                setCheckIn={setCheckIn}
                checkOut={checkOut}
                setCheckOut={setCheckOut}
              />
            </div>
            <div className="sect4_footer">
              <div className="cal_logo">
                <img src={calender} alt="" />
              </div>
              <span>Clear dates</span>
            </div>
          </div>
          <div className="loc_body_section5">
            <div className="sect5_tittle">
              <span>
                <img src={big_star} alt="" />
              </span>
              <h1>5.0 .7 reviews</h1>
            </div>
            <div className="sect5_body">
              <div className="sect5_body_left">
                <div className="sect5_row">
                  <span>Cleanliness</span>
                  <div>
                    <div className="bar_line">
                      <span>
                        <img src={Bar} alt="" />
                      </span>
                      <span>5.0</span>
                    </div>
                  </div>
                </div>
                <div className="sect5_row">
                  <span>Communication</span>
                  <div>
                    <div className="bar_line">
                      <span>
                        <img src={Bar} alt="" />
                      </span>
                      <span>5.0</span>
                    </div>
                  </div>
                </div>
                <div className="sect5_row">
                  <span>Check-in</span>
                  <div>
                    <div className="bar_line">
                      <span>
                        <img src={Bar} alt="" />
                      </span>
                      <span>5.0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sect5_body_left">
                <div className="sect5_row">
                  <span>Accuracy</span>
                  <div>
                    <div className="bar_line">
                      <span>
                        <img src={Bar} alt="" />
                      </span>
                      <span>5.0</span>
                    </div>
                  </div>
                </div>
                <div className="sect5_row">
                  <span>Location</span>
                  <div>
                    <div className="bar_line">
                      <span>
                        <img src={Bar} alt="" />
                      </span>
                      <span>5.0</span>
                    </div>
                  </div>
                </div>
                <div className="sect5_row">
                  <span>Venue</span>
                  <div>
                    <div className="bar_line">
                      <span>
                        <img src={Low_Bar} alt="" />
                      </span>
                      <span>4.7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sect5_footer">
              <div className="sect5_footer_left">
                <div className="reviewer">
                  <div className="review_header">
                    <div className="review_profile_image">
                      <img src={Jose} alt="" />
                    </div>
                    <div className="review_profile">
                      <h4>Jose</h4>
                      <span>December 2021</span>
                    </div>
                  </div>
                  <div className="review_body">
                    <span>Host was very attentive.</span>
                  </div>
                </div>
                <div className="reviewer">
                  <div className="review_header">
                    <div className="review_profile_image">
                      <img src={Shayna} alt="" />
                    </div>
                    <div className="review_profile">
                      <h4>Shayna</h4>
                      <span>December 2021</span>
                    </div>
                  </div>
                  <div className="review_body">
                    <span>
                      Wonderful neighborhood, easy access to restaurants and the
                      subway, cozy studio apartment with a super comfortable
                      bed. Great host, super helpful and responsive. Cool murphy
                      bed...
                    </span>
                  </div>
                  <div className="review_footer">
                    <span>Show More</span>
                  </div>
                </div>
                <div className="reviewer">
                  <div className="review_header">
                    <div className="review_profile_image">
                      <img src={Vladko} alt="" />
                    </div>
                    <div className="review_profile">
                      <h4>Vladko</h4>
                      <span>November 2020</span>
                    </div>
                  </div>
                  <div className="review_body">
                    <span>
                      This is amazing place. It has everything one needs for a
                      monthly business stay. Very clean and organized place.
                      Amazing hospitality affordable price.
                    </span>
                  </div>
                </div>
              </div>
              <div className="sect5_footer_left">
                <div className="reviewer">
                  <div className="review_header">
                    <div className="review_profile_image">
                      <img src={Luke} alt="" />
                    </div>
                    <div className="review_profile">
                      <h4>Luke</h4>
                      <span>December 2021</span>
                    </div>
                  </div>
                  <div className="review_body">
                    <span>Nice place to stay!</span>
                  </div>
                </div>
                <div className="reviewer">
                  <div className="review_header">
                    <div className="review_profile_image">
                      <img src={Josh} alt="" />
                    </div>
                    <div className="review_profile">
                      <h4>Josh</h4>
                      <span>November 2021</span>
                    </div>
                  </div>
                  <div className="review_body">
                    <span>
                      Well designed and fun space, neighborhood has lots of
                      energy and amenities.
                    </span>
                  </div>
                </div>
                <div className="reviewer">
                  <div className="review_header">
                    <div className="review_profile_image">
                      <img src={Jennifer} alt="" />
                    </div>
                    <div className="review_profile">
                      <h4>Jennifer</h4>
                      <span>November 2021</span>
                    </div>
                  </div>
                  <div className="review_body">
                    <span>
                      A centric place, near of a sub station and a supermarket
                      with everything you need. ...
                    </span>
                  </div>
                  <div className="review_footer">
                    <span>Show More</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="sect5_footer_foot">
              <button>Show all 12 reviews</button>
            </div>
          </div>
          <div className="loc_body_section6">
            <div className="sect6_title">
              <div className="sect6_tittle_header">
                <div className="sect6_img">
                  <img src={Ghazel} alt="" />
                </div>
                <div className="sect6_profile_detail">
                  <h1>Hosted by Ghazal</h1>
                  <span>Joined May 2021</span>
                </div>
              </div>
              <div className="tittle_detail">
                <div>
                  <span>
                    <img src={red_star} alt="" />
                  </span>
                  <span>12 Reviews</span>
                </div>
                <div>
                  <span>
                    <img src={Shield} alt="" />
                  </span>
                  <span>Identity verified</span>
                </div>
                <div>
                  <span>
                    <img src={red_badge} alt="" />
                  </span>
                  <span>Superhost</span>
                </div>
              </div>
            </div>
            <div className="sect6_body">
              <div className="sect6_body_tittle">
                <h4>Ghazal is a superhost</h4>
              </div>
              <div className="sect6_body_body">
                <span>
                  Superhosts are experienced, highly rated hosts who are
                  committed to providing great stays for guests.
                </span>
                <span>Response rate: 100%</span>
                <span>Response time: within an hour</span>
              </div>
            </div>
            <div className="sect6_footer">
              <div className="btn_contact">
                <button>Contact host</button>
              </div>
              <div className="protect">
                <div className="protect_logo">
                  <img src={Frame} alt="" />
                </div>
                <span>
                  To protect your payment, never transfer money or communicate
                  outside of the Airbnb website or app.
                </span>
              </div>
            </div>
          </div>
          <div className="loc_body_section7">
            <div className="sect7_tittle">
              <h3>Things to know</h3>
            </div>
            <div className="sect7_body">
              <div className="sect7_body_left">
                <dov className="sect7_body_left_title">
                  <h5>House rules</h5>
                </dov>
                <div className="sect7_body_left_body">
                  <div className="sect7_row">
                    <span>
                      <img src={clock} alt="" />
                    </span>
                    <span>Check-in: After 4:00 PM</span>
                  </div>
                  <div className="sect7_row">
                    <span>
                      <img src={clock} alt="" />
                    </span>
                    <span>Checkout: 10:00 AM</span>
                  </div>
                  <div className="sect7_row">
                    <span>
                      <img src={door_enter} alt="" />
                    </span>
                    <span>Self check-in with lockbox</span>
                  </div>
                  <div className="sect7_row">
                    <span>
                      <img src={shopping_cart} alt="" />
                    </span>
                    <span>Not suitable for infants (under 2 years)</span>
                  </div>
                  <div className="sect7_row">
                    <span>
                      <img src={fire} alt="" />
                    </span>
                    <span>No smoking</span>
                  </div>
                  <div className="sect7_row">
                    <span>
                      <img src={bone} alt="" />
                    </span>
                    <span>No pets</span>
                  </div>
                  <div className="sect7_row">
                    <span>
                      <img src={party} alt="" />
                    </span>
                    <span>No parties or events</span>
                  </div>
                </div>
              </div>
              <div className="sect7_body_left">
                <dov className="sect7_body_left_title">
                  <h5>Health & Safety</h5>
                </dov>
                <div className="sect7_body_left_body">
                  <div className="sect7_row">
                    <span>
                      <img src={icon2} alt="" />
                    </span>
                    <span>
                      Committed to Airbnb's enhanced cleaning process. Show more
                    </span>
                  </div>
                  <div className="sect7_row">
                    <span>
                      <img src={spray_paint} alt="" />
                    </span>
                    <span>
                      Airbnb's social-distancing and other COVID-19-related
                      guidelines apply
                    </span>
                  </div>
                  <div className="sect7_row">
                    <span>
                      <img src={wind} alt="" />
                    </span>
                    <span>Carbon monoxide alarm</span>
                  </div>
                  <div className="sect7_row">
                    <span>
                      <img src={music} alt="" />
                    </span>
                    <span>Smoke alarm</span>
                  </div>
                  <div className="sect7_row">
                    <span>
                      <img src={credit_card} alt="" />
                    </span>
                    <span>
                      Security Deposit - if you damage the home, you may be
                      charged up to $566
                    </span>
                  </div>
                  <span>Show More</span>
                </div>
              </div>
              <div className="sect7_body_left">
                <dov className="sect7_body_left_title">
                  <h5>Cancellation policy</h5>
                </dov>
                <div className="sect7_body_left_body">
                  <div className="sect7_row">
                    <span>Free cancellation before Feb 14</span>
                  </div>
                  <span>Show More</span>
                </div>
              </div>
            </div>
          </div>
          <div className="loc_body_section8">
            <div className="sect8_tittle">
              <h3>Explore other options in France</h3>
            </div>
            <div className="sect8_body">
              <div>
                <span>Paris</span>
                <span>Lille</span>
                <span>Toulouse</span>
              </div>
              <div>
                <span>Nice</span>
                <span>Aix-en-Provence</span>
                <span>Montpellier</span>
              </div>
              <div>
                <span>Lyon</span>
                <span>Rouen</span>
                <span>Dijon</span>
              </div>
              <div>
                <span>Marseille</span>
                <span>Amiens</span>
                <span>Grenoble</span>
              </div>
            </div>
            <div className="sect8_footer">
              <div>
                <span>Beach House Rentals</span>
                <span>Cabin Rentals</span>
              </div>
              <div>
                <span>Camper Rentals</span>
                <span>Tiny House Rentals</span>
              </div>
              <div>
                <span>Glamping Rentals</span>
                <span>Lakehouse Rentals</span>
              </div>
              <div>
                <span>Treehouse Rentals</span>
                <span>Mountain Chalet Rentals</span>
              </div>
            </div>
            <div className="sect8_closer">
              <span>AirBnb</span>
              <span>Europe</span>
              <span>France</span>
              <span>Boardex</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location_detail;
