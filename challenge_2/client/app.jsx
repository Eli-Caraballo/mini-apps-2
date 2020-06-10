import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {
        lables: [],
        datasets: []
      },
      date: ''
    }
  }

  componentDidMount() {
    axios.get('/bit')
      .then((info) => {
          this.setState({
            chartData: {
              labels: Object.keys(info.data.bpi),
              datasets: [
                {
                  label: 'BITCOIN',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderColor: 'rgba(0,0,0,1)',
                  borderWidth: 2.5,
                  data: Object.values(info.data.bpi)
                }
              ]
            },
            date: info.data.time.updated
        });
      });
  }

  render() {
    return(
      <div>
        <h1>BITCOIN IN US DOLLARS - Updated On: {this.state.date}</h1>
        <Line data={this.state.chartData} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

