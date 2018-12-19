import React from 'react';
import './delivery-form.css'
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import {required, nonEmpty, five, num, sure} from '../validators';
import Input from './input';


export class DeliveryForm extends React.Component{
  onSubmit(values) {
    return fetch('https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
          console.log('in first then!');
            if (!res.ok) {
                if (
                    res.headers.has('content-type') &&
                    res.headers
                        .get('content-type')
                        .startsWith('application/json')
                ) {
                    // It's a nice JSON error returned by the server, so decode it
                    return res.json().then(err => Promise.reject(err));
                }
                // It's a less informative error returned by express
                return Promise.reject({
                    code: res.status,
                    message: res.statusText
                });
            }
            return;
        })
        .then(() => console.log('Submitted with values', values))
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
            return Promise.reject(
                new SubmissionError({
                    _error: 'Error submitting message'
                })
            );
        });
}

  render(){
    let successMessage;
    if (this.props.submitSucceeded) {
        successMessage = (
            <div className="message message-success">
                Message submitted successfully
            </div>
        );
    }

    let errorMessage;
    if (this.props.error) {
        errorMessage = (
            <div className="message message-error">{this.props.error}</div>
        );
    }

    return(
      
      <div>
        <h2>Report a problem with your delivery</h2>
        <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
            {successMessage}
            {errorMessage}
          <Field
            component={Input}
            label="Tracking Number:" 
            type="text" 
            name="trackingNumber" 
            id="trackingNumber"
            validate={[required, nonEmpty, five, num]}

            /> 
          
          <Field
            component={Input} 
            label = "Issue?"
            name="issue" 
            id="issue"
            // validate={[nonEmpty]}
            element = "select"
            >
            <option value="foo" selected disabled> Select an option</option>
            <option value="not-delivered">My delivery hasn't arrived</option>
            <option value="wrong-item">Wrong item</option>
            <option value ="missing-part">Missing</option>
          </Field>
          
          
          <Field 
            component={Input} 
            element="textarea"
            type="text" 
            name="details" 
            id="details"
            label='Comments'
            /> 
            
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'delivery-form',
  initialValues: {issue: "foo"},
  onSubmitFail: (errors, dispatch) =>
      dispatch(focus('delivery-form', Object.keys(errors)[0]))
})(DeliveryForm);

//Question: using disabled with redux - use initial values