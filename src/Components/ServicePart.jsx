import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "../Loader/PageLoader";
import { getAllCategories } from "../Api/Functions/SeviceCategory.api";
import { ImageUrl } from "../Api/AxiosInstance/ImageUrl";
import { Alert } from "@mui/material";

const ServicePart = () => {
  const {
    isLoading,
    isError,
    data: categoryData,
    error,
  } = useQuery({
    queryKey: ["all_service_category"],
    queryFn: getAllCategories,
  });
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
      {/* <!-- Categories Grid Section Begin --> */}
      <section class="categories-grid-section spad">
        <div class="container">
          <div className="about_heading">
            <h4>// Our Services //</h4>
            <h3 className="about_whychooseus">
              We do all these types of following services
            </h3>
          </div>

          <div class="row mt-5">
            {Array.isArray(categoryData) &&
              categoryData?.map((item) => (
                <>
                  <div class="col-lg-4">
                    <div class="cg-item">
                      <div class="cg-pic set-bg">
                        <img
                          src={`${ImageUrl}${item?.categoryImage}`}
                          alt="photo"
                          width="100%"
                        />
                      </div>
                      <div class="cg-text text-center">
                        <h5>
                          <a href="#">{item?.categoryName}</a>
                        </h5>

                        <Link to={`/service/category/${item?._id}`}>
                          <button className="mt-3 py-2 px-4 carousel_btn">
                            Explore
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </section>
      {/* <!-- Categories Grid Section End --> */}
    </>
  );
};

export default ServicePart;
