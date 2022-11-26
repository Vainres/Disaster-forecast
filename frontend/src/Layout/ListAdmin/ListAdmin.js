import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Input from '~/components/Input';
import TableDrag from '~/components/TableDrag/TableDrag';
import MutiButtonAd from '~/components/MutiButtonAd/MutiButtonAd';
import styles from './Info.module.scss';
import Popup from 'reactjs-popup';
import AddDisaster from '~/Layout/AddDisaster/AddDisaster';
import AddAdmin from '~/Layout/AddAdmin';
const cx = classNames.bind(styles);

function ListAddmin(props) {
    const datacol = [
        { field: 'id', rowDrag: true },
        {
            field: 'Name',
        },
        { field: 'Actions', cellRenderer: MutiButtonAd },
    ];
    const datarow = [
        {
            id: '1',
            Name: 'Hiếu Nghĩa',
        },
        {
            id: '2',
            Name: 'Quang Minh',
        },
        {
            id: '3',
            Name: 'Thành Nhân',
        },
        {
            id: '4',
            Name: 'Toyota',
        },
        {
            id: '5',
            Name: 'Toyota',
        },
        {
            id: '6',
            Name: 'Toyota',
        },
        {
            id: '7',
            Name: 'Toyota',
        },
        {
            id: '8',
            Name: 'Toyota',
        },
        {
            id: '9',
            Name: 'Toyota',
        },
        {
            id: '10',
            Name: 'Toyota',
        },
        {
            id: '11',
            Name: 'Toyota',
        },
    ];
    return (
        <div className={cx('wapper')}>
            <h2 className={cx('title')}>Danh sách Người Quản Trị</h2>
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
                    trigger={<button id="showpopup_importexcel"></button>}
                    position="right center"
                >
                    {(close) => (
                        <div>
                            <div className={cx('curtain')}></div>
                            <AddAdmin close={close} />
                        </div>
                    )}
                </Popup>
            </div>
            <TableDrag datacol={datacol} datarow={datarow} />
        </div>
    );
}

export default ListAddmin;
