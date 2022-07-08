import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// components
// import Page from '../components/Page';
import ErrorImg from '../assets/img/404.svg';
import Logo from "../assets/img/logo.png";
// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
    img: {
      width: '100'
    },
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    maxWidth: '100%',
    margin: 'auto',
    minHeight: '100%',
    float: 'right',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

function Page404() {
    return (
        <>
            <Container>
                <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
                    <img src={Logo} style={{'width': 100}} />
                    <Typography variant="h3" paragraph>
                        에러 페이지입니다.
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        죄송합니다 해당 페이지는 접근할 수 없습니다.
                    </Typography>

                    <img src={ErrorImg} />

                    <Button style={{'background': '#00AAFF'}} to="/main" size="large" variant="contained" component={RouterLink}>
                        Go to Home
                    </Button>
                </ContentStyle>
            </Container>
        </>
    );
}

export default Page404;
