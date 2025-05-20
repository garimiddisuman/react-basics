const { Component, createElement } = React;
const { createRoot } = ReactDOM;

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    if (event.key === "Enter" && this.state.value) {
      this.props.addItem(event.target.value);
      this.state.value = "";
    }
  }

  render() {
    const inputTag = createElement("input", {
      type: "text",
      value: this.state.value,
      onChange: this.handleChange,
      onKeyDown: this.handleSubmit,
    });

    return inputTag;
  }
}

class TaskItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const taskItem = createElement(
      "span",
      {
        style: {
          textDecorationLine: this.props.done ? "line-through" : "none",
        },
      },
      this.props.task
    );

    const checkBox = createElement("input", {
      type: "checkbox",
      checked: this.props.done,
      onChange: () => this.props.toggle(this.props.taskId, !this.props.done),
    });

    const delBtn = createElement(
      "button",
      {
        onClick: () => this.props.deleteTask(this.props.taskId),
      },
      "Delete"
    );

    return createElement(
      "div",
      {
        style: {
          display: "flex",
          gap: "10px",
        },
      },
      checkBox,
      taskItem,
      delBtn
    );
  }
}

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.createTask = this.createTask.bind(this);
  }

  createTask(task, index) {
    const { toggle, deleteTask } = this.props;
    return createElement(TaskItem, { ...task, key: index, toggle, deleteTask });
  }

  render() {
    const items = createElement(
      "div",
      null,
      this.props.items.map(this.createTask)
    );

    return items;
  }
}

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], nextTaskId: 1 };
    this.toggle = this.toggle.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  orderByStatus(items) {
    const undone = items.filter((item) => !item.done);
    const done = items.filter((item) => item.done);
    return [...undone, ...done];
  }

  toggle(taskId, done) {
    this.setState((prev) => {
      const items = prev.items.map((item) =>
        item.taskId === taskId ? { ...item, done } : { ...item }
      );

      return { ...prev, items: this.orderByStatus(items) };
    });
  }

  addTask(task) {
    this.setState((prev) => {
      const newTask = { task, taskId: prev.nextTaskId, done: false };
      const items = [...prev.items, newTask];
      return {
        items: this.orderByStatus(items),
        nextTaskId: prev.nextTaskId + 1,
      };
    });
  }

  deleteTask(taskId) {
    console.log(taskId);

    this.setState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.taskId !== taskId),
    }));
  }

  render() {
    const items = createElement(Tasks, {
      items: this.state.items,
      toggle: this.toggle,
      deleteTask: this.deleteTask,
    });

    const input = createElement(Input, {
      addItem: this.addTask,
    });

    return createElement("div", null, input, items);
  }
}

const container = document.getElementById("main-root");
const root = createRoot(container);
root.render(createElement(Todo));
