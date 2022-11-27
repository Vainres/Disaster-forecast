import request from '~/utils/request';

const validation = (values) => {
    let errors = {};
    function checkpass() {
        let headerdata = {
            token: localStorage.getItem('token'),
        };
        setTimeout(() => {
            request
                .get(`admin/changepassword/checkpass?password=${values.password}`, { headers: headerdata })
                .then((res) => {
                    console.log(res);
                    if (res.data.password) {
                    } else {
                        console.log('Mật khẩu sai, xin vui lòng kiểm tra lại.');
                        errors.password = 'Mật khẩu sai, xin vui lòng kiểm tra lại.';
                    }
                })
                .catch((err) => (errors.password = err));
        }, 500);
    }
    if (!values.password) {
        errors.password = 'Trường này bắt buộc phải nhập';
    } else if (values.password.length < 5) {
        errors.password = 'Trường này phải >5 kí tự';
    } else {
        checkpass();
    }

    if (values.newpassword === values.repassword) {
    } else {
        errors.repassword = 'Mật khẩu trường này phải giống mật khẩu phía trên';
    }
    if (!values.newpassword) {
        errors.newpassword = 'Trường này bắt buộc phải nhập';
    } else if (values.newpassword.length < 5) {
        errors.newpassword = 'Trường này phải >5 kí tự';
    }

    return errors;
};

export default validation;
