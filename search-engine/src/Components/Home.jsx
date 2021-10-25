import { useState, useEffect } from "react";
import "../home.css";
import { Container, Table, Spinner, Alert } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import { FcPlus, FcAcceptDatabase } from "react-icons/fc";
import { addFavouriteAction, getJobsAction } from "../actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  jobs: state.jobs.jobResults,
  isError: state.jobs.isError,
  isLoading: state.jobs.isLoading,
  query: state.search.query,
  searchBy: state.search.searchBy
});

const mapDispatchToProps = (dispatch) => ({
  addFavourite: (company) => {
    dispatch(addFavouriteAction(company));
  },
  getJobs: () => {
    dispatch(getJobsAction());
  },
});

const Home = ({
  jobs,
  query,
  searchBy,
  history,
  addFavourite,
  getJobs,
  isError,
  isLoading,
}) => {
  // const [jobs, setJobs] = useState([]);
   console.log("This is state Jobs", jobs);

  // function handleRemove(id) {
  //   let newJobs = jobs.filter((item) => item._id !== id);
  //   setJobs(newJobs);
  //   console.log("NEW JOBS", newJobs);
  // }

  useEffect(() => {
    getJobs();
  }, [query, searchBy]);
 console.log("QUERY", query)
 console.log("SEARCH BY", searchBy)

  return (
    <>
      {isError ? (
      <Alert variant="danger">Error fetching jobs in jobRessults</Alert>
      ) : isLoading ? (
      <Spinner variant="success" animation="border" />
      ) : (
      <Container>
        <h4 className="mt-4 mb-3 text-dark shaddow">Job Listings</h4>
        <div className="table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center align-middle">#</th>
                <th className="text-center align-middle">Title</th>
                <th className="text-center align-middle">Company</th>
                <th
                  className="text-center align-middle"
                  style={{ width: "10rem" }}
                >
                  Category
                </th>
                <th className="text-center align-middle">Job Type</th>
                <th
                  className="text-center align-middle"
                  style={{ width: "6rem" }}
                >
                  Publication Date
                </th>
                <th className="text-center align-middle">Required Location</th>
                <th
                  className="text-center align-middle"
                  style={{ width: "9rem" }}
                >
                  Salary
                </th>
                <th
                  className="text-center align-middle"
                  style={{ width: "2rem" }}
                  onClick={() => history.push(`/favourites`)}
                >
                  <FcAcceptDatabase className="favourites-icon" />
                </th>
              </tr>
            </thead>
            <tbody className="table-text">
              
               { jobs.slice(0, 50).map((j, index) => (
                  <tr key={j._id}>
                    <td className="text-center align-middle">{index + 1} </td>
                    <td className="text-center align-middle">{j.title} </td>
                    <td
                      className="text-center align-middle"
                      onClick={() => history.push(`/company/${j.company_name}`)}
                    >
                      {j.company_name}{" "}
                    </td>
                    <td className="text-center align-middle">{j.category}</td>
                    <td className="text-center align-middle">{j.job_type} </td>
                    <td className="text-center align-middle">
                      {" "}
                      {format(parseISO(j.publication_date), "MMM yyyy")}{" "}
                    </td>
                    <td className="text-center align-middle">
                      {j.candidate_required_location}{" "}
                    </td>
                    <td className="text-center align-middle">{j.salary} </td>
                    <td
                      className="text-center align-middle"
                      onClick={() => {
                        addFavourite(j);
                        console.log("THIS IS ADDED", j)
                        // handleRemove(j._id);
                      }}
                    >
                      <FcPlus className="favourites-icon" />
                    </td>
                  </tr>
                ))}
             
            </tbody>
          </Table>
        </div>
      </Container>
      )}
    </>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
