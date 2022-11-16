const validation = (values) => {

    let errors  = {};

    if(!values.fullname){
        errors.fullname="required"
    }

    if(!values.email){
        errors.fullname="required"
    } else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="invalid"
    }

    if(!values.password){
        errors.fullname="required"
    } else if(values.password.length < 5){
        errors.password=">5 character"
    }

    return errors;
}

export default validation;