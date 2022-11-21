const validation = (values) => {
    let errors = {};

    if (!values.email) {
        errors.eamil = 'Bắt buộc nhập trường này !';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Trường này phải nhập email';
    }

    if (!values.password) {
        errors.fullname = 'Bắt buộc nhập trường này !';
    } else if (values.password.length < 5) {
        errors.password = 'Trường này phải >5 ký tự';
    }

    return errors;
};

export default validation;
