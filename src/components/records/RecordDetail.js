import React from 'react'
import {Grid, Box, Typography, Card, CardHeader, Divider, CardContent} from '@mui/material'
//Global States
import { useSelectedRecord } from 'src/contexts/useSelectedRecord'
export const RecordDetail = () => {
    const {record, setRecord } = useSelectedRecord()
  return (
    <Grid>
        <Card>
            <CardHeader title='Expediente' titleTypographyProps={{ variant: 'h6' }} />
            <Divider />
            <CardContent>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <Box>
                    <Typography variant='h6'>Paciente</Typography>
                    <Typography variant='body1'>{record.patient}</Typography>
                </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Box>
                    <Typography variant='h6'>Fecha</Typography>
                    <Typography variant='body1'>{record.date}</Typography>
                </Box>
                </Grid>
            </Grid>
            </CardContent>
        </Card> 
    </Grid>
  )
}
