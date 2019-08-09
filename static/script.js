let ws = new WebSocket(`ws://${location.host}/api/json-data`);

ws.onopen = ()=>{
}

let wrapper = $('#wrapper');

let wrapper_id=0;



ws.onmessage = (msg)=>{
    wrapper_id++;
    let data = JSON.parse(msg.data)
    let elem = $(`<div id="wrapper${wrapper_id}"><div id="tree"></div></div>`);
    wrapper.prepend(elem);

    let tree = jsonTree.create(data, elem[0]);
};
