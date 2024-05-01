import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Что-то пошло не так.</h1>
          <p>Пожалуйста, перезагрузить страницу</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;