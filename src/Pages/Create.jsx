import React from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Create = () => {
  const initiaValues = {                  //setting the initial values
    book: {
      title: "",
      author: "",
      isbn: "",
      pubdate: "",
    },
    author: {
      name: "",
      dob: "",
      biography: "",
    },
  };
  const navigate = useNavigate();
  const validationschema = Yup.object().shape({         //validationschema for validating the contents in the form
    book: Yup.object().shape({
      title: Yup.string().required("Field is empty"),
      author: Yup.string().required("Field is empty"),
      isbn: Yup.string()
        .matches(/^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\d-]+$/, "ISBN not valid")
        .required("Field is empty"),
      pubdate: Yup.string().required("Field is empty"),
    }),
    author: Yup.object().shape({
      name: Yup.string().required("Field is empty"),
      dob: Yup.string().required("Field is empty"),
      biography: Yup.string().required("Field is empty"),
    }),
  });
  const handleSubmit = async (data) => {              //function to add the data to the dashboard
    await axios
      .post("https://6659f67ede346625136e937b.mockapi.io/api/library", data)
      .then((ele) => console.log(ele))
      .catch((err) => console.log(err));
    navigate("/");
  };
  return (                            //creating form to get the elements of the book and author
    <section>
      <Container>
        <Row className="gx-4 gy-2 gx-lg-5 row-cols-1 userlist_container">
          <Formik
            initialValues={initiaValues}
            validationSchema={validationschema}
            onSubmit={handleSubmit}
          >
            <Form className="form">
              <Col>
                <div>
                  <h2>Book's Info</h2>
                  <label>Book's Name:</label>
                  <Field
                    type="text"
                    name="book.title"
                    placeholder="Enter the book name"
                  />
                  <ErrorMessage
                    name="book.title"
                    component="h6"
                    className="error_message"
                  />
                </div>
                <div>
                  <label>Author's Name:</label>
                  <Field
                    type="text"
                    name="book.author"
                    placeholder="Enter the author name"
                  />
                  <ErrorMessage
                    name="book.author"
                    component="h6"
                    className="error_message"
                  />
                </div>
                <div>
                  <label>ISBN No:</label>
                  <Field
                    type="text"
                    name="book.isbn"
                    placeholder="Enter the ISBN"
                  />
                  <ErrorMessage
                    name="book.isbn"
                    component="h6"
                    className="error_message"
                  />
                </div>
                <div>
                  <label>Publication Date:</label>
                  <Field
                    type="date"
                    name="book.pubdate"
                    placeholder="Enter the date"
                  />
                  <ErrorMessage
                    name="book.pubdate"
                    component="h6"
                    className="error_message"
                  />
                </div>
              </Col>
              <Col>
              <div>
              <h2>Author's Info</h2>
                  <label>Author's name:</label>
                  <Field
                    type="text"
                    name="author.name"
                    placeholder="Enter the author name"
                  />
                  <ErrorMessage
                    name="author.name"
                    component="h6"
                    className="error_message"
                  />
                </div>
                <div>
                  <label>Date of birth:</label>
                  <Field
                    type="date"
                    name="author.dob"
                    placeholder="Enter the date"
                  />
                  <ErrorMessage
                    name="author.dob"
                    component="h6"
                    className="error_message"
                  />
                </div>
                <div>
                  <label>Biography:</label>
                  <Field
                    type="text"
                    name="author.biography"
                    placeholder="Enter the biography"
                  />
                  <ErrorMessage
                    name="author.biography"
                    component="h6"
                    className="error_message"
                  />
                </div>
              
                <Button type="submit" className="submit">Submit</Button>
              </Col>
              
            </Form>
          </Formik>
        </Row>
      </Container>
    </section>
  );
};

export default Create;
