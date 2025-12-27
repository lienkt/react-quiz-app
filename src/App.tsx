import { RouterProvider } from 'react-router'
import { mainRoute } from './routes/mainRoute'

import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

function App() {

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              QUIZ APP
            </Typography>
            <Button color="inherit">Leaderboard</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <main>
        <Container maxWidth="md" sx={{ my: 5 }}>
          <RouterProvider router={mainRoute} />
        </Container>
      </main>
    </>
  )
}

export default App
