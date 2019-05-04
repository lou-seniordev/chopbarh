import React, { Component } from "react";

export default class TopEarners extends Component {
  state = {
    RESULTS: [
      {
        PlayerID: "5c5487ea4e33cf04e1b5bd18",
        Email: "",
        CBCoins: 9626600,
        DeviceID: "",
        SEX: "M",
        RealCoins: 481240,
        NickName: "JJS",
        LastTimeStamp: 0,
        PhoneNum: "12341111",
        DOB: "02/02/2019",
        FullName: "tester1111",
        ImageID: "3c23519b00b5440b89335782e85c8113",
        TotalWinning: 496200
      },
      {
        PlayerID: "5c7f26612b626b04ebef0c4a",
        Email: "",
        CBCoins: 9606200,
        DeviceID: "",
        SEX: "M",
        RealCoins: 202680,
        NickName: "KHR",
        LastTimeStamp: 0,
        PhoneNum: "12349999",
        DOB: "06/03/2019",
        FullName: "Tester9",
        ImageID: "1fd6630e57ea4f6dba374c4465557da9",
        TotalWinning: 192680
      },
      {
        PlayerID: "5c7bce89adbdf904dadcae54",
        Email: "",
        CBCoins: 9584200,
        DeviceID: "",
        SEX: "M",
        RealCoins: 175160,
        NickName: "LKJ",
        LastTimeStamp: 0,
        PhoneNum: "12343333",
        DOB: "03/03/2019",
        FullName: "Tester3",
        ImageID: "6f93b4387b764ea08b41ceda07c1968b",
        TotalWinning: 166860
      }
    ]
  };

  render() {
    return (
      <table className="table table-striped">
        <thead style={{ background: "#8C1936", color: "#fff" }}>
          <tr>
            <th scope="col">Top Earners</th>
            <th scope="col" />
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ade Kola</td>
            <td>Lagos</td>
            <td>&#8358;70,000</td>
          </tr>
          <tr>
            <td>Joe Fesobi</td>
            <td>Benin</td>
            <td>&#8358;50,000</td>
          </tr>
          <tr>
            <td>Adewale Jacob</td>
            <td>Ibadan</td>
            <td>&#8358;60,000</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
