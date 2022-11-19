const validation = (values) => {
    let errors = {};

    if (!values.name) {
        errors.name = 'Trường này bắt buộc phải nhập';
    }

    if (!values.email) {
        errors.fullname = 'Trường này bắt buộc phải nhập';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Vui lòng nhập vào email đúng';
    }

    if (!values.password) {
        errors.fullname = 'Trường này bắt buộc phải nhập';
    } else if (values.password.length < 5) {
        errors.password = 'Trường này phải >5 kí tự';
    }

    if (values.password === values.repassword) {
    } else {
        errors.repassword = 'Mật khẩu trường này phải giống mật khẩu phía trên';
    }

    return errors;
};

export default validation;
