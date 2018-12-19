export const required = value => 
    (value ? undefined : 'Required');

export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

export const five = value =>
    value.length  ===  5 ? undefined : 'The value is be exactly 5 characters long';

export const num = value => !isNaN(value) ? undefined : 'Every character needs to be a number';
