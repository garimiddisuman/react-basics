const { Component, createElement } = React;
const { createRoot } = ReactDOM;

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { count: 1, isChecked: false };
  }

  handleChange() {
    if (this.state.count === 3) {
      return this.setState({ count: 0, isChecked: true });
    }

    return this.setState((prev) => ({
      isChecked: false,
      count: prev.count + 1,
    }));
  }

  render() {
    const checkbox = createElement("input", {
      type: "checkbox",
      id: "check",
      checked: this.state.isChecked,
      onChange: this.handleChange,
    });

    const label = createElement(
      "label",
      {
        htmlFor: "check",
      },
      "check"
    );

    return createElement("div", null, checkbox, label);
  }
}

const container = document.getElementById("main-root");
const root = createRoot(container);
root.render(createElement(CheckBox));
