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
		console.error("Error caught by error boundary:", error, info);
	}

	render() {
		if (this.state.hasError) {
			return <div>Что-то пошло не так. Пожалуйста, обновите страницу.</div>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
