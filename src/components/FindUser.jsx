import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Navbar, Form, Button, Card, ListGroup, Modal, ListGroupItem } from 'react-bootstrap'
import { FaUser, FaServer } from 'react-icons/fa';

function FindUser() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [reposUrl, setReposUrl] = useState('');
  const [starredUrl, setStarredUrl] = useState('');
  const [nameRepo, setNameRepo] = useState([]);
  const [nameStarred, setNameStarred] = useState([]);

  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  useEffect(() => {
    axios.get("https://api.github.com/users/example")
      .then(res => {
        const user = res.data;
        setData(user)
      })
  }, []);

  const setData = ({ name, login, followers, following, public_repos, avatar_url, repos_url, starred_url }) => {
    setName(name)
    setUserName(login)
    setFollowers(followers)
    setFollowing(following)
    setRepos(public_repos)
    setAvatar(avatar_url)
    setReposUrl(repos_url)
    setStarredUrl(starred_url)
  }

  const setRepo = (repo) => {
    setNameRepo(repo)
  }

  const setStarred = (starred) => {
    setNameStarred(starred)
  }

  const handleSearch = (e) => {
    setUserInput(e.target.value)
  }

  const handleSubmit = () => {
    window.event.preventDefault()
    axios.get(`https://api.github.com/users/${userInput}`)
      .then(res => {
          const user = res.data;
          setData(user)
      })
      .catch(err => {
        window.alert("Usuário não encontrado");
      })
  }


  const getRepos = () => {
    window.event.preventDefault()
    axios.get(reposUrl)
      .then(res => {
        const repo = res.data;
        setRepo(repo)
      })
  }
  const getStarred = () => {
    window.event.preventDefault()
    axios.get(starredUrl.replace("{/owner}{/repo}", ''))
      .then(res => {
        const starred = res.data;
        setStarred(starred)
      })
  }

  return (
    <div >
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt="logo"
            src="https://logodownload.org/wp-content/uploads/2019/08/github-logo-icon-0.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
      Git Finder
    </Navbar.Brand>
      </Navbar>
      <Form onSubmit={handleSubmit} className="form-inline d-flex  justify-content-center mt-4" >
        <Form.Group >
          <Form.Control size="lg" onChange={handleSearch} type="text" className="mx-4" placeholder="Digite o nome do usuário..." style={{ width: "370px" }} />
          <Button className="ms-4" variant="primary" type="submit" onClick={handleSubmit}>
            Procurar
      </Button>
        </Form.Group>
      </Form>
        <Card style={{ width: '18rem', margin: '0 auto', marginTop: '2rem' }}>
          <Card.Img variant="top" src={avatar} />
          <Card.Body >
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle>{userName}</Card.Subtitle>
            <ListGroup variant="flush">
              <ListGroup.Item><FaUser /> {followers} seguidores</ListGroup.Item>
              <ListGroup.Item><FaUser /> {following} seguindo</ListGroup.Item>
              <ListGroup.Item><FaServer /> {repos} repositórios</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button className="mx-4" onClick={() => { setSmShow(true); getRepos(); }}>Repos</Button>
              <Button onClick={() => { setLgShow(true); getStarred(); }}>Starred</Button>
              <Modal
                size="lg"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-sm">
                    Repos
              </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ListGroup>
                    {nameRepo.map(item => <ListGroupItem key={item.id}>Repo: {item.name}</ListGroupItem>)}
                  </ListGroup>
                </Modal.Body>
              </Modal>
              <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">
                    Starred
              </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ListGroup>
                    {nameStarred.map(item => <ListGroupItem key={item.id}>Starred: {item.name}</ListGroupItem>)}
                  </ListGroup>
                </Modal.Body>
              </Modal>
            </Card.Body>
          </Card.Body>
        </Card>
    </div>
  )
}

export default FindUser;