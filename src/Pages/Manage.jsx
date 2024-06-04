import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Button} from 'react-bootstrap';

const Manage = () => {

    const[books,setBooks]=useState([]);
    const[deleteData,setDeleteData]=useState([]);

    const navigate= useNavigate();

    useEffect(()=>{
        fetchData();
    },[deleteData])

    const fetchData= async()=>{            //function to get data from mockAPI
        await axios.get("https://6659f67ede346625136e937b.mockapi.io/api/library")
        .then((ele)=>setBooks(ele.data))
        .catch(err=>console.log(err))
    }

    const handleEdit=(id)=>{                //function to navigate to the edit page once the edit button is pressed
        navigate(`/edit/${id}`)
    }

    const handleDelete=async(id)=>{                             //function to delete a specific element
        await axios.delete(`https://6659f67ede346625136e937b.mockapi.io/api/library/${id}`)
        .then(res=>setDeleteData(res.data))
        .catch(error=>console.log(error))
    }

    return (                                //creating table to displey elements
        <section>
            <Container>
                <Row className="row-cols-1 row-cols-md-3">
                    <Col className="col-12 col-md-12">
                    <h3>Manage Library</h3>
                    <Table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Author Name</th>
                            <th>ISBN No</th>
                            <th>Publication Date</th>
                            <th>Author DOB</th>
                            <th>Biography</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((element,index)=>{
                            return(
                            <tr key={index}>
                                <td>{element.book.title}</td>
                                <td>{element.book.author}</td>
                                <td>{element.book.isbn}</td>
                                <td>{element.book.pubdate}</td>
                                <td>{element.author.dob}</td>
                                <td>{element.author.biography}</td>
                                <td><Button className='btn btn-primary' onClick={()=>{handleEdit(element.id)}}>Edit</Button></td>
                                <td><Button className='btn btn-danger' onClick={()=>{handleDelete(element.id)}}>Delete</Button></td>
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

export default Manage;