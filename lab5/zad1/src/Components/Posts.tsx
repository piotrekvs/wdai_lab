import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Button,
    Container, Form, Spinner,
} from 'react-bootstrap';
import PostCard from './PostCard';

type State = {
    posts: {userId: number; id: number; title: string; body: string}[];
    isLoading: boolean;
    inputs: {title: string, body: string};
};

const getPosts = () => axios({
    url: '/posts',
    method: 'get',
});

const postPosts = (inputs: State['inputs']) => axios({
    url: '/posts',
    method: 'post',
    data: {
        userId: 0,
        title: inputs.title,
        body: inputs.body,
    },
});

const Posts = () => {
    const [posts, setPosts] = useState<State['posts']>(() => []);
    const [inputs, setInputs] = useState<State['inputs']>(() => ({ title: '', body: '' }));
    const [isLoading, setIsLoading] = useState<State['isLoading']>(() => true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const productsRes = await getPosts();
                setPosts(productsRes.data);
            } catch (e) {
                // TODO: handle errors
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        if (posts.length) {
            setIsLoading(false);
        }
    }, [posts]);

    const handleAddPost = async () => {
        const res = await postPosts(inputs);
        setPosts((s) => ([res.data, ...s]));
        setInputs(() => ({ title: '', body: '' }));
    };

    return (
        <div>
            <h1>POSTS:</h1>
            <Container>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            value={inputs.title}
                            onChange={(val) => setInputs(
                                (s) => ({ ...s, title: val.target.value }),
                            )}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Body</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Body"
                            value={inputs.body}
                            onChange={(val) => setInputs(
                                (s) => ({ ...s, body: val.target.value }),
                            )}
                        />
                    </Form.Group>
                    <Button className="mb-3" onClick={handleAddPost}>Add post</Button>
                </Form>
            </Container>
            {isLoading ? <Spinner animation="border" /> : posts.map((val) => (
                <PostCard
                    key={val.id}
                    userId={val.userId}
                    id={val.id}
                    title={val.title}
                    body={val.body}
                />
            ))}
        </div>

    );
};

export default Posts;
