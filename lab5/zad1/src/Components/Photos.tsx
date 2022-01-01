import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Card, Col, Row, Spinner,
} from 'react-bootstrap';

type State = {
    photos: {albumId: number; id: number; title: string; url: string; thumbnailUrl: string;}[];
    isLoading: boolean;
};

const getPosts = () => axios({
    url: '/photos',
    method: 'get',
});

const Photos = () => {
    const [photos, setPhotos] = useState<State['photos']>(() => []);
    const [isLoading, setIsLoading] = useState<State['isLoading']>(() => true);
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const productsRes = await getPosts();
                setPhotos(productsRes.data);
            } catch (e) {
                // TODO: handle errors
            }
        };
        fetchPhotos();
    }, []);

    useEffect(() => {
        if (photos.length) {
            setIsLoading(false);
        }
    }, [photos]);

    return (
        <div>
            <h1>PHOTOS!</h1>
            {isLoading ? <Spinner animation="border" /> : (
                <Row xs={1} md={2} className="g-4">
                    {photos.map((val) => (
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={val.url} />
                                <Card.Body>
                                    <Card.Title>{val.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default Photos;
