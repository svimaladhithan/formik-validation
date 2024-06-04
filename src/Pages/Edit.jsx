import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import '../index.css';

const Edit = () => {
  const [editBooks, setEditBooks] = useState({      //useState hook to manage the state of the book and author
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
  });
 
  const validationschema = Yup.object({            //validating elements
    book: Yup.object({
      title: Yup.string().required("Field is empty"),
      author: Yup.string().required("Field is empty"),
      isbn: Yup.string()
        .matches(/^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\d-]+$/, "ISBN not valid")
        .required("Field is empty"),
      pubdate: Yup.string().required("Field is empty"),
    }),
    author: Yup.object({
      name: Yup.string().required("Field is empty"),
      dob: Yup.string().required("Field is empty"),
      biography: Yup.string().required("Field is empty"),
    }),
  });

  useEffect(() => {                   //useEffect hook to display the contents while the render
    fetchData();
  }, []);

  const {id}= useParams();

  const fetchData = async () => {       //function to get the data based on ID
    await axios
      .get(`https://6659f67ede346625136e937b.mockapi.io/api/library/${id}`)
      .then((res) => setEditBooks(res.data))
      .catch((err) => console.log(err));
  };
  const navigate=useNavigate();

  useEffect(() => {                        //after the contents edited, the dashboard will re-render
    formik.setValues(editBooks);
  }, [editBooks]);
  const handleSubmit = async(data) => {     //function to update contents
    await axios.put(`https://6659f67ede346625136e937b.mockapi.io/api/library/${id}`,data)
    .then(ele=>console.log(ele))
    .catch(error=>console.log(error))
    navigate('/')
  };

  let formik = useFormik({
    initialValues: {
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
    },
    validationSchema: validationschema,
    onSubmit: handleSubmit,
  });



  return (
    <section>
      <Container>
        <Row className="gx-4 gy-2 gx-lg-5 row-cols-1">
          <form onSubmit={formik.handleSubmit} className="form">
            <Col>
              <div>
                <h3>Book's Info</h3>
                <label>Book's Name:</label>
                <input
                  type="text"
                  name="book.title"
                  value={formik.values.book.title}
                  onChange={formik.handleChange}
                  placeholder="Enter the book name"
                />
                {formik.errors.book?.title ? (
                  <div className="error_message">
                    {formik.errors.book.title}
                  </div>
                ) : null}
              </div>
              <div>
                <label>Author's Name:</label>
                <input
                  type="text"
                  name="book.author"
                  value={formik.values.book.author}
                  onChange={formik.handleChange}
                  placeholder="Enter the author name"
                />
                {formik.errors.book?.author ? (
                  <div className="error_message">
                    {formik.errors.book.author}
                  </div>
                ) : null}
              </div>
              <div>
                <label>ISBN No:</label>
                <input
                  type="text"
                  name="book.isbn"
                  value={formik.values.book.isbn}
                  onChange={formik.handleChange}
                  placeholder="Enter the ISBN"
                />
                {formik.errors.book?.isbn ? (
                  <div className="error_message">{formik.errors.book.isbn}</div>
                ) : null}
              </div>
              <div>
                <label>Publication Date:</label>
                <input
                  type="date"
                  name="book.pubdate"
                  value={formik.values.book.pubdate}
                  onChange={formik.handleChange}
                  placeholder="Enter the date"
                />
                {formik.errors.book?.pubdate ? (
                  <div className="error_message">
                    {formik.errors.book.pubdate}
                  </div>
                ) : null}
              </div>
            </Col>
            <Col>
              <h3>Author's Info:</h3>
              <div>
                <label>Author's Name:</label>
                <input
                  type="text"
                  name="author.name"
                  value={formik.values.author.name}
                  onChange={formik.handleChange}
                  placeholder="Enter the author name"
                />
                {formik.errors.author?.name ? (
                  <div className="error_message">
                    {formik.errors.author.name}
                  </div>
                ) : null}
              </div>
              <div>
                <label>Date of birth:</label>
                <input
                  type="date"
                  name="author.dob"
                  value={formik.values.author.dob}
                  onChange={formik.handleChange}
                  placeholder="Enter the date"
                />
                {formik.errors.author?.dob ? (
                  <div className="error_message">
                    {formik.errors.author.dob}
                  </div>
                ) : null}
              </div>
              <div>
                <label>Biography:</label>
                <input
                  type="text"
                  name="author.biography"
                  value={formik.values.author.biography}
                  onChange={formik.handleChange}
                  placeholder="Enter the biography"
                />
                {formik.errors.author?.biography ? (
                  <div className="error_message">
                    {formik.errors.author.biography}
                  </div>
                ) : null}
              </div>
            </Col>
            <Button type="submit" className="btn btn-success">Update</Button>
          </form>
        </Row>
      </Container>
    </section>
  );
};

export default Edit;
