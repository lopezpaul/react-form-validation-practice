import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const FormikForm = () => {
    return (
        <div id="formik">
            <h3>Using Formik</h3>
            <Formik
                initialValues={{ email: "", password: "" }}
                validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = "Required";
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = "Invalid email address";
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="control-group">
                            <div className="form-control">
                                <Field type="email" name="email" />
                                <ErrorMessage name="email" component="div" />
                            </div>
                            <div className="form-control">
                                <Field type="password" name="password" />
                                <ErrorMessage name="password" component="div" />
                            </div>
                        </div>
                        <div className='form-actions'>
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
export default FormikForm;