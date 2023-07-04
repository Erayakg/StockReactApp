import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

export default function LoginPage() {
  const [justifyActive, setJustifyActive] = useState('tab1');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (justifyActive === 'tab1') {
      const user = {
        userName: username,
        password: password,
      };

      axios.post('user/authenticate', user)
        .then(res => {
            const token = res.data;
            console.log(token)
            localStorage.setItem('jwt', token);
            window.location.href = "/";
          }
         
        
        );
    } else {
      const user = {
        name: name,
        surname: surname,
        email: email,
        password: password,
        role: role,
      };

      axios.post('user/add', user)
        .then(res => console.log(res.data));
    }

    setEmail('');
    setPassword('');
    setName('');
    setSurname('');
    setRole('');
    setUsername('');
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <form onSubmit={handleSubmit}>
        <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>
        
        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === 'tab1'}>
            <MDBInput
              wrapperClass='mb-4'
              label='Username'
              id='form1'
              type='text'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Password'
              id='form2'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <MDBBtn type="submit" className="mb-4 w-100">Sign in</MDBBtn>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === 'tab2'}>
            <MDBInput
              wrapperClass='mb-4'
              label='Name'
              id='form3'
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Surname'
              id='form4'
              type='text'
              value={surname}
              onChange={e => setSurname(e.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Email'
              id='form5'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Password'
              id='form6'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Role'
              id='form7'
              type='text'
              value={role}
              onChange={e => setRole(e.target.value)}
            />
            <MDBBtn type="submit" className="mb-4 w-100">Sign up</MDBBtn>
          </MDBTabsPane>
        </MDBTabsContent>
      </form>
    </MDBContainer>
  );
}
