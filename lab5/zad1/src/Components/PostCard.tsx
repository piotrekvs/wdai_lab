import React from 'react';
import Card from 'react-bootstrap/esm/Card';

type Props = {
    userId: number,
    id: number,
    title: string,
    body: string,
}

const PostCard = (props: Props) => (
    <Card
        bg="info"
        key={props.id}
        text="white"
        className="mb-2"
    >
        <Card.Header>
            UserId
            {' '}
            {props.userId}
        </Card.Header>
        <Card.Body>
            <Card.Title>
                {props.title}
            </Card.Title>
            <Card.Text>
                {props.body}
            </Card.Text>
        </Card.Body>
    </Card>
);

export default PostCard;
