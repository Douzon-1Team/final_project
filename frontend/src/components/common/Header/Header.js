import React, { useState } from 'react';
import { style } from './HeaderStyle';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = ({ role, sideView, changeState }) => {
    const [data, setData] = useState(sideView);

    return (
        <HeaderForm>
            <Menubox onClick={changeState}>
                <AiOutlineMenu />
            </Menubox>
            {role === 0 ? (
                <MenuName>팀 원</MenuName>
            ) : role === 1 ? (
                <MenuName>담당자</MenuName>
            ) : role === 2 ? (
                <MenuName>ADMIN</MenuName>
            ) : (
                <></>
            )}
        </HeaderForm>
    );

};
const { HeaderForm, Menubox, MenuName } = style;
export default Header;
