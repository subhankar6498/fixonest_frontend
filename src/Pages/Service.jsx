import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../Components/SideBar";
import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "../Api/Functions/Services.api";
import PageLoader from "../Loader/PageLoader";
import { ImageUrl } from "../Api/AxiosInstance/ImageUrl";
import { Box, Pagination, styled, Alert } from "@mui/material";

// Styled Pagination component
const DarkPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPagination-ul": {
    gap: "8px",
  },
  "& .MuiPaginationItem-root": {
    color: "#fff",
    borderColor: "rgba(255, 255, 255, 0.23)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
    "&.Mui-selected": {
      backgroundColor: "#a81d1d",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#a03434",
      },
    },
  },
  "& .MuiPaginationItem-ellipsis": {
    color: "rgba(255, 255, 255, 0.7)",
  },
}));

const Service = () => {
  const [page, setPage] = useState(1);
  const perPage = 6;
  const {
    isLoading,
    isError,
    data: allservicedata,
    error,
  } = useQuery({
    queryKey: ["all_services", page],
    queryFn: () => getAllServices({ page, perPage }),
    keepPreviousData: true,
  });

  //for pagination
  const totalPages = allservicedata?.totalPages || 0;
  const handlePageChange = (e, value) => {
    setPage(value);
  };

  if (isLoading) {
    return <PageLoader />;
  }

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
      {!Array.isArray(allservicedata?.data) ||
      allservicedata?.data?.length === 0 ? (
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
          {/* <!-- Header Start --> */}
          <div class="container-fluid service-header">
            <div class="container">
              <div
                class="d-flex flex-column justify-content-center"
                style={{ minHeight: "300px" }}
              >
                <h3 class="display-4 text-white text-uppercase">
                  Our Services
                </h3>
                <div class="d-inline-flex text-white">
                  <p class="m-0 text-uppercase">
                    <Link class="text-white" to="/">
                      Home
                    </Link>
                  </p>
                  <i class="fa fa-angle-double-right pt-1 px-3"></i>
                  <p class="m-0 text-uppercase">Services</p>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Header End --> */}

          {/* <!-- Categories Grid Section Begin --> */}
          <section class="categories-grid-section spad">
            <div class="container">
              <div class="row">
                <div class="col-lg-8 p-0">
                  <div class="row">
                    {Array.isArray(allservicedata?.data) &&
                      allservicedata?.data?.map((item) => (
                        <div class="col-lg-6">
                          <div class="cg-item">
                            <div class="cg-pic set-bg">
                              <img
                                src={`${ImageUrl}/${item?.serviceImage}`}
                                alt="photo"
                                width="100%"
                                height="250px"
                              />
                            </div>
                            <div class="cg-text">
                              <h5>
                                <a href="#">{item?.title}</a>
                              </h5>

                              <p>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item?.description.slice(0, 50),
                                  }}
                                ></div>
                              </p>
                              <Link to={`/service/details/${item?._id}`}>
                                <button className="mt-3 py-2 px-4 carousel_btn">
                                  Learn More
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      py: 4,
                      width: "100%",
                    }}
                  >
                    <DarkPagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      size="large"
                      variant="outlined"
                      shape="rounded"
                      siblingCount={1}
                      boundaryCount={1}
                    />
                  </Box>
                </div>
                <div class="col-lg-4 col-md-7 p-0">
                  <SideBar />
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Categories Grid Section End --> */}
        </>
      )}
    </>
  );
};

export default Service;
