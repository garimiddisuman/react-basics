const { Component, createElement } = React;
const { createRoot } = ReactDOM;

class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.items.map((item, index) =>
      createElement("li", { key: index }, item)
    );

    return createElement("ul", null, items);
  }
}

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", items: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState((pre) => ({ ...pre, value: event.target.value }));
  }

  handleSubmit() {
    if (!this.state.value) return;

    this.setState((prev) => ({
      items: [...prev.items, this.state.value],
      value: "",
    }));
  }

  render() {
    const input = createElement("input", {
      value: this.state.value,
      onChange: this.handleChange,
      placeholder: "enter item",
      type: "text",
    });

    const submitBtn = createElement(
      "button",
      { onClick: this.handleSubmit },
      "Add"
    );

    return createElement(
      "div",
      null,
      input,
      submitBtn,
      createElement(List, { items: this.state.items })
    );
  }
}

const container = document.getElementById("main-root");
const root = createRoot(container);
root.render(createElement(Todo));
