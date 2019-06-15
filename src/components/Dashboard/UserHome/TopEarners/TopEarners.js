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
    if (!this.props.results) {
      this.props.fetchTopEarners();
    }
  };

  render() {
    return (
      <>
        {this.props.results ? (
          <div className="card">
            <table className="table table-striped table-bordered">
              <thead
                style={{
                  background: "#8C1936",
                  color: "#fff"
                }}
              >
                <tr>
                  <th scope="col">Top Earners</th>
                  <th scope="col" />
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {this.props.results.slice(0, 4).map(player => (
                  <tr key={player.PlayerID}>
                    <td>{player.FullName}</td>
                    <td>{player.Email}</td>
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
      </>
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
