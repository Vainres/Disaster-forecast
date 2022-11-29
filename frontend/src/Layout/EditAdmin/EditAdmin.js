import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Input from '~/components/Input';
import styles from './Info.module.scss';
import { useState, useEffect } from 'react';
import request from '~/utils/request';
const cx = classNames.bind(styles);

function EditAdmin({ close, savedone = () => {}, defaultStatus = () => {}, status }) {
    const [dataedit, setdataedit] = useState({ id: '', name: '', email: '' });

    let id_edit = localStorage.getItem('id_edit');
    const handleclickupdate = () => {
        request
            .post(`admin/updateif?id=${dataedit.id}&name=${dataedit.name}&email=${dataedit.email}`)
            .then((res) => {
                savedone();
            })
            .catch((e) => {
                console.log(e);
            });
    };
    useEffect(() => {
        defaultStatus();

        request
            .get(`/admin/getuserif?id=${id_edit}`)
            .then((res) => {
                if (res.data.code === '200') {
                    setdataedit(res.data.data);
                } else {
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);
    return (
        <div className={cx('modal')}>
            <a className={cx('close')} onClick={close}>
                &times;
            </a>
            <div className={cx('header')}> Chỉnh Sửa Thông Tin </div>
            <div className={cx('cxcontent')}>
                <div className={cx('wapper')}>
                    {/* <h2 className={cx('title')}>Thêm Quản Trị</h2> */}
                    <Input
                        name="name"
                        title="Name"
                        forpopup
                        onChange={(e) => setdataedit((pre) => ({ ...pre, name: e.target.value }))}
                    >
                        {dataedit.name}
                    </Input>
                    <Input
                        name="email"
                        title="Email"
                        forpopup
                        onChange={(e) => setdataedit((pre) => ({ ...pre, email: e.target.value }))}
                    >
                        {dataedit.email}
                    </Input>
                    <div className={cx('colum2')}>
                        <div className={cx('insertcolumn')}></div>
                        <Button success small onClick={handleclickupdate}>
                            {status}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditAdmin;
