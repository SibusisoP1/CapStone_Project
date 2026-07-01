import React from "react";
import footer_globe from "../assets/footer_globe.png";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";
import instagram from "../assets/instagram.png";
import "../style/footer.css";

const footer = () => {
  return (
    <footer>
      <div className="footer_content">
        <div className="footer_support">
          <h2>Support</h2>
          <div className="support_content">
            <span>Help Center</span>
            <span>Safety information</span>
            <span>Cancellation options</span>
            <span>Our COVID-19 Response</span>
            <span>Supporting people with disabilities</span>
            <span>Report a neighborhood concern</span>
          </div>
        </div>
        <div className="footer_community">
          <h2>Community</h2>
          <div className="community_content">
            <span>Airbnb.org: disaster relief housing</span>
            <span>Support: Afghan refugees</span>
            <span>Celebrate diversity & belonging</span>
            <span>Combating discrimination</span>
          </div>
        </div>
        <div className="footer_hosting">
          <h2>Hosting</h2>
          <div className="hosting_content_footer">
            <span>Try hosting</span>
            <span>AirCover for Hosts</span>
            <span>Explore hosting resources</span>
            <span>Visit our community forum</span>
            <span>How to host responsibly</span>
          </div>
        </div>
        <div className="footer_about">
          <h2>About</h2>
          <div className="about_content">
            <span>Newsroom</span>
            <span>Learn about new features</span>
            <span>Letter from our founders</span>
            <span>Careers</span>
            <span>Investors</span>
            <span>Airbnb Luxe</span>
          </div>
        </div>
      </div>
      <div className="footer_foot">
        <div className="footer_legal">
          <span>© 2024 Airbnb, Inc.</span>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Sitemap</span>
        </div>
        <div className="footer_socials">
          <span className="footer_globe">
            <img src={footer_globe} alt="Globe" />
          </span>
          <span>English (US)</span>
          <span>$ USD</span>
          <span className="footer_social_icons">
            <img src={facebook} alt="Facebook" />
            <img src={twitter} alt="Twitter" />
            <img src={instagram} alt="Instagram" />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default footer;
