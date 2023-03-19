import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// 토큰있으면
// 해당하는 아이디와 권한 가져오기

function Header() {
    const [haveToken, setToken] = useState(null);
    const [role, setRole] = useState(JSON.parse(sessionStorage.getItem('role')));

    // 토큰 유무찾기
    useEffect(() => {
        setToken(sessionStorage.getItem('token'));
        if (haveToken !== null) {
            setRole(JSON.parse(sessionStorage.getItem('role')));
        } else {
            setRole('');
        }
    }, [haveToken, role]);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                
                    {/* <img src={process.env.PUBLIC_URL + '/dogeCoin.com.png'} width="100" height="80" /> */}
                    <h2>NEGO JANGTEO</h2>
                </Navbar.Brand>
                
                <Navbar.Toggle className="justify-content-end" />
                
                <Navbar.Collapse className="justify-content-end">
                <div className='justify-content-left'></div>
                    <Nav className="justify-content-end mx-5">
                        {/* <InputGroup className="mb-3">
                            <Form.Control aria-label="Text input with dropdown button" />
                            <div style={divstyle}>
                                <DropdownButton
                                    variant="outline-secondary"
                                    title="검색 옵션"
                                    id="input-group-dropdown-2"
                                    align="end"
                                >
                                    <Dropdown.Item href="#">판매자 이름으로 찾기</Dropdown.Item>
                                    <Dropdown.Item href="#">검색 옵션2</Dropdown.Item>
                                    <Dropdown.Item href="#">검색 옵션3</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="#">다른 검색 옵션4</Dropdown.Item>
                                </DropdownButton>
                            </div>

                        </InputGroup> */}
                        {haveToken === null ? (
                            <>
                                <LinkStyle to="/login">Login</LinkStyle> 
                                <LinkStyle to="/signup">Sign up</LinkStyle>
                            </>
                        ) : <>
                        <LinkStyle to="/mypage">마이 페이지</LinkStyle> 
                        <LinkStyle to="/upload">상품 등록</LinkStyle>
                        <LinkStyle onClick={()=>{
                            sessionStorage.removeItem('token');
                            window.location.reload();
                        }}>로그아웃</LinkStyle>
                    </>}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;

const LinkStyle = styled(Link)`
  margin-right: 2rem;
  text-decoration: none;
  color: gray;
  &:hover {
    color: black;
  }
`;

const divstyle = {
    "marginRight" : "2rem "
}

