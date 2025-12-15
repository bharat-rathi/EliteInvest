import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from '../api/axios';

const Dashboard = () => {
    const [filings, setFilings] = useState([]);

    useEffect(() => {
        const fetchFilings = async () => {
            try {
                const res = await axios.get('/filings/recent');
                setFilings(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchFilings();
    }, []);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Recent Filings</Typography>
            <Card>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Entity</TableCell>
                                <TableCell>Ticker</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filings.map((filing) => (
                                <TableRow key={filing.id}>
                                    <TableCell>{filing.date}</TableCell>
                                    <TableCell>{filing.Entity?.name}</TableCell>
                                    <TableCell>{filing.ticker}</TableCell>
                                    <TableCell>{filing.filing_type}</TableCell>
                                    <TableCell>{filing.transaction_type}</TableCell>
                                    <TableCell>${filing.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Dashboard;
