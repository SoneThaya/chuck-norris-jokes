import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardActions, CssBaseline, Chip, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    marginBottom: 20
  },
  cardContent: {
    paddingBottom: 5
  },
  cardActions: {
    padding: 16
  }
})

function App() {
  const [jokes, setJokes] = useState([]);
  const [jokesToShow, setJokesToShow] = useState([])

  const classes = useStyles();

  useEffect(() => {
    fetch('https://api.icndb.com/jokes')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setJokes(res.value);
        setJokesToShow(res.value.slice(0, 10))
      })
      .catch((err) => console.log(err))
  }, []);

  const likeJoke = (id) => {
    console.log('liking joke ', id)
  }

  const unlikeJoke = (id) => {
    console.log('unliking joke ', id)
  }

  return (
    <div className="App">
      <CssBaseline />
      <Container>
        <Typography variant='h1' align='center'>
          Chuck Norris Jokes
        </Typography>
        {jokesToShow.map(joke => (
          <Card key={joke.id} className={classes.card}>
            <CardContent className={classes.cardContent}>
              {joke.categories.length > 0 ? (
                joke.categories.map(cat => (
                  <Chip label={cat} key={cat} variant="outlined" style={{marginTop: 10, marginBottom: 10}} />
                ))
              ) : <Chip label="regular" variant="outlined" style={{marginTop: 10, marginBottom: 10}} />}
              <Typography>{joke.joke}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button variant='contained' color='primary' onClick={() => likeJoke(joke.id)}>
                Like
              </Button>
              <Button variant='contained' color='default' onClick={() => unlikeJoke(joke.id)}>
                Unlike
              </Button>
            </CardActions>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default App;
