import React, { useState, useContext, FunctionComponent } from "react";
import {Form as AntdForm, Input, Button, Spin, Collapse} from "antd";
import { Formik, Form, Field, FormikProps } from "formik";
import * as yup from "yup";
import { Mutation, Query } from "react-apollo";
import { UPDATE_USER_INFO, GET_USER } from "../../../queries";
import { UserContext } from "../../../App";
import { InputField } from "../../common/components/InputField";
import { TextAreaField } from "../../common/components/TextAreaField";
import "./InfoForm.css";
import {HeaderStyles} from "./style_options/HeaderStyles/HeaderStyles";

const { TextArea } = Input;

interface SocialData {
  facebook?: string;
  linkedIn?: string;
  twitter?: string;
  stackOverflow?: string;
  codepen?: string;
}

interface IUserInfo {
  name: string;
  title: string;
  profilePhoto: string;
  location: string;
  about: string;
  email: string;
  phone: string;
  github: string;
  social?: SocialData;
}

export const InfoForm: FunctionComponent<any> = () => {
  const authUser = useContext(UserContext);

  const initialValues: IUserInfo = {
    name: "",
    title: "",
    profilePhoto: "",
    location: "",
    about: "",
    email: "",
    phone: "",
    github: "",
    social: {

    }
  };

  return (
    <Query query={GET_USER} variables={{ id: authUser.id }}>
      {({ loading, error, data, refetch }: any) => {
        if (loading) return <div className="projects__loader"><Spin tip="Loading..."/></div>;
        if (!loading && !error) delete data.getUser.info.__typename;

        return (
          <Mutation
            mutation={ UPDATE_USER_INFO }
            onCompleted={(data: any) => {
              refetch();
            }}
          >
            {(updateUserInfo: any) => (
              <div className="info__wrapper">

                  <Formik
                      enableReinitialize={true}
                    initialValues={data ? data.getUser.info : initialValues}
                    onSubmit={(values, actions) => {

                        console.log(values, authUser.id);
                        delete values.social.__typename;
                        updateUserInfo({
                          variables: { userInfo: values, id: authUser.id }
                        });

                        actions.setSubmitting(false);

                    }}
                    render={(props: FormikProps<IUserInfo>) => {


                      return (
                      <Form style={{ width: '100%'}}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            shape="round"
                            icon="save"
                            size="large"
                            style={{ display: "block", marginBottom: 10 }}
                        >
                          Save
                        </Button>
                        <Collapse onChange={(key) => console.log(key)} >
                          <Collapse.Panel header="Social Media" key="1" className="info__collapse">
                            <Field
                                name="social.facebook"
                                label="Facebook"
                                placeholder="Profile URL"
                                component={InputField}
                            />
                            <Field
                                name="social.linkedIn"
                                label="LinkedIn"
                                placeholder="Profile URL"
                                component={InputField}
                            />
                            <Field
                                name="social.twitter"
                                label="Twitter"
                                placeholder="Profile URL"
                                component={InputField}
                            />
                            <Field
                                name="social.stackOverflow"
                                label="Stack Overflow"
                                placeholder="Profile URL"
                                component={InputField}
                            />
                          </Collapse.Panel>
                        </Collapse>
                        <Field
                          name="name"
                          label="Name"
                          placeholder="Name"
                          component={InputField}
                        />
                        <Field
                            name="title"
                            label="Job Title"
                            placeholder="Job Title"
                            component={InputField}
                        />
                        <Field
                          name="profilePhoto"
                          label="Profile Photo"
                          placeholder="Profile picture URL"
                          component={InputField}
                          allowClear
                        />
                        <Field
                          name="location"
                          label="Location"
                          placeholder="Location, e.g. San Francisco"
                          component={InputField}
                        />
                        <Field
                          name="about"
                          label="About"
                          placeholder="Give a brief overview of who you are and what you're all about!"
                          autosize={{ minRows: 2, maxRows: 6 }}
                          component={TextAreaField}
                        />
                        <Field
                          name="email"
                          label="E-mail Address"
                          placeholder="E-mail, e.g. jesus@heaven.gov"
                          component={InputField}
                        />
                        <Field
                          name="phone"
                          label="Phone Number"
                          placeholder="(123)-555-1234"
                          component={InputField}
                        />
                        <Field
                          name="github"
                          label="Github Profile"
                          placeholder="Link to your Github"
                          component={InputField}
                        />
                        {props.errors.name && (
                          <div id="feedback">{props.errors.name}</div>
                        )}
                      </Form>
                    )}}
                  />
                </div>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};
