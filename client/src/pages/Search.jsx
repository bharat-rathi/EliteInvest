import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Divider, Card, CardContent } from '@mui/material';
import axios from '../api/axios';

const Search = () => {
    const [results, setResults] = useState({ entities: [], filings: [] });
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        const fetchResults = async () => {
            if (query) {
                try {
                    const res = await axios.get(`/search?q=${query}`);
                    setResults(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        fetchResults();
    }, [query]);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Search Results for "{query}"</Typography>

            <Typography variant="h5" sx={{ mt: 2 }}>Entities</Typography>
            <List>
                {results.entities.map((entity) => (
                    <ListItem key={entity.id} button component={Link} to={`/profile/${entity.id}`}>
                        <ListItemText primary={entity.name} secondary={entity.type} />
                    </ListItem>
                ))}
                {results.entities.length === 0 && <Typography>No entities found.</Typography>}
            </List>
            <Divider />

            <Typography variant="h5" sx={{ mt: 2 }}>Recent Filings</Typography>
            {results.filings.map((filing) => (
                <Card key={filing.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{filing.ticker} - {filing.transaction_type}</Typography>
                        <Typography color="textSecondary">{filing.date} by {filing.Entity?.name}</Typography>
                    </CardContent>
                </Card>
            ))}
            {results.filings.length === 0 && <Typography>No filings found.</Typography>}
        </Container>
    );
};

export default Search;
