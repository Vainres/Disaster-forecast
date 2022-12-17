import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Input from '~/components/Input';
import styles from './Info.module.scss';
import React, { useState } from 'react';
const cx = classNames.bind(styles);

function EditoProfile({ props, values }) {
    const [contextbtn, setcontextbtn] = useState('Lưu');
    const [info, setinfo] = useState({ values });
    return (
        <div className={cx('wapper')}>
            <h2 className={cx('title')}>Chỉnh Sửa Thông Tin</h2>
            <Input name="name" title="Name" placeholder="Nguyễn Văn A">
                {info.name}
            </Input>
            <Input name="email" title="Email" placeholder="Nguyễn Văn A">
                {info.email}
            </Input>
            <Input small title="Password" type="password" placeholder="Passs1xy#"></Input>
            <div className={cx('colum2')}>
                <div className={cx('insertcolumn')}></div>
                <Button primary medium onClick={() => alert('click đã đã')}>
                    Lưu Thông Tin
                </Button>
            </div>
        </div>
    );
}

export default EditoProfile;
