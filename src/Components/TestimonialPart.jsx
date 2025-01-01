import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllTestimonials } from "../Api/Functions/Testimonial.api";
import PageLoader from "../Loader/PageLoader";
import { ImageUrl } from "../Api/AxiosInstance/ImageUrl";
import { Alert } from "@mui/material";

const TestimonialPart = () => {
  const {
    isLoading,
    isError,
    data: testimonialdata,
    error,
  } = useQuery({
    queryKey: ["testimonial_data"],
    queryFn: getAllTestimonials,
  });
  if (isLoading) {
    return <PageLoader />;
  }

  console.log(testimonialdata);
  // Enhanced error handling
  if (isError) {
    return (
      <div className="container mt-5 mb-5">
        <Alert severity="error" variant="outlined">
          <div className="text-center py-4">
            <h4 className="mb-3">We're experiencing technical difficulties</h4>
            <p className="mb-2">
              We apologize for the inconvenience. This could be due to:
            </p>
            <ul className="list-unstyled">
              <li>• Temporary server maintenance</li>
              <li>• Network connectivity issues</li>
              <li>• High server load</li>
            </ul>
            <p className="mt-3">
              Please try refreshing the page or check back in a few minutes.
            </p>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <>
      {!Array.isArray(testimonialdata) || testimonialdata.length === 0 ? (
        <div className="container mt-5">
          <Alert severity="info" variant="outlined">
            <div className="text-center py-4">
              <h4 className="mb-3">No Services Available</h4>
              <p>
                Our team is currently updating the service catalog. Please check
                back in an hour.
              </p>
              <p className="mt-2">Thank you for your patience.</p>
            </div>
          </Alert>
        </div>
      ) : (
        <>
          <div class="container-fluid py-5 aboutus">
            <div class="container py-5">
              <div className="about_heading">
                <h4>// Testimonials //</h4>
                <h3 className="about_whychooseus mb-5">
                  See What Our Customers Said
                </h3>
              </div>
              <div class="row justify-content-center">
                <div class="col-lg-8">
                  <div
                    class="carousel slide testimonial-carousel owl-dot"
                    id="imageCarousel"
                    data-ride="carousel"
                  >
                    <div class="carousel-inner">
                      {testimonialdata?.map((item, index) => (
                        <>
                          {item ? (
                            <>
                              <div
                                className={`carousel-item ${
                                  index === 0 ? "active" : ""
                                }`}
                              >
                                {/* <div
                      className="carousel-item active"
                    > */}
                                <div class="text-center">
                                  <i class="fa fa-3x fa-quote-left text-white mb-4"></i>
                                  <h6 class="font-weight-normal mb-4 text-white">
                                    {item?.talk.slice(0, 200)}
                                  </h6>
                                  <img
                                    class="img-fluid mx-auto mb-3"
                                    src={`${ImageUrl}${item?.testimonialImage}`}
                                    alt=""
                                    style={{
                                      borderRadius: "50%",
                                      height: "100px",
                                      width: "100px",
                                    }}
                                  />
                                  <h5 class="m-0 text-white">
                                    {item?.clientName}
                                  </h5>
                                </div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#imageCarousel"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        style={{ backgroundColor: "black" }}
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#imageCarousel"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        style={{ backgroundColor: "black" }}
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TestimonialPart;
