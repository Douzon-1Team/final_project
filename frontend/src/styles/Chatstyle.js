import styled from 'styled-components';

const Mainchats = styled.div`
    display: inline-block;
    width: 500px;
    margin-left: 100px;
    @media screen and (max-width: 2000px) {
        margin-left: 0px;
        width: 400px;
        }
    @media screen and (max-width: 1450px) {
        display: none;
    }
`

export { Mainchats };
