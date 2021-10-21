import { useState, useEffect } from "react";
import "../home.css";
import { Container, Table } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import { connect } from 'react-redux'
import { FcCancel, FcDeleteDatabase } from "react-icons/fc";
import { removeFavouriteAction } from "../actions";


const mapStateToProps = (state) => ({
  companies: state.favourites.companies,
})

const mapDispatchToProps = (dispatch) => ({
  removeFavourite: (index) => {
    dispatch(removeFavouriteAction(index))
  }
})

const Favourites = ({companies, removeFavourite, history}) => {

  useEffect(() => {
   
  }, []);

 
  return (
    <>
      <Container>
        <h4 className="mt-4 mb-3 text-dark">Favourite Companies</h4>
         <div className="table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center align-middle">#</th>
                <th className="text-center align-middle">Company</th>
                <th className="text-center align-middle">Title</th>
                <th className="text-center align-middle" style={{ width: "10rem" }}>Category</th>
                <th className="text-center align-middle">Job Type</th>
                <th className="text-center align-middle" style={{ width: "6rem" }}>Publication Date</th>
                <th className="text-center align-middle" >Required Location</th>
                <th className="text-center align-middle" style={{ width: "2rem" }}><FcDeleteDatabase className="favourites-icon"/></th>
              </tr>
            </thead>
            <tbody className="table-text">
              {companies ? (
                companies.slice(0, 50).map((j, index) => (
                  <tr key={j._id}>
                    <td className="text-center align-middle">{index + 1} </td>
                    <td className="text-center align-middle" onClick={() => history.push(`/company/${j.company_name}`)} style={{fontWeight:"700"}} >{j.company_name} </td>
                    <td className="text-center align-middle">{j.title} </td>
                    <td className="text-center align-middle">{j.category}</td>
                    <td className="text-center align-middle">{j.job_type} </td>
                    <td className="text-center align-middle">
                      {" "}
                      {format(parseISO(j.publication_date), "MMM yyyy")}{" "}
                    </td>
                    <td className="text-center align-middle">{j.candidate_required_location} </td>
                    <td className="text-center align-middle" onClick={() => {
                      removeFavourite(index)
                      }}
                      > <FcCancel className="favourites-icon"/></td>
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
export default connect(mapStateToProps, mapDispatchToProps)(Favourites);