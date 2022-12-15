import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Input from '~/components/Input';
import TableDrag from '~/components/TableDrag/TableDrag';
import MutiButtonAd from '~/components/MutiButtonAd/MutiButtonAd';
import styles from './Info.module.scss';
import Popup from 'reactjs-popup';
import Request from '~/utils/requests';
import AddDisaster from '~/Layout/AddDisaster/AddDisaster';
import { useEffect } from 'react';
import { useState } from 'react';
import ThreeBtn from '~/components/ThreeBtn/ThreeBtn';
import AddDisasterTime from '~/Layout/AddDisasterTime/AddDisasterTime';
const cx = classNames.bind(styles);

function DisasterList(props) {
    const datacol = [
        { field: 'id', rowDrag: true },
        {
            field: 'name',
            cellClassRules: { table__body: 'value !== undefined' },
            rowDrag: true,
            suppressColumnsToolPanel: true,
        },
        { field: 'level', hide: true },
        { field: 'StartPoint', hide: true },
        { field: 'EndPoint', hide: true },
        { field: 'type', hide: true },
        { field: 'startTime', hide: true },
        { field: 'endTime', hide: true },
        { field: 'Actions', cellRenderer: ThreeBtn },
    ];
    const [datarow, setDatarow] = useState([]);
    const request = new Request();
    useEffect(() => {
        request.Get('/admin/storm', [], (res) => {
            console.log(res.data);
            setDatarow(res.data.data);
        });
    }, []);
    return (
        <div className={cx('wapper')}>
            <h2 className={cx('title')}>Danh sách thiên tai</h2>
            <div className={cx('colum2')}>
                <div className={cx('insertcolumn')}></div>
                <Button
                    success
                    onClick={() => {
                        document.getElementById('showpopup_adddisaster').click();
                    }}
                >
                    Add
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
                    trigger={<button className={cx('hidden')} id="showpopup_adddisaster"></button>}
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
                    trigger={<button className={cx('hidden')} id="showpopup_addchill"></button>}
                    position="right center"
                >
                    {(close) => (
                        <div>
                            <div className={cx('curtain')}></div>
                            <AddDisasterTime close={close} />
                        </div>
                    )}
                </Popup>
            </div>
            <TableDrag datacol={datacol} datarow={datarow} />
        </div>
    );
}

export default DisasterList;
