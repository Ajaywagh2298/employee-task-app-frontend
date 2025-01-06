import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box } from '@mui/material';
import { Bell, Search, User } from 'lucide-react';
import { styled, alpha } from '@mui/material/styles';

const SearchContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export function Header() {
    return (
        <AppBar position="static" sx={{ background: 'linear-gradient(to right, #6a1b9a, #283593)' }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    TaskMaster
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SearchContainer>
                        <SearchIconWrapper>
                            <Search size={18} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </SearchContainer>
                    <IconButton color="inherit" aria-label="notifications">
                        <Bell size={20} />
                    </IconButton>
                    <IconButton color="inherit" aria-label="user account">
                        <User size={20} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
