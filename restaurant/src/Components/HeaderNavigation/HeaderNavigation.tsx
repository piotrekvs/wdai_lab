import React from 'react';
import {
    Badge,
    Container, Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import { BsCart3 } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { ICurrencyContext } from '../../Types/Types';
import { useAuth } from '../../Utils/AuthContext';
import { useCurrency } from '../../Utils/CurrencyContext';

type Props = {
    setCurrency: (name: ICurrencyContext['name']) => void;
    numOfOrderedDishes: number;
}

const HeaderNavigation: React.FC<Props> = (props: Props) => {
    const authContext = useAuth();
    const currencyContext = useCurrency();
    const navigate = useNavigate();
    return (
        <Navbar style={{ position: 'sticky', top: 0, zIndex: 10 }} bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/home">Restaurant</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
                    <NavDropdown title="Currency" id="nav-dropdown" menuVariant="dark">
                        <NavDropdown.Item
                            active={currencyContext.name === 'euro'}
                            onClick={() => props.setCurrency('euro')}
                        >
                            € Euro
                        </NavDropdown.Item>
                        <NavDropdown.Item
                            active={currencyContext.name === 'usd'}
                            onClick={() => props.setCurrency('usd')}
                        >
                            $ USD
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    {authContext.user.isLoggedIn
                    && authContext.user.loggedInAs === 'customer'
                    && (
                        <Nav.Link as={Link} to="/menu/cart">
                            <BsCart3 size={24} />
                            {' Cart '}
                            <Badge
                                bg={(props.numOfOrderedDishes >= 10 ? 'primary' : 'warning')}
                                text={(props.numOfOrderedDishes >= 10 ? 'light' : 'dark')}
                            >
                                {props.numOfOrderedDishes}
                            </Badge>
                        </Nav.Link>
                    )}
                    {!authContext.user.isLoggedIn
                    && (
                        <>
                            <Nav.Link as={Link} to="/auth/signin">Sign in</Nav.Link>
                            <Nav.Link as={Link} to="/auth/signup">Sign up</Nav.Link>
                        </>
                    )}
                    {authContext.user.isLoggedIn
                    && (
                        <Nav.Link onClick={() => authContext.signOut(() => navigate('/'))}>
                            Sign out
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default HeaderNavigation;
