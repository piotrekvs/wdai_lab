import React from 'react';
import {
    Badge,
    Container, Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import { BsCart3 } from 'react-icons/bs';

type Props = {
    currency: string;
    setCurrency: (currency: string) => void;
    page: string;
    setPage: (currency: string) => void;
    numOfOrderedDishes: number;
}

const HeaderNavigation: React.FC<Props> = (props: Props) => (
    <Navbar style={{ position: 'sticky', top: 0, zIndex: 10 }} bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home">Restaurant</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link
                    href="#home"
                    active={props.page === 'home'}
                    onClick={() => props.setPage('home')}
                >
                    Home
                </Nav.Link>
                <Nav.Link
                    href="#menu"
                    active={props.page === 'menu'}
                    onClick={() => props.setPage('menu')}
                >
                    Menu
                </Nav.Link>
                <NavDropdown title="Currency" id="nav-dropdown" menuVariant="dark">
                    <NavDropdown.Item
                        active={props.currency === 'euro'}
                        onClick={() => props.setCurrency('euro')}
                    >
                        € Euro
                    </NavDropdown.Item>
                    <NavDropdown.Item
                        active={props.currency === 'usd'}
                        onClick={() => props.setCurrency('usd')}
                    >
                        $ USD
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
                <Nav.Link href="#cart">
                    <BsCart3 size={24} />
                    {' Cart '}
                    <Badge
                        bg={(props.numOfOrderedDishes >= 10 ? 'primary' : 'warning')}
                        text={(props.numOfOrderedDishes >= 10 ? 'light' : 'dark')}
                    >
                        {props.numOfOrderedDishes}
                    </Badge>
                </Nav.Link>
            </Nav>
        </Container>
    </Navbar>
);

export default HeaderNavigation;
