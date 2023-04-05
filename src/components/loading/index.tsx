import React from "react";
import {Stack, Typography } from "@mui/material";


export function Loading(){
   return (
    <Stack justifyContent='center' alignItems='center' py={20}>
        <Typography>Carregando ...</Typography>
    </Stack>
    )
}