import React from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout'; // Import Layout component

const AddEntry = () => {
  const router = useRouter();

  const handleAdd = async (values) => {
    const newEntry = { ...values };
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });
      const data = await response.json();
      console.log(data);
      router.push('/');
    } catch (error) {
      console.error('Error adding new entry:', error);
    }
  };

  return (
    <Layout>
      <Container>
        <h1 className="my-4">Add New Entry</h1>
        <Formik
          initialValues={{
            title: '',
            price: '',
            description: '',
            category: '',
          }}
          validationSchema={Yup.object({
            title: Yup.string().required('Title is required'),
            price: Yup.number().required('Price is required').positive('Price must be positive'),
            description: Yup.string().required('Description is required'),
            category: Yup.string().required('Category is required'),
          })}
          onSubmit={(values) => {
            handleAdd(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <Field name="title" type="text" as={Input} className="form-control" />
                    {errors.title && touched.title ? <div className="text-danger">{errors.title}</div> : null}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <Field name="price" type="number" as={Input} className="form-control" />
                    {errors.price && touched.price ? <div className="text-danger">{errors.price}</div> : null}
                  </div>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Field name="description" type="text" as={Input} className="form-control" />
                    {errors.description && touched.description ? <div className="text-danger">{errors.description}</div> : null}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <Field name="category" type="text" as={Input} className="form-control" />
                    {errors.category && touched.category ? <div className="text-danger">{errors.category}</div> : null}
                  </div>
                </Col>
              </Row>
              <div className="d-flex justify-content-center">
                <Button type="primary" htmlType="submit" className="mt-3 btn btn-success">Add</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  );
};

export default AddEntry;