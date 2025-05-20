class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timesClicked: 0 };
    this.inc = this.increment.bind(this);
    this.rst = this.reset.bind(this);
  }

  increment() {
    if (this.props.limit === this.state.timesClicked) {
      this.state.timesClicked = -1;
    }

    this.setState((prev) => ({ timesClicked: prev.timesClicked + 1 }));
  }

  reset() {
    this.setState({ timesClicked: 0 });
  }

  render() {
    const countBtn = React.createElement(
      "button",
      { onClick: this.inc },
      `Clicked ${this.state.timesClicked} times`
    );

    const resetBtn = React.createElement(
      "button",
      { onClick: this.rst },
      "Reset"
    );

    return React.createElement("div", null, countBtn, resetBtn);
  }
}

const container = document.getElementById("main-root");
const root = ReactDOM.createRoot(container);
root.render(
  React.createElement(
    "div",
    null,
    React.createElement(Counter, { limit: 5 }),
    React.createElement(Counter)
  )
);
