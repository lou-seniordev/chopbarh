import React from "react";

export default function HowItWorks() {
  return (
    <div>
      <h3 className="how-it-works__shell-header mb-5">How it Works</h3>
      <div className="row mb-5">
        <div className="col-md-4 mb-2">
          <div className="works__content">
            <div className="works__content--container">
              <img src="assets/svg/Game.svg" className="mb-4" alt="" />
              <h4 className="text-uppercase">Choose your Game</h4>
              <p className="p--2">Choose your game you love</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-2">
          <div className="works__content">
            <div className="works__content--container">
              <img src="assets/svg/Bet away.svg" className="mb-3" alt="" />
              <h4 className="text-uppercase">Bet Away!</h4>
              <p className="p--2">Put in the amount you want to bet</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-2">
          <div className="works__content">
            <div className="works__content--container">
              <img
                src="assets/svg/Versus and win.svg"
                className="mb-4"
                alt=""
              />
              <h4 className="text-uppercase">Play and Win!</h4>
              <p className="p--2">Win as much as you can!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
