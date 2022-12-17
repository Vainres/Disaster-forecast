import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Input from '~/components/Input';
import styles from './Info.module.scss';
import TableDrag from '~/components/TableDrag/TableDrag';

const cx = classNames.bind(styles);

function InfoProfile({ props, values }) {
    console.log('sss', values);

    return (
        <div className={cx('wapper')}>
            <h2 className={cx('title')}>Thông tin tài khoản</h2>
            <Input name="name" title="Name" placeholder="Nguyễn Văn A">
                {values.name}
            </Input>
            <Input name="email" title="Email" placeholder="Nguyễn Văn A">
                {values.email}
            </Input>
            <TableDrag></TableDrag>
            {/* <Input small title="Password" type="password" placeholder="Passs1xy#">
                12345678
            </Input> */}
            {/* <div className={cx('colum2')}>
                <div className={cx('insertcolumhrefn')}></div>
                <Button primary medium onClick={() => alert('click đã đã')}>
                    {contextbtn}
                </Button>
            </div> */}
        </div>
    );
}

export default InfoProfile;
