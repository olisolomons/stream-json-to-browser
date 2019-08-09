$(document).ready(() => {
    let ws = new WebSocket(`ws://${location.host}/api/json-data`);

    let wrapper = $('#wrapper');

    let wrapper_id = 0;

    ws.onmessage = (msg) => {
        wrapper_id++;
        let data = JSON.parse(msg.data);

        let time = new Date(data.metadata.time);
        let timeStr = time.toLocaleDateString();
        timeStr += ` ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`

        let short = {
            Time: timeStr,
            Counter: data.counter,
            Payload: data.payload_raw
        };
        let elem = $(
            `<div></div>`
        );
        let table = $(`<table></table>`);
        elem.append(table);

        let headers = $(`<tr></tr>`);
        let table_body = $(`<tr></tr>`);
        table.append(headers);
        table.append(table_body);

        for(let header in short){
            headers.append($(`<td>${header}</td>`));
            table_body.append($(`<td>${short[header]}</td>`));
        }

        wrapper.append(elem);

        table.expanded = false;

        table.click(()=>{
            console.log(table.expanded);
            if(table.expanded){
                table.row.remove();
            }else{
                table.row = $('<tr></tr>');
                let wrapper = $('<td colspan="3"></td>');

                table.row.append(wrapper);
                table.append(table.row);

                jsonTree.create(data, wrapper[0]);

                wrapper.click(e=>{
                    e.stopPropagation();
                });
            }
            table.expanded = !table.expanded;
        });
    };

});
