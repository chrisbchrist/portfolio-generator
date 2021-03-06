import React, { useState, useEffect, useContext, FunctionComponent } from 'react';
import './Homepage.css';
import { Button, Icon, Divider } from 'antd';
import {AuthUser} from "../../types";
import { Link } from 'react-router-dom';

interface HomepageProps {
    authUser: AuthUser
}

export const Home: FunctionComponent<HomepageProps> = ({ authUser }) => {

    return (
        <div className="hero__wrapper">
            <section className="hero__header">
                <h1 className="hero__tagline">Get some sleep.</h1>
                <h2 className="hero__subheader">Your portfolio is taken care of.</h2>
                <Link to={authUser ? "/editor" : "/login"}>
                    <Button type="primary" shape="round" size="large" className="hero__getstarted">Get Started!</Button>
                </Link>
                <img src="https://res.cloudinary.com/dgeb3iekh/image/upload/v1566261823/hacking-2903156_640_l53l7s.jpg" className="hero__computerman"/>
                <div className="hero__svg-wrapper">
                    <svg id="wave" viewBox="0 0 1440 45" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 39C0 39 291.625 0.0315932 479.5 0C667.764 -0.0316586 771.789 34.5337 960 39C1147.5 43.4495 1440 23 1440 23V45H0V39Z" fill="white"/>
                    </svg>
                </div>
            </section>
            <section className="features__wrapper">
                <div className="features__top">
                <img  className="features__undraw" src="https://res.cloudinary.com/dgeb3iekh/image/upload/v1566521545/undraw_portfolio_website_lidw_1_s767bo.svg" alt=""/>
                <h2 className="features__header">
                    <span className="features__header--highlight">Fast</span> and <span className="features__header--highlight">professional</span> portfolio builder for developers & digital creatives.
                </h2>
                    {/*<div className="features__svg-wrapper">*/}
                    {/*    <svg id="wave" viewBox="0 0 1440 45" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*        <path d="M0 39C0 39 291.625 0.0315932 479.5 0C667.764 -0.0316586 771.789 34.5337 960 39C1147.5 43.4495 1440 23 1440 23V45H0V39Z" fill="white"/>*/}
                    {/*    </svg>*/}
                    {/*</div>*/}

                </div>
                <div className="features__feature-icons">
                    <div className="features__icon-wrapper">
                        <Icon type="hourglass" theme="twoTone" className="features__icon"/>
                        <h3 className="features__icon-title">Quick</h3>
                        <p className="features__icon-text">Finish your portfolio <strong>today</strong>! Spend your valuable time working on the projects you want to show off, not the place you're showing them.</p>
                        <Link to="editor" style={{ height: 0, marginTop: "auto"}}><Button type="primary" ghost className="features__icon-button">Show me!</Button></Link>
                    </div>
                    <div className="features__icon-wrapper">
                        <Icon type="layout" theme="twoTone" twoToneColor="#eb2f96" className="features__icon"/>
                        <h3 className="features__icon-title">Professional Design</h3>
                        <p className="features__icon-text">Our custom-made and customizable templates will make your site <em>look</em> like a painstaking labor of love!</p>
                        <Link to="editor" style={{ height: 0, marginTop: "auto"}}><Button type="primary" ghost className="features__icon-button">Let's Go!</Button></Link>
                    </div>
                    <div className="features__icon-wrapper">
                        <Icon type="code" className="features__icon" theme="twoTone" twoToneColor="#52c41a"/>
                        <h3 className="features__icon-title">No Coding</h3>
                        <p className="features__icon-text">Enter all your content and information through our editor and download an automatically generated HTML file that's ready to deploy!</p>
                        <Link to="editor" style={{ height: 0, marginTop: "auto"}}><Button type="primary" ghost className="features__icon-button">Sounds Good!</Button></Link>
                    </div>
                    <div className="features__icon-wrapper">
                        <Icon type="smile" theme="twoTone" twoToneColor="#6614e0" className="features__icon"/>
                        <h3 className="features__icon-title">Guaranteed Self-Actualization</h3>
                        <p className="features__icon-text">This website is guaranteed by the government to transform the endless drudgery of your mundane existence into a god damn utopia of boundless joy which is, in every way, superior to the life you are living now.</p>
                        <Link to="editor" style={{ height: 0, marginTop: "auto"}}><Button type="primary" ghost className="features__icon-button">OK?</Button></Link>
                    </div>
                </div>
            </section>
        </div>
    )
};



