import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Recipes from "./components/Recipes";
import Pagination from "./components/Pagination";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("fish");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  let currentRecipes = [];

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=98f8143beed34112aba2dddc91bc7cf3&query="${query}"&number=30&addRecipeNutrition=true&addRecipeInformation=true`
        );
        setRecipes(res.data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    fetchRecipes();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  // Get current recipes
  const indexOfLastPost = currentPage * recipesPerPage;
  const indexOfFirstPost = indexOfLastPost - recipesPerPage;
  currentRecipes = recipes.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  let display = (
    <Container fluid>
      <Row className="justify-content-center mt-3">
        {currentRecipes.map((recipe) => (
          <Recipes
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
            sourceUrl={recipe.sourceUrl}
            nutrition={recipe.nutrition}
            loading={loading}
          />
        ))}
      </Row>
      <Row className="justify-content-center mt-3">
        <Pagination
          recipesPerPage={recipesPerPage}
          totalRecipes={recipes.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Row>
    </Container>
  );
  if (error) {
    return (display = (
      <Container>
        <h1>
          Your daily points limit of 150 has been reached. Please upgrade your
          plan to continue using the API.
        </h1>
      </Container>
    ));
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="d-none d-sm-block">Recipepidea</Navbar.Brand>
        <Form className="ml-auto" inline onSubmit={getSearch}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={search}
              onChange={updateSearch}
            />
            <Button variant="outline-info">Search</Button>
          </InputGroup>
        </Form>
      </Navbar>
      {display}
    </>
  );
};

export default App;
