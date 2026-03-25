"use client";

import React, { Component, ReactNode } from "react";
import { logError } from "@/lib/logger";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    logError("React ErrorBoundary caught an error", error, {
      componentStack: info.componentStack ?? "",
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <h2 className="error-boundary-title">Щось пішло не так</h2>
            <p className="error-boundary-message">
              {this.state.error?.message ?? "Невідома помилка компонента"}
            </p>
            <button className="error-boundary-btn" onClick={this.handleReset}>
              Спробувати знову
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
