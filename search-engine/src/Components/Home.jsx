import { useState, useEffect } from "react";
import "../home.css";
import { Container, Table } from "react-bootstrap";
import { format, parseISO } from "date-fns";
const Home = ({ search, searchBy, history }) => {
  const [jobs, setJobs] = useState([]);
  console.log("This is state Jobs", jobs.data);

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
        setJobs(data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <h3 className="mt-3 mb-3">Job Listings</h3>
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
              </tr>
            </thead>
            <tbody>
              {jobs.data ? (
                jobs.data.slice(0, 50).map((j, index) => (
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
export default Home;
