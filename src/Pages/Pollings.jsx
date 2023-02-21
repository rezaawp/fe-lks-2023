import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../Hooks/auth";
import polling from "../Hooks/pollings";
import Layout from "../Layouts/Layout";
import { User } from "../Stores/SessionStore";

const Pollings = () => {
  const Session = useContext(User);
  const [pollings, setPollings] = useState([]);

  const getAllPoll = () => {
    polling
      .index()
      .then((res) => setPollings(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getAllPoll();
  }, []);

  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            {pollings?.map((polling, i) => {
              return (
                <div className="col-md-3 mb-4" key={i}>
                  <div className="card">
                    <div
                      align="center"
                      className="text-center card-header fs-6 d-flex fw-bold justify-content-center align-items-center"
                    >
                      <div className="container-fluid p-0">
                        <div className="row">
                          <img
                            className="rounded"
                            src={`http://localhost:8000/${polling?.thumbnail}`}
                            height="80"
                            alt=""
                            style={{ objectFit: "cover" }}
                          />{" "}
                        </div>
                        <div className="row">
                          <span className="text-center mt-2">
                            {polling?.question}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <small>
                        - {polling?.votes_count} orang sudah menjawab voting ini
                      </small>
                      <br />
                      <small>
                        - voting ini memiliki {polling?.choises_count} pilihan
                      </small>
                      <br />
                      <div className="container-fluid mt-2 d-flex justify-content-end p-0">
                        <Link
                          to={`/polling/${polling?.id}`}
                          className="fw-bold mt-2 btn btn-primary btn-sm"
                        >
                          VOTE
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Pollings;
