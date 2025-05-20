class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    const id = setInterval(() => {
      if (this.props.limit == this.state.count) clearInterval(id);
      this.setState((prev) => ({ count: prev.count + 1 }));
    }, 1000);
  }

  render() {
    if (this.props.limit == this.state.count) {
      return React.createElement("p", null, "Time UP !");
    }

    const counter = React.createElement(
      "p",
      null,
      `Time Left : ${this.state.count}`
    );

    return counter;
  }
}

const container = document.getElementById("main-root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(Timer, { limit: 3 }));
