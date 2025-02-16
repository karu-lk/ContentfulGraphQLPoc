import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const GET_BANNER = gql`
  query GetBanner {
    getBanner {
      imageUrl
      text
      buttonText
      buttonStyle
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_BANNER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { imageUrl, text, buttonText, buttonStyle } = data.getBanner;

  const richContent = documentToHtmlString(text);

  return (
    <>
      <div className='extra-content'>
        <p>... Content goes here ...</p>
      </div>

      <div className='banner'>
        <Container className='top-row'>
          <Row>
            <Col xs={1}>
              <img src={imageUrl} alt="Banner" />
            </Col>
            <Col xs={8}>
              <p style={{paddingTop:'25px'}} dangerouslySetInnerHTML={{ __html: richContent }}></p>
            </Col>
            <Col>
              <Button style={{ backgroundColor: buttonStyle, float: 'right', marginTop:'15px' }}>{buttonText}</Button>
            </Col>
          </Row>
        </Container>
        
      </div>

      <div className='extra-content'>
        <p>... Content goes here ...</p>
      </div>
    </>
  );
}

export default App;