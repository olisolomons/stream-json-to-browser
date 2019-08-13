$(document).ready(() => {
    let ws = new WebSocket(`ws://${location.host}/api/json-data`);

    let wrapper = $('#wrapper');

    let wrapper_id = 0;

    ws.onmessage = (msg) => {
        wrapper_id++;
        let data = JSON.parse(msg.data);

        let payload = base64toHEX(data.payload_raw);

        let short = {
            Time: formatDateTime(data.metadata.time),
            Counter: data.counter,
            Payload: payload
        };
        let elem = $(
            `<div></div>`
        );
        let table = $(`<table></table>`);
        elem.append(table);

        // let headers = $(`<tr></tr>`);
        let table_body = $(`<tr></tr>`);
        // table.append(headers);
        table.append(table_body);

        for (let header in short) {
            // headers.append($(`<td>${header}</td>`));
            table_body.append($(`<td>${short[header]}</td>`));
        }

        wrapper.append(elem);

        table.expanded = false;

        table.click(() => {
            if (table.expanded) {
                table.row.remove();
            } else {
                table.row = $('<tr></tr>');
                let wrapper = $('<td colspan="3"></td>');

                table.row.append(wrapper);
                table.append(table.row);

                jsonTree.create(data, wrapper[0]);

                wrapper.click(e => {
                    e.stopPropagation();
                });
            }
            table.expanded = !table.expanded;
        });
    };

});

function base64toHEX(base64) {
    var raw = atob(base64);

    var HEX = '';

    for (i = 0; i < raw.length; i++) {
        var _hex = raw.charCodeAt(i).toString(16)

        HEX += (_hex.length == 2 ? _hex : '0' + _hex);
    }
    return HEX.toUpperCase();
}




function formatDateTime(time) {
    const pad = x => (x + '').padStart(2, '0');
    time = new Date(time);
    let timeStr = time.toLocaleDateString();
    timeStr +=
        ` ${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`
    return timeStr;
}
