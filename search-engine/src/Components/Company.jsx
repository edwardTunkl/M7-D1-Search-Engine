import { useState, useEffect } from "react";
import "../home.css";
import { Container, Table } from "react-bootstrap";
import { format, parseISO } from "date-fns";
const Company = ({ search, searchBy, history , match}) => {
  const [company, setCompany] = useState([]);
  console.log("COMPANY STATE", company);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      let response = await fetch(
        ` https://strive-jobs-api.herokuapp.com/jobs?company_name=${match.params.id}`
        );
      if (response.ok) {
        let data = await response.json();
        console.log("THIS IS DATA", data);
        setCompany(data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="vh-100">
        <h4 className="mt-4 mb-3 shaddow">Company Details</h4>
         <div className="table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center align-middle">#</th>
                <th className="text-center align-middle">Title</th>
                <th className="text-center align-middle">Company</th>
                <th className="text-center align-middle" style={{ width: "10rem" }}>Category</th>
                <th className="text-center align-middle">Job Type</th>
                <th className="text-center align-middle" style={{ width: "6rem" }}>Publication Date</th>
                <th className="text-center align-middle">Required Location</th>
                
              </tr>
            </thead>
            <tbody className="table-text">
              {company.data ? (
                company.data.slice(0, 50).map((j, index) => (
                  <tr key={j._id}>
                    <td className="text-center align-middle">{index + 1} </td>
                    <td className="text-center align-middle">{j.title} </td>
                    <td className="text-center align-middle" onClick={() => history.push(`/company/${j.company_name}`)}>{j.company_name} </td>
                    <td className="text-center align-middle">{j.category}</td>
                    <td className="text-center align-middle">{j.job_type} </td>
                    <td className="text-center align-middle">
                      {" "}
                      {format(parseISO(j.publication_date), "MMM yyyy")}{" "}
                    </td>
                    <td className="text-center align-middle">{j.candidate_required_location} </td>
                    
                  </tr>
                ))
              ) : (
                <div></div>
              )}
            </tbody>
          </Table>
        </div> 
        {/* <div>
        {company.data ? (
       company.data.slice(0, 50).map((c) =>(
         <html>{c.description} </html>
       ))) : (
        <div></div>
       )}
       </div> */}
      </Container>
    </>
  );
};
export default Company;
