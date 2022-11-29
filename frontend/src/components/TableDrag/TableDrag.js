import classNames from 'classnames/bind';
import { AgGridColumn, AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import styles from './TableDrag.module.scss';
import { useMemo } from 'react';
const cx = classNames.bind(styles);
function TableDrag({ datacol = [], datarow = [] }) {
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 100,
            resizable: true,
            enableValue: true,
            enablePivot: true,
            sortable: true,
            filter: true,
        };
    }, []);
    const sideBar = useMemo(() => {
        return {
            toolPanels: [
                {
                    id: 'columns',
                    labelDefault: 'Columns',
                    labelKey: 'columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel',
                    toolPanelParams: {
                        suppressRowGroups: true,
                        suppressValues: true,
                        suppressPivots: true,
                        suppressPivotMode: true,
                        suppressColumnFilter: true,
                        suppressColumnSelectAll: true,
                        suppressColumnExpandAll: true,
                    },
                },
            ],
            defaultToolPanel: false,
        };
    }, []);
    return (
        <div className={cx('wrapper', 'ag-theme-alpine')}>
            <AgGridReact
                defaultColDef={defaultColDef}
                columnDefs={datacol}
                rowData={datarow}
                rowDragManaged={true}
                animateRows={true}
                sideBar={sideBar}
            ></AgGridReact>
        </div>
    );
}

export default TableDrag;
