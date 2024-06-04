import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";


const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {         //fetching data from mockAPI
    await axios
      .get("https://6659f67ede346625136e937b.mockapi.io/api/library")
      .then((ele) => setBooks(ele.data))
      .catch((err) => console.log(err));
  };
  return (                      //creating table to display contents
    <section>
      <Container className="booklist_container">
        <Row className="row-cols-1 row-cols-md-3">
          <Col className="col-12 col-md-12">
      <h1>Books details</h1>
      <Table className="table table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN No</th>
            <th>Publication Date</th>
          </tr>
        </thead>
        <tbody>
          {books.map((element, index) => {
            return(
            <tr key={index}>
              <td>{element.book.title}</td>
              <td>{element.book.author}</td>
              <td>{element.book.isbn}</td>
              <td>{element.book.pubdate}</td>
            </tr>
            )
          })}
        </tbody>
        </Table >
        <h1>Author's Details</h1>
        <Table className="table table-hover">
        <thead>
            <tr>
                <th>Name</th>
                <th>Date of birth</th>
                <th>Biography</th>
            </tr>
        </thead>
        <tbody>
            {books.map((ele,i)=>{
                return(
                <tr key={i}>
                    <td>{ele.author.name}</td>
                    <td>{ele.author.dob}</td>
                    <td>{ele.author.biography}</td>
                </tr>
                )
            })}
        </tbody>
      </Table>
      </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
