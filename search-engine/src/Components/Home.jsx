import { useState, useEffect } from "react";
import "../home.css";
import { Container, Table, Spinner, Alert } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import { FcPlus, FcAcceptDatabase } from "react-icons/fc";
import { addFavouriteAction, getJobsAction } from "../actions";
import { useSelector, useDispatch } from 'react-redux'


const Home = ({ history }) => {
 
  const jobs = useSelector(state => state.jobs.jobResults)
  const isError = useSelector(state => state.jobs.isError)
  const isLoading = useSelector(state => state.jobs.isLoading)
  const query = useSelector(state => state.search.query)
  const searchBy = useSelector(state => state.search.searchBy)

  const dispatch = useDispatch()

  // function handleRemove(id) {
  //   let newJobs = jobs.filter((item) => item._id !== id);
  //   setJobs(newJobs);
  //   console.log("NEW JOBS", newJobs);
  // }



  useEffect(() => {
    dispatch(getJobsAction());
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
                        dispatch(addFavouriteAction(j));
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
export default Home;
