import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Input from '~/components/Input';
import TableDrag from '~/components/TableDrag/TableDrag';
import MutiButtonAd from '~/components/MutiButtonAd/MutiButtonAd';
import styles from './Info.module.scss';
import Popup from 'reactjs-popup';
import AddDisaster from '~/Layout/AddDisasterTime/AddDisasterTime';
import AddAdmin from '~/Layout/AddAdmin';
import EditAdmin from '~/Layout/EditAdmin/EditAdmin';
import { useState, useEffect } from 'react';
import Request from '~/utils/requests';
import Alertpopup from '~/Layout/Alertpopup/Alertpopup';
import AddNoti from '~/Layout/AddNoti';
const cx = classNames.bind(styles);

function ListNoti(props) {
    const [status, setstatus] = useState('Lưu');
    const datacol = [
        { field: 'id', rowDrag: true },
        {
            headerName: 'Tiêu Đề',
            field: 'title',
        },
        {
            headerName: 'Nội dung',
            field: 'content',
        },
        {
            headerName: 'Đã đọc',
            field: 'isread',
        },
        {
            headerName: 'Đã qua',
            field: 'ispass',
        },
        {
            headerName: 'Đã qua',
            field: 'ispass',
        },
        { field: 'Actions', cellRenderer: MutiButtonAd },
    ];
    let [datarow, setdatarow] = useState([]);
    const request = new Request();
    useEffect(() => {
        request.Get('/admin/noti', [], (res) => {
            if (res.status === 200) {
                setdatarow(res.data.data);
            } else {
            }
        });
    }, [status]);

    const savedone = () => {
        setstatus('Đã Lưu');
    };
    const defaultStatus = () => {
        setstatus('Lưu');
    };
    const [msgdel, setmsgdel] = useState({
        msg: 'Bạn có chắc chắn muốn xóa? Dữ liệu sẽ không được khôi phục khi đã xóa',
        deleted: false,
    });
    const DeleteDone = () => {
        setmsgdel({ msg: 'Đã xóa thành công', deleted: true });
    };
    const [dataedit, setdataedit] = useState({ id: '', name: '', email: '' });
    const ChildSetDataEdit = (data) => {
        setdataedit({ id: data.id, name: data.name, email: data.email });
    };
    const Delete = () => {
        const id_delete = localStorage.getItem('id_delete');
        request.Delete(`admin/deleteadmin?id=${id_delete}`, [], () => {});
        setstatus('Lưu ');

        DeleteDone();
    };
    const resettitledel = () => {
        document.getElementById('close').click();
        setstatus('Lưu ' + Math.round());
        setmsgdel({
            msg: 'Bạn có chắc chắn muốn xóa? Dữ liệu sẽ không được khôi phục khi đã xóa',
            deleted: false,
        });
    };
    const setstatusafteradd = (msg) => {
        setstatus('Lưu' + msg);
    };
    return (
        <div className={cx('wapper')}>
            <h2 className={cx('title')}>Quản Lý Thông Báo</h2>
            <div className={cx('colum2')}>
                <div className={cx('insertcolumn')}></div>
                <Button
                    success
                    small
                    onClick={() => {
                        document.getElementById('showpopup_importexcel').click();
                    }}
                >
                    Thêm
                </Button>
                <Popup
                    className={cx('popupcontain')}
                    modal
                    trigger={<button className={cx('hidden')} id="showpopup_edit"></button>}
                    position="right center"
                >
                    {(close) => (
                        <div>
                            <div className={cx('curtain')}></div>
                            <EditAdmin
                                data={dataedit}
                                close={close}
                                savedone={savedone}
                                status={status}
                                defaultStatus={defaultStatus}
                            />
                        </div>
                    )}
                </Popup>
                <Popup
                    className={cx('popupcontain')}
                    modal
                    trigger={<button className={cx('hidden')} id="showpopup_importexcel"></button>}
                    position="right center"
                >
                    {(close) => (
                        <div>
                            <div className={cx('curtain')}></div>
                            <AddNoti close={close} funsub={setstatusafteradd} />
                        </div>
                    )}
                </Popup>
                <Popup
                    className={cx('popupcontain')}
                    modal
                    trigger={<button className={cx('hidden')} id="showpopup_alert"></button>}
                    position="right center"
                >
                    {(close) => (
                        <div>
                            {/* <div className={cx('curtain')}></div>
                            <AddAdmin close={close} /> */}
                            <Alertpopup close={close} FunDel={Delete} FunDelDone={resettitledel} message={msgdel} />
                        </div>
                    )}
                </Popup>
            </div>
            <TableDrag datacol={datacol} datarow={datarow} />
        </div>
    );
}

export default ListNoti;
