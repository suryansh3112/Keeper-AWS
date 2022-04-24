import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';
import Amplify, { API } from 'aws-amplify';
import AddIcon from '@material-ui/icons/Add';

const myAPI = 'api88f98a89';
const path = '/user';

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);

  function getUser(text) {
    API.get(myAPI, path + '/' + text)
      .then((response) => {
        console.log(response);
        setUsers((prev) => [...prev, response]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />

      <div className='api-container'>
        <div className='flex1'>
          <input
            className='user-name-input'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter a name...'
          />
          <button className='api-btn' onClick={() => getUser(input)}>
            <AddIcon />
          </button>
        </div>
        {users?.length > 0 && (
          <div className='result-container flex1'>
            {users.map((user, idx) => {
              return (
                <div key={idx} className='result'>
                  <div>{user?.userName}</div>
                  <div>{user?.formattedName}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
