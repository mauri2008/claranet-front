import React from 'react'
import { Stack, Button, Typography } from '@mui/material'
import { api } from '../../services/axios';
import { removeAuthorizationToken, setAuthorizationToken } from '../../helpers/sessionItens';
 
interface IHeaderProps {
    authorization : boolean;
    setAuthorization: (value: boolean) => void;
    setSelectedViewInfoMovie: (value:'title')=>void;
}

export function  Header({authorization, setAuthorization, setSelectedViewInfoMovie} : IHeaderProps) {

    async function handleLoginOrLogout(){

        if(!authorization){
            const responseAuth = await api.post('auth',{email:'user.teste@gmail.com', password:'123456'});

            if(responseAuth.data){
                setAuthorizationToken(responseAuth.data.token)
                setAuthorization(true);
            }            

            return
        }

        setAuthorization(false);
        removeAuthorizationToken();
        setSelectedViewInfoMovie('title')
    }


    return (
     <Stack bgcolor='Highlight' px={2} py={3} direction='row' justifyContent='space-between'>
          <Typography variant='h5' color='white'>Movies Lists</Typography>
            <Button 
                variant='contained' 
                color={authorization?'error':'inherit'}
                onClick={handleLoginOrLogout}
            >

                {authorization?'Logout' : 'Login'}
            </Button>
          
      </Stack>
    )
}