import { useState, useEffect } from "react";
import "../home.css";
import { Container, Table } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  companies: state.favourites.companies,
})


const Favourites = ({companies, history}) => {

  useEffect(() => {
   
  }, []);

 
  return (
    <>
      <Container>
        <h3 className="mt-3 mb-3">Favourite Companies</h3>
         <div className="table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Company</th>
                <th>Title</th>
                <th style={{ width: "10rem" }}>Category</th>
                <th>Job Type</th>
                <th style={{ width: "6rem" }}>Publication Date</th>
                <th>Required Location</th>
                <th style={{ width: "9rem" }}>Salary</th>
              </tr>
            </thead>
            <tbody>
              {companies ? (
                companies.slice(0, 50).map((j, index) => (
                  <tr key={j._id}>
                    <td>{index + 1} </td>
                    <td onClick={() => history.push(`/company/${j.company_name}`)} style={{fontWeight:"700"}} >{j.company_name} </td>
                    <td>{j.title} </td>
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
export default connect(mapStateToProps)(Favourites);