import React, { Component, memo } from "react";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import { fetchTopEarners } from "../../../../store/actions/TopEarnersActions";

class TopEarners extends Component {
  // constructor(props) {
  //   super(props);

  //   let eventSource = new EventSource(
  //     `https://Y376891fcBvk.live.gamesparks.net/rs/debug/lz53ZTZDy60nxL9nXbJDvnYzSN8YYCJN/LogEventRequest`
  //   );
  // }

  componentDidMount = () => {
    // if (!this.props.results) {
    //   this.props.fetchTopEarners();
    // }
    window.pageScroll();
  };

  render() {
    return (
      <div>
        {/* <div className="table responsive text-center">
          <table className="table table-striped">
            <thead
              style={{
                background: "#8C1936",
                color: "#fff"
              }}
            >
              <tr>
                <th scope="col">Top Earners</th>
                <th scope="col">Game</th>
                <th scope="col">Time</th>
                <th scope="col">Winning</th>
              </tr>
            </thead>
          </table>
        </div> */}
        <div className="table responsive text-center">
          <table className="table table-striped">
            <thead
              style={{
                background: "#8C1936",
                color: "#fff",
                display: "table",
                width: "100%",
                tableLayout: "fixed"
              }}
            >
              <tr>
                <th scope="col">Top Earners</th>
                <th scope="col">Game</th>
                <th scope="col">Time</th>
                <th scope="col">Winning</th>
              </tr>
            </thead>

            <tbody
              style={{
                height: "180px",
                display: "block",
                overflowY: "scroll"
              }}
              id="contain"
            >
              <tr
                style={{
                  display: "table",
                  width: "100%",
                  tableLayout: "fixed"
                }}
              >
                <td>Some Value</td>
                <td>Some Value</td>
                <td>Some Value</td>
                <td>&#8358; 200</td>
              </tr>
              <tr
                style={{
                  display: "table",
                  width: "100%",
                  tableLayout: "fixed"
                }}
              >
                <td>Some Value</td>
                <td>Some Value</td>
                <td>Some Value</td>
                <td>&#8358; 200</td>
              </tr>
              <tr
                style={{
                  display: "table",
                  width: "100%",
                  tableLayout: "fixed"
                }}
              >
                <td>Some Value</td>
                <td>Some Value</td>
                <td>Some Value</td>
                <td>&#8358; 200</td>
              </tr>
              <tr
                style={{
                  display: "table",
                  width: "100%",
                  tableLayout: "fixed"
                }}
              >
                <td>Some Value</td>
                <td>Some Value</td>
                <td>Some Value</td>
                <td>&#8358; 200</td>
              </tr>
              <tr
                style={{
                  display: "table",
                  width: "100%",
                  tableLayout: "fixed"
                }}
              >
                <td>Some Value</td>
                <td>Some Value</td>
                <td>Some Value</td>
                <td>&#8358; 200</td>
              </tr>
              <tr
                style={{
                  display: "table",
                  width: "100%",
                  tableLayout: "fixed"
                }}
              >
                <td>Some Value</td>
                <td>Some Value</td>
                <td>Some Value</td>
                <td>&#8358; 200</td>
              </tr>
              <tr
                style={{
                  display: "table",
                  width: "100%",
                  tableLayout: "fixed"
                }}
              >
                <td>Some Value</td>
                <td>Some Value</td>
                <td>Some Value</td>
                <td>&#8358; 200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.topEarners.loading,
  results: state.topEarners.results,
  error: state.topEarners.error
});

const mapDispatchToProps = {
  fetchTopEarners
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TopEarners));

/* <div>
        {this.props.results ? (
          <div className="table responsive">
            <table className="table table-striped">
              <thead
                style={{
                  background: "#8C1936",
                  color: "#fff"
                }}
              >
                <tr>
                  <th scope="col">Top Earners</th>
                  <th scope="col">Game</th>
                  <th scope="col">Time</th>
                  <th scope="col">Winning</th>
                </tr>
              </thead>
              <tbody>
                {this.props.results.slice(0, 4).map(player => (
                  <tr key={player.PlayerID}>
                    <td>{player.FullName}</td>
                    <td>{player.Game}</td>
                    <td>{player.Time}</td>
                    <td>
                      &#8358;
                      {new Intl.NumberFormat().format(player.TotalWinning)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            {!this.props.error ? (
              <div className="text-center mt-2">
                <Spinner />
              </div>
            ) : (
              <div className="text-center mt-2">
                <p>Data not Available</p>
              </div>
            )}
          </>
        )}
      </div> */
