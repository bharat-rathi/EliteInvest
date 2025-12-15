import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search?q=${search}`);
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    EliteInvest Track
                </Typography>
                <Box component="form" onSubmit={handleSearch} sx={{ mr: 2 }}>
                    <TextField
                        size="small"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ bgcolor: 'white', borderRadius: 1 }}
                    />
                </Box>
                {user ? (
                    <Button color="inherit" onClick={logout}>Logout</Button>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
