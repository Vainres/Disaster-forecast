import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Input from '~/components/Input';
import TableDrag from '~/components/TableDrag/TableDrag';
import MutiButtonAd from '~/components/MutiButtonAd/MutiButtonAd';
import styles from './Info.module.scss';
import Popup from 'reactjs-popup';
import AddDisaster from '~/Layout/AddDisaster/AddDisaster';
const cx = classNames.bind(styles);

function DisasterList(props) {
    const datacol = [
        { field: 'id', rowDrag: true },
        {
            field: 'Name',
            cellClassRules: { table__body: 'value !== undefined' },
            rowDrag: true,
            suppressColumnsToolPanel: true,
        },
        { field: 'Level' },
        { field: 'Type', hide: true },
        { field: 'StartTime', hide: true },
        { field: 'EndTime', hide: true },
        { field: 'Actions', cellRenderer: MutiButtonAd },
    ];
    const datarow = [
        {
            id: '1',
            Name: 'Toyota',
            Level: 'Celica',
            Type: 35000,
            Descript: 'abc',
            StartTime: '19/10/2022',
            EndTime: '26/10/2022',
        },
        {
            id: '2',
            Name: 'Toyota',
            Level: 'Celica',
            Type: 35000,
            Descript: 'abc',
            StartTime: '19/10/2022',
            EndTime: '26/10/2022',
        },
        {
            id: '3',
            Name: 'Toyota',
            Level: 'Celica',
            Type: 35000,
            Descript: 'abc',
            StartTime: '19/10/2022',
            EndTime: '26/10/2022',
        },
        {
            id: '4',
            Name: 'Toyota',
            Level: 'Celica',
            Type: 35000,
            Descript: 'abc',
            StartTime: '19/10/2022',
            EndTime: '26/10/2022',
        },
        {
            id: '5',
            Name: 'Toyota',
            Level: 'Celica',
            Type: 35000,
            Descript: 'abc',
            StartTime: '19/10/2022',
            EndTime: '26/10/2022',
        },
        {
            id: '6',
            Name: 'Toyota',
            Level: 'Celica',
            Type: 35000,
            Descript: 'abc',
            StartTime: '19/10/2022',
            EndTime: '26/10/2022',
        },
        {
            id: '7',
            Name: 'Toyota',
            Level: 'Celica',
            Type: 35000,
            Descript: 'abc',
            StartTime: '19/10/2022',
            EndTime: '26/10/2022',
        },
        {
            id: '8',
            Name: 'Toyota',
            Level: 'Celica',
            Type: 35000,
            Descript: 'abc',
            StartTime: '19/10/2022',
            EndTime: '26/10/2022',
        },
        {
            id: '9',
            Name: 'Toyota',
            Level: 'Celica',
            Type: 35000,
            Descript: 'abc',
            StartTime: '19/10/2022',
            EndTime: '26/10/2022',
        },
        {
            id: '10',
            Name: 'Toyota',
            Level: 'Celica',
            Type: 35000,
            Descript: 'abc',
            StartTime: '19/10/2022',
            EndTime: '26/10/2022',
        },
        {
            id: '11',
            Name: 'Toyota',
            Level: 'Celica',
            Type: 35000,
            Descript: 'abc',
            StartTime: '19/10/2022',
            EndTime: '26/10/2022',
        },
    ];
    return (
        <div className={cx('wapper')}>
            <h2 className={cx('title')}>Danh sách thiên tai</h2>
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
                            <AddDisaster close={close} />
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
                            <AddDisaster close={close} />
                        </div>
                    )}
                </Popup>
            </div>
            <TableDrag datacol={datacol} datarow={datarow} />
        </div>
    );
}

export default DisasterList;
