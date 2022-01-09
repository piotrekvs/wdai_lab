import React from 'react';
import { Container, Pagination } from 'react-bootstrap';
import { Pagination as PaginationType } from '../../Types/Types';

type Props = {
    pages: PaginationType['pages'];
    active: PaginationType['active'];
    onChange: (active: PaginationType['active']) => void;
}

const PaginationButtons: React.FC<Props> = (props: Props) => (
    <Container className="d-flex flex-column align-items-center">
        <Pagination>
            {[...Array(props.pages + 1)].splice(1).map((_, i) => (
                <Pagination.Item
                // eslint-disable-next-line react/no-array-index-key
                    key={`pag-${i}`}
                    active={i === props.active}
                    onClick={() => props.onChange(i)}
                >
                    {i + 1}
                </Pagination.Item>
            ))}
        </Pagination>
    </Container>
);

export default PaginationButtons;
