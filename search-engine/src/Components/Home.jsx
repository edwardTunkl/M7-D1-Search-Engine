import { useState, useEffect } from "react";
import "../home.css";
import { Container, Table } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import { FcOk } from "react-icons/fc";
import { addFavouriteAction } from "../actions";
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  addFavourite: (company) => {
    dispatch(addFavouriteAction(company))
  }
})


const Home = ({ search, searchBy, history, addFavourite }) => {

  const [jobs, setJobs] = useState([]);
  console.log("This is state Jobs", jobs);

  function handleRemove(id){
    let newJobs = jobs.filter((item) => item._id !== id)
    setJobs(newJobs)
    console.log("NEW JOBS", newJobs)
  }

  useEffect(() => {
    fetchJobs();
  }, [search]);


 

  const fetchJobs = async () => {
    try {
      let response = await fetch(
        `https://strive-jobs-api.herokuapp.com/jobs?${searchBy.toLowerCase()}=${search.toLowerCase()} `
      );
      if (response.ok) {
        let data = await response.json();
        console.log("THIS IS COMPANY", data);
        setJobs(data.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <h4 className="mt-4 mb-3">Job Listings</h4>
        <div className="table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Company</th>
                <th style={{ width: "10rem" }}>Category</th>
                <th>Job Type</th>
                <th style={{ width: "6rem" }}>Publication Date</th>
                <th>Required Location</th>
                <th style={{ width: "9rem" }}>Salary</th>
                <th style={{ width: "2rem" }} onClick={() => history.push(`/favourites`)}>Favourites</th>
              </tr>
            </thead>
            <tbody className="table-text">
              {jobs ? (
                jobs.slice(0, 50).map((j, index) => (
                  <tr key={j._id}>
                    <td>{index + 1} </td>
                    <td>{j.title} </td>
                    <td onClick={() => history.push(`/company/${j.company_name}`)}>{j.company_name} </td>
                    <td>{j.category}</td>
                    <td>{j.job_type} </td>
                    <td>
                      {" "}
                      {format(parseISO(j.publication_date), "MMM yyyy")}{" "}
                    </td>
                    <td>{j.candidate_required_location} </td>
                    <td>{j.salary} </td>
                    <td onClick={() => {
                      addFavourite(j)
                      handleRemove(j._id)
                      }}><FcOk className="favourites-icon"/></td>
                  </tr>
                ))
              ) : (
                <div></div>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
