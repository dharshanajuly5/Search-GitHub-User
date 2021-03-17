import logo from './logo.png';
import './App.css';
import {  Form, Card,Icon, Image } from 'semantic-ui-react'
import React, {useState ,useEffect} from 'react';

function App() {
   const [name, setName] = useState(" ");
   const [login, setlogin] = useState(" ");
   const [company, setcompany] = useState(" ");
   const [followers, setfollowers] = useState(" ");
   const [Userinput, setUserinput] = useState(" ");
   const [errormsg, seterrormsg] = useState(null);
   const [avatar, setavatar] = useState(" ");

  useEffect(() => {
  fetch("https://api.github.com/users/example")
  .then(res => res.json())
  .then(data => {
    setData(data);
  })
}, [])

  const setData = ({name, login, company, followers, avatar_url}) =>
  {
    setName(name);
    setlogin(login);
    setcompany(company);
    setfollowers(followers);
    setavatar(avatar_url);
  }

  const handleSearch = (e) =>{
   setUserinput(e.target.value);
  }
 
  const displayuser = () =>
  {
    fetch(`https://api.github.com/users/${Userinput}`)
    .then(res => res.json())
    .then(data => {
      if(data.message)
      {
        seterrormsg(data.message);
      }
      else {
      setData(data);
      seterrormsg(null);
      }
    })
  }
  return (
    <div>
    <nav class="navbar navbar-light bg-light">
  <a class="navbar-brand" href="#">
    <img src={logo} width="30" height="30" class="d-inline-block align-top" alt=""/>
    Github Search
  </a>
  </nav>
  <div className ="search">
  <Form onSubmit={displayuser}>
          <Form.Group>
            <Form.Input
              placeholder='Search Github User'
              name='githubuser'
              onChange={handleSearch}
            />
            <Form.Button content='Search' />
          </Form.Group>
  </Form>
  </div>

  <div className="c1">
    {errormsg ? (<h1>{errormsg}</h1>) : (
      <Card>
      <Image src={avatar} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span className='date'>{login}</span>
        </Card.Meta>
        <Card.Description>
          {company}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='user' />
          {followers}
        </a>
      </Card.Content>
    </Card>
    )}
  
  </div>
   </div>
  );
}

export default App;
