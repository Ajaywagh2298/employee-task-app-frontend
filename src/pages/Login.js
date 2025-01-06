import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:8095/api/employees/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (data) {
            onLogin(data.user);
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f4f4f4',
            }}
        >
            <Paper sx={{ p: 4, width: 400, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Admin Login
                </Typography>
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
                    Login
                </Button>
            </Paper>
        </Box>
    );
}

export default Login;
