import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardActions, CssBaseline, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    marginBottom: 20
  },
  cardContent: {
    padding: '24px'
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
  }, [])

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
              <Typography>{joke.joke}</Typography>
            </CardContent>
            <CardActions>
              <Button variant='contained' color='primary'>
                Like
              </Button>
              <Button variant='contained' color='default'>
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
