import { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { timesClicked: 0 };
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleClick() {
    this.setState((prev) => ({
      timesClicked: prev.timesClicked + this.props.step,
    }));
  }

  handleReset() {
    this.setState({ timesClicked: 0 });
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={this.handleClick}>
          Click {this.state.timesClicked} times
        </button>
        <button type="submit" onClick={this.handleReset}>
          Reset
        </button>
      </div>
    );
  }
}

class Counters extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Counter step={1} />
        <Counter step={2} />
      </div>
    );
  }
}

export default Counters;
