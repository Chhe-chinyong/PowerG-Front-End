import React from "react";
import { Link } from "react-router-dom";
import { BackTop } from "antd";
import section1 from "../images/section1.1.jpg";
import section3 from "../images/section3.jpg";
import { UpOutlined } from "@ant-design/icons";
function HomePage() {
  const style = {
    height: 35,
    width: 35,
    lineHeight: "35px",
    borderRadius: 4,
    backgroundColor: "#f86969",
    color: "#fff",
    textAlign: "center",
  };

  return (
    <div>
      {/* <!-- Navigation--> */}
      <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <div class="container">
          <a
            class="navbar-brand js-scroll-trigger logo-string"
            href="#page-top"
          >
            <span>PowerG </span> <span id="delivery">Delivery</span>
          </a>
          <button
            class="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link js-scroll-trigger" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link js-scroll-trigger" href="#service">
                  Service
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link js-scroll-trigger" href="#signup">
                  Contact
                </a>
              </li>
              <li class="nav-item ">
                <a
                  class="nav-link js-scroll-trigger active "
                  // id="btnLogin-homePage"
                  href=""
                >
                  <Link to="/login" id="leaveBlank">
                    Login
                  </Link>
                </a>
              </li>
              {/* <Link to="/">Login</Link> */}
            </ul>
          </div>
        </div>
      </nav>
      {/* <!-- Masthead--> */}
      <header class="masthead">
        <div class="container d-flex h-100 align-items-center">
          <div class="mx-auto text-center">
            <h1 class="mx-auto my-0 text-uppercase">Power-G Delivery</h1>
            <h2 class="text-white-50 mx-auto mt-2 mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
              obcaecati.
            </h2>
            <a class="btn btn-primary js-scroll-trigger" href="#about">
              Learn more
            </a>
          </div>
        </div>
      </header>
      {/* <!-- About--> */}
      <section class="about-section text-center" id="about">
        <div class="container">
          <div class="row"></div>
        </div>
      </section>
      {/* <!-- Projects--> */}
      <section class="projects-section bg-light" id="service">
        <div class="container">
          {/* <!-- Featured Project Row--> */}
          <h2
            style={{
              marginBottom: "3rem",
              borderBottom: "2px solid red",
              display: "inline-block",
            }}
          >
            Service
          </h2>
          <div class="row align-items-center no-gutters mb-4 mb-lg-5">
            <div class="col-xl-8 col-lg-7">
              <img class="img-fluid mb-3 mb-lg-0" src={section1} alt="done3" />
            </div>
            <div class="col-xl-4 col-lg-5">
              <div class="featured-text text-center text-lg-left">
                <h4>Why us?</h4>
                <p class="text-black-50 mb-0">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nesciunt error unde explicabo sunt adipisci sed!
                </p>
              </div>
            </div>
          </div>
          {/* <!-- Project One Row--> */}
          <div class="row justify-content-center no-gutters mb-5 mb-lg-0">
            <div class="col-lg-6">
              <img
                class="img-fluid"
                src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&h=500&q=80"
                alt="DEMO1"
              />
            </div>
            <div class="col-lg-6">
              <div class="bg-black text-center h-100 project">
                <div class="d-flex h-100">
                  <div class="project-text w-100 my-auto text-center text-lg-left">
                    <h4 class="text-white">Something</h4>
                    <p class="mb-0 text-white-50">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Repellendus ea, in necessitatibus eius voluptate facere!
                    </p>
                    <hr class="d-none d-lg-block mb-0 ml-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Project Two Row--> */}
          <div class="row justify-content-center no-gutters">
            <div class="col-lg-6">
              <img class="img-fluid" src={section3} alt="Demo2" />
            </div>
            <div class="col-lg-6 order-lg-first">
              <div class="bg-black text-center h-100 project">
                <div class="d-flex h-100">
                  <div class="project-text w-100 my-auto text-center text-lg-right">
                    <h4 class="text-white">Join us now</h4>
                    <p class="mb-0 text-white-50">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sunt suscipit facilis rem natus. Repellendus, dolorum.
                    </p>
                    <hr class="d-none d-lg-block mb-0 mr-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Signup--> */}
      <section class="signup-section" id="signup">
        <div class="container">
          <div class="row">
            <div class="col-md-10 col-lg-8 mx-auto text-center">
              <i class="far fa-paper-plane fa-2x mb-2 text-white"></i>
              <h2 class="text-white mb-5">Subscribe to receive updates!</h2>
              <form class="form-inline d-flex">
                <input
                  class="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
                  id="inputEmail"
                  type="email"
                  placeholder="Enter email address..."
                />
                <button class="btn btn-primary mx-auto" type="submit">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Contact--> */}
      <section class="contact-section bg-black">
        <div class="container">
          <div class="row">
            <div class="col-md-4 mb-3 mb-md-0">
              <div class="card py-4 h-100">
                <div class="card-body text-center">
                  <i class="fas fa-map-marked-alt text-primary mb-2"></i>
                  <h4 class="text-uppercase m-0">Address</h4>
                  <hr class="my-4" />
                  <div class="small text-black-50">
                    #D1, Street 345, Phum Tumnob, Khan Sen Sok, Phnom Penh
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-3 mb-md-0">
              <div class="card py-4 h-100">
                <div class="card-body text-center">
                  <i class="fas fa-envelope text-primary mb-2"></i>
                  <h4 class="text-uppercase m-0">Email</h4>
                  <hr class="my-4" />
                  <div class="small text-black-50">
                    <a href="mailto:powergdelivery@gmail.com">
                      powergdelivery@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-3 mb-md-0">
              <div class="card py-4 h-100">
                <div class="card-body text-center">
                  <i class="fas fa-mobile-alt text-primary mb-2"></i>
                  <h4 class="text-uppercase m-0">Phone</h4>
                  <hr class="my-4" />
                  <div class="small text-black-50">099 589 689</div>
                </div>
              </div>
            </div>
          </div>
          <div class="social d-flex justify-content-center">
            <a
              class="mx-2"
              target="_blank"
              href="https://www.facebook.com/PowerGDelivery"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>
      </section>
      {/* <!-- Footer--> */}
      <footer class="footer bg-black small text-center text-white-50">
        <div class="container">Copyright © etalket 2021</div>
      </footer>
      <BackTop visibilityHeight={1000}>
        <div className="backup">
          <UpOutlined />
        </div>
      </BackTop>
    </div>
  );
}

export default HomePage;
// style={style}
