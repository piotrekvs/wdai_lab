import React from 'react';
import {
    Button, ButtonGroup, Card, Container,
} from 'react-bootstrap';
import { Pagination } from '../../Types/Types';

type Props = {
    itemsOnPage: Pagination['itemsOnPage'];
    itemsOnPageArray: number[];
    onChangeItemsOnPage: (iteitemsOnPagems: Pagination['itemsOnPage']) => void;
};

const DishesMenuToolbar: React.FC<Props> = (props: Props) => {
    const handleBtnColor = (itemsOnPage: Pagination['itemsOnPage']): string => (
        itemsOnPage === props.itemsOnPage ? 'secondary' : 'outline-secondary');

    return (
        <Container>
            <Card>
                <Card.Body className="d-flex flex-row justify-content-between">
                    <div>FILTERS</div>
                    <div>
                        Items on page:
                        <ButtonGroup className="ms-2">
                            {props.itemsOnPageArray.map((val) => (
                                <Button
                                    key={val}
                                    variant={handleBtnColor(val)}
                                    onClick={() => props.onChangeItemsOnPage(val)}
                                >
                                    {val}
                                </Button>
                            ))}
                        </ButtonGroup>

                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DishesMenuToolbar;
