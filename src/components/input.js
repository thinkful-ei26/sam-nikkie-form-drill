import React from 'react';

export default class Input extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('in comp did update')
      console.log(prevProps);
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
            console.log('in the if statement');
        }
    }
    render() {
        const Element = this.props.element || 'input';

        let error;
        if (this.props.meta.touched && this.props.meta.error) {
            error = <div className="form-error">{this.props.meta.error}</div>;
        }

        let warning;
        if (this.props.meta.touched && this.props.meta.warning) {
            warning = (
                <div className="form-warning">{this.props.meta.warning}</div>
            );
        }

        console.log('here');

        return (
            <div className="form-input">
                <label htmlFor={this.props.input.name}>
                    {this.props.label}
                    {error}
                    {warning}
                </label>
                <Element
                    {...this.props.input}
                    id={this.props.input.name}
                    type={this.props.type}
                    ref={input => (this.input = input)}
                >
                {this.props.children}
                </Element>
                
            </div>
        );
    }
}