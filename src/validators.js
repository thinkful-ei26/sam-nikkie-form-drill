export const required = value => 
    (value ? undefined : 'Required');
export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';
export const five = value =>
    value.length  ===  5 ? undefined : 'The value is be exactly 5 characters long';

export const sure = value =>
    value.trim() !== '' ? undefined : 'Are you sure you don\'t want to Comment';

export const num = value => !isNaN(value) ? undefined : 'Every character needs to be a number';
    // let itsanumber = true;
    // for (let i = 0; i<value.length; i++ )   {
    //   console.log('THE VALUE:', typeof(value.charAt(i)));
    //     if(typeof(parseInt(value.charAt(i)))!== "number"){
    //       itsanumber=false;
    //     }
    // }
    // console.log('THE BOOL IS', itsanumber); 
    // return itsanumber ? undefined : "Every character needs to be a number" 

//Question: How do we deal with warnings?
