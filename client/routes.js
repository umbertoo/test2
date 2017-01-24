import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotePage from './components/NotePage';
import NotesList from './components/NotesList';
import Page from './components/Page';

const routes = (
    <Route path="/" component={App} >
        <IndexRoute components={{notes_list:NotesList}}/>
        <Route path="login" components={{note_page:Page}}/>
        <Route path="note/:note_id" components={{notes_list:NotesList ,note_page:NotePage }}/>

        <Route path="label/:label_name" components={{notes_list:NotesList}}/>

        <Route path="label/:label_name/note/:note_id" components={{notes_list:NotesList,note_page:NotePage }}/>
    </Route>
);

export default routes;
