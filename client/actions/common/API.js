import checkStatus from "./check_status_response";
const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
const Note = {};


Note.create = body =>
fetch('/api/notes/', {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
}).then(checkStatus).then(res=> res.json());

Note.update = (id, body) =>
fetch('/api/notes/' + id, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
}).then(checkStatus).then(res=> res.json());

Note.delete = id =>
fetch('/api/notes/' + id, {
    method: 'DELETE'
}).then(checkStatus).then(res=> res.json());

Note.fetchAll = () => fetch('/api/notes/').then(checkStatus).then(res=> res.json());
Note.fetchOne = id => fetch('/api/notes/'+id).then(checkStatus).then(res=> res.json());




const API = {Note};
export default API;
