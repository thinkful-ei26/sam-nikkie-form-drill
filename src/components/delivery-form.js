import React from 'react';
import './delivery-form.css'
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import {required, nonEmpty, five, num, sure} from '../validators';
import Input from './input';
import { fetchDelivery } from '../actions';


export class DeliveryForm extends React.Component{
  onSubmit(values) {
    this.props.dispatch(fetchDelivery(values)); 
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
            element = "select"
            >
            {/* <option value="foo" selected disabled> Select an option</option> */}
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
//   initialValues: {issue: "foo"},
  onSubmitFail: (errors, dispatch) =>
      dispatch(focus('delivery-form', Object.keys(errors)[0]))
})(DeliveryForm);

//Question: using disabled with redux - use initial values. Then it doesn't work when we pass through a value for it. And without it it automatically chooses the first option, and it doesnt read that either unless the user clicks it bc it hasnt been triggered as changing if its not in focus. We want to validate select so if its a blank value (like select a value), then it doesnt ever get sent to the server