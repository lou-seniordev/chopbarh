import React from "react";

export default function Footer() {
  return (
    <footer class="footer">
      <div class="footer__container">
        <div class="">
          <img src="assets/img/Chopbarr@2x.png" alt="" srcset="" />
          <p>Paragraph</p>
        </div>
        <div class="">
          <div class="footer-link__header">
            <p>Chopbarh</p>
          </div>
          <div class="footer-link__item-container">
            <p>
              <a href="about">About Us</a>
            </p>
            <p>
              <a href="terms">Terms and Conditions</a>
            </p>
            <p>
              <a href="privacy">Privacy Policy</a>
            </p>
            <p>
              <a href="gambling">Responsible Gambling</a>
            </p>
            <p>
              <a href="parnter">Become a Partner</a>
            </p>
          </div>
        </div>
        <div class="">
          <div class="footer-link__header">
            <p>Gaming</p>
          </div>
          <div class="footer-link__item-container">
            <p>
              <a href="play">How to Play</a>
            </p>
            <p>
              <a href="games">Games</a>
            </p>
            <p>
              <a href="betting">Betting</a>
            </p>
            <p>
              <a href="download">Download</a>
            </p>
            <p>
              <a href="talk">Talk to us</a>
            </p>
          </div>
        </div>
        <div class="align-self-start">
          <div class="footer-link__header">
            <p>Contact Us</p>
          </div>
          <div class="footer-link__item-container">
            <p>Telephone: 09038764982</p>
            <p>Email: help@chopbarh.com</p>
            <p>&copy; 2019</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
