import React, { useContext, useState, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import { useHistory } from 'react-router';
import { UserContext } from 'context';
import { imgUrl } from 'config';
import Wrapper from './styles';

const Layout = ({ children }) => {
    const history = useHistory();
    const { state, modeDarkFunction } = useContext(UserContext);
    // 다크모드 상태 값
    const [modeDark, setModeDark] = useState(false);

    const onClickLogo = useCallback(() => {
        history.push('/');
        window.scrollTo(0, 0);
    }, []);

    const onClickNav = useCallback(
        (key) => () => {
            history.push(key);
        },
        [],
    );

    const onClickDarkMode = useCallback(() => {
        modeDarkFunction(!modeDark);
        setModeDark(!modeDark);
    }, [modeDark]);

    return (
        <Wrapper>
            {/* 헤더 */}
            <Grid container justify="space-between" className="header">
                {/* 로고 */}
                <Grid item className={state.modeDark ? 'logo on' : 'logo'} onClick={onClickLogo}>
                    로고
                </Grid>
                {/* 네비게이션 */}
                <Grid item className="nav_wrap">
                    <Grid container className="nav">
                        {/* 글로벌 네비게이션 바 */}
                        <Grid item className="gnb_wrap">
                            <Grid container alignItems="center" className="gnb">
                                {state.sidebar.map((x) => (
                                    <Grid item key={x.key} onClick={onClickNav(x.key)}>
                                        <span>{x.value}</span>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        {/* 유틸 */}
                        <Grid item className="util_wrap">
                            <Grid container alignItems="center" className="util">
                                <Grid item>
                                    <button type="button" onClick={onClickDarkMode}>
                                        {state.modeDark ? <Brightness7Icon /> : <Brightness4Icon />}
                                    </button>
                                </Grid>
                                <Grid item>
                                    <a href="https://github.com/dev-donghyuk" target="_blank" rel="noopener noreferrer">
                                        <GitHubIcon />
                                    </a>
                                </Grid>
                                <Grid item>
                                    <a href="https://www.notion.so/Donghyuk-Kim-6585ae54500946daa55004efbdea71c6" target="_blank" rel="noopener noreferrer">
                                        <img src={`${imgUrl}/notion_icon.png`} alt="" />
                                    </a>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {children}
        </Wrapper>
    );
};

export default Layout;
