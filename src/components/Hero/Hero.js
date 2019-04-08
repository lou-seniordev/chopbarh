import React from "react";

export default function Hero() {
  return (
    <div>
      <div class="hero__content">
        <img src="assets/img/Smiling guy.png" class="hero__image" alt="" />
        <h2 class="hero__title">Bet.Play.Win.</h2>
        <div class="hero__description">
          Play and win from collection of childhood games that live up to the
          moment
        </div>
        <div class="hero__buttons mt-5">
          <button class="hero__button mr-4">
            <span>Google Play</span>
          </button>
          <button class="hero__button">
            <span>iOS Store</span>
          </button>
        </div>
      </div>
    </div>
  );
}
