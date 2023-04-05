import { Container, Box, Stack, Button, ToggleButtonGroup, ToggleButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { Header } from './components/header'
import { api } from './services/axios';
import { Loading } from './components/loading';

interface Imovies {
  id: number;
  title?:string;
  description?:string;
}


function App() {
  const [ listMovies, setListMovies ] = useState <string[]>([])
  const [selectedViewInfoMovie, setSelectedViewInfoMovie] = useState <'title'|'description'>('title');
  const [authorization, setAuthorization] = useState(false);
  const [searchMovieId , setSearchMovieId] = useState('');
  const [error, setError] = useState(true)
  const [loading, setLoading] = useState(true);

  const movieWatchList = useMemo(()=>{
    return listMovies;
  },[listMovies, selectedViewInfoMovie]) 
  
  async function handleSearchMovieId () {
    
    if(searchMovieId !==''){
      setLoading(true);
      const responseSeachMovieId = await api.get(`movies/${searchMovieId}`);

      if(responseSeachMovieId?.data){
        setListMovies([responseSeachMovieId.data]);
        setError(false)
      }else{
        setError(true)
      } 
      
      setLoading(false)
      return
    }

    getListMovies()
  }

  async function getListMovies () {

    const responseGetListMovies = await api.get('movies')

    if(responseGetListMovies?.data){
      setListMovies(responseGetListMovies.data);
      setError(false)
    }else{
      setError(true)
    }
    setLoading(false)
  } 

  useEffect(()=>{
    getListMovies()
  },[authorization])


  return (
    <Container>

      <Header
          authorization={authorization}
          setAuthorization={setAuthorization}
          setSelectedViewInfoMovie={setSelectedViewInfoMovie}
      />

      {
        !loading ?

        <Box 
          p={2}           
          border={1} 
          borderColor='lightgrey'
        >
          <Stack 
            justifyContent='space-between' 
            direction='row' 
            py={4}
          >
            <ToggleButtonGroup
              exclusive
              aria-label='view information'
              size='small'
              color='info'
              value={selectedViewInfoMovie}
              onChange={(e:any) =>setSelectedViewInfoMovie(e.target.value)}
            >
              <ToggleButton value="title" >Title </ToggleButton>
              <ToggleButton value="description" disabled={!authorization} >Description </ToggleButton>
            </ToggleButtonGroup>
            <Stack spacing={1} direction='row' >
                <TextField 
                  type='number'
                  label="Buscar filme por ID"
                  size='small'
                  onChange={(e)=> setSearchMovieId(e.target.value)}
                  value={searchMovieId}
                />
                <Button variant='contained' onClick={handleSearchMovieId}>Buscar</Button>
            </Stack>
          </Stack>

          {
            !error ?
                <List>
                  {
                    movieWatchList.length > 0 &&
                      movieWatchList.map((movie: any)=>{
                        return (
                            <ListItem sx={{borderBottom:'1px solid lightgrey'}}>
                              <ListItemText>
                                {
                                  `${movie.id} -  ${movie[selectedViewInfoMovie]}`
                                }
                              </ListItemText>
                            </ListItem>
                        )
                      })
                  }
                </List> 
                :
                <Stack justifyContent='center' alignItems='center' px={2} py={5}>
                  <Typography variant='body1'>Ops! Nenhum filme foi encontrado tente novamente!</Typography>
                </Stack>
          }


        </Box> :
        (<Loading/>)
      }

    </Container>
  )
}

export default App
