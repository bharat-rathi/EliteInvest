import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from '../api/axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Profile = () => {
    const { id } = useParams();
    const [entity, setEntity] = useState(null);

    useEffect(() => {
        const fetchEntity = async () => {
            try {
                const res = await axios.get(`/profile/${id}`);
                setEntity(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchEntity();
    }, [id]);

    if (!entity) return <Typography>Loading...</Typography>;

    const chartData = {
        labels: entity.Filings.map(f => f.date).reverse(),
        datasets: [
            {
                label: 'Transaction Volume',
                data: entity.Filings.map(f => f.volume).reverse(),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h3">{entity.name}</Typography>
            <Typography variant="subtitle1" color="textSecondary">{entity.type}</Typography>
            <Typography paragraph>{entity.description}</Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Activity Chart</Typography>
                            <Line data={chartData} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Recent Activity</Typography>
                            {entity.Filings.map(f => (
                                <Typography key={f.id} variant="body2" sx={{ mt: 1 }}>
                                    {f.date}: {f.transaction_type} {f.ticker} ({f.volume} shares)
                                </Typography>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;
