import React, {useMemo} from 'react';
import {format} from 'date-fns';

const SearchFilter = ({column}) => {
    const { setFilter } = column;
    return (
        <span>
            <input style={{width: "50%"}}
                   onChange={e => setFilter(e.target.value)}
            />
    </span>
    )
}

const SelectFilter = ({column}) => {
    const { preFilteredRows, setFilter, id } = column;
    const options = useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach(row => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    return (
        <span>
            <select style={{height: "22px", width: "50%"}}
                    onChange={e => setFilter(e.target.value)}>
                <option value="">전체 선택</option>
                {options.map(op => (
                    <option key={op} value={op}>{op}</option>
                ))}
            </select>
        </span>
    )
}

function dateBetweenFilter(rows, id, filterValues) {
    const sd = filterValues[0] ? new Date(filterValues[0]) : undefined;
    const ed = filterValues[1] ? new Date(filterValues[1]) : undefined;
    if (ed || sd) {
        return rows.filter((r) => {
            var dateAndHour = r.values[id].split("T");
            var [year, month, day] = dateAndHour[0].split("-");
            var date = [month, day, year].join("/");
            var hour = dateAndHour[1];
            var formattedData = date + " " + hour;
            console.log(formattedData)

            const cellDate = new Date(formattedData);

            if (ed && sd) {
                return cellDate >= sd && cellDate <= ed;
            } else if (sd) {
                return cellDate >= sd;
            } else {
                return cellDate <= ed;
            }
        });
    } else {
        return rows;
    }
}

function RangeFilter({column: { filterValue = [], preFilteredRows, setFilter, id }}) {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length
            ? new Date(preFilteredRows[0].values[id])
            : new Date(0);
        let max = preFilteredRows.length
            ? new Date(preFilteredRows[0].values[id])
            : new Date(0);

        preFilteredRows.forEach((row) => {
            const rowDate = new Date(row.values[id]);

            min = rowDate <= min ? rowDate : min;
            max = rowDate >= max ? rowDate : max;
        });

        return [min, max];
    }, [id, preFilteredRows]);

    return (
        <div>
            <input style={{width:"55%"}}
                onChange={(e) => {
                    const val = e.target.value;
                    setFilter((old = []) => [val ? val : undefined, old[1]]);
                }}
                type="date"
                value={filterValue[0] || ""}
            />
            {" to "}
            <input style={{width:"55%"}}
                onChange={(e) => {
                    const val = e.target.value;
                    setFilter((old = []) => [
                        old[0],
                        val ? val: undefined
                    ]);
                }}
                type="date"
                value={filterValue[1]?.slice(0, 10) || ""}
            />
        </div>
    );
}


export {SearchFilter, SelectFilter, RangeFilter, dateBetweenFilter}