import React from "react";

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const Recipes = ({ title, image, nutrition, sourceUrl, loading }) => {
  const nutrients = nutrition.nutrients;
  if (loading) {
    return (
      <Col className="my-auto">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Col>
    );
  }
  return (
    <Col className="m-4" sm={10} md={4} lg={3}>
      <Card className="shadow">
        <Card.Img variant="top" src={image} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {nutrients.map((nutrient) => {
            if (
              nutrient.title === "Protein" ||
              nutrient.title === "Fat" ||
              nutrient.title === "Carbohydrates" ||
              nutrient.title === "Calories"
            ) {
              return (
                <Card.Text
                  className="m-1"
                  key={nutrient.amount}
                >{`${nutrient.title}: ${nutrient.amount} ${nutrient.unit}`}</Card.Text>
              );
            }
          })}
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="primary">See Recipe Info</Button>
          </a>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default Recipes;
