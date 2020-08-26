import React from 'react';

export function withErrorHandler(Component) {
  class WithErrorHandler extends React.Component {
    constructor() {
      super();

      this.state = {
        hasError: false,
      };
    }

    componentDidCatch(error, info) {
      console.error('error: ', error);
      console.error('errorInfo: ', info);

      this.setState({
        hasError: true,
      });
    }

    render() {
      const {
        hasError,
      } = this.state;

      if (hasError) {
        return null;
      }

      return <Component {...this.props} />;
    }
  }

  return WithErrorHandler;
}

export default withErrorHandler;
