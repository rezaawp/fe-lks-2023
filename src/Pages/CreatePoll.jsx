import { useEffect, useState } from "react";
import { LineWave } from "react-loader-spinner";
import polling from "../Hooks/pollings";
import Layout from "../Layouts/Layout";

const CreatePoll = () => {
  const [loading, setLoading] = useState(false);
  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = () => {
    const id = arr.length + 1;
    setArr((s) => {
      return [
        ...s,
        {
          type: "text",
          id,
          value: "",
        },
      ];
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  const [dataPoll, setDataPoll] = useState({
    question: "",
    thumbnail: "",
    choises: "",
    deadline: "",
  });

  const storePolling = async () => {
    try {
      setLoading(true);
      const choises = arr.map((item, i) => {
        return item.value;
      });

      const result = await polling.store({
        ...dataPoll,
        choises: JSON.stringify(choises),
      });

      if (result.status) {
        setLoading(false);
        setTimeout(() => {
          alert("sukses membuat polling");
        }, 100);
      } else if (!result.status) {
        alert("gagal membuat polling");
        console.log(result);
      }
    } catch (e) {
      console.log({ e });
    }
  };

  const deleteInputChoise = async (e) => {
    const id = e.target.value - 1;

    let arrUpdate = arr;
    await arrUpdate.splice(id, 1);
    setArr(arrUpdate);
    setArr((s) => {
      return [...s];
    });
  };

  return (
    <Layout>
      <div className="container-fluid d-flex align-item-center justify-content-center">
        <div className="card mb-5" style={{ width: "30rem" }}>
          <div className="card-header text-center fw-bold fs-4">
            Create Polling Here
          </div>

          <div className="card-body">
            <label htmlFor="">Question : </label>
            <input
              className="form-control"
              type="text"
              placeholder="Question"
              onChange={(e) =>
                setDataPoll({ ...dataPoll, question: e.target.value })
              }
            />{" "}
            <label htmlFor="" className="mt-2 mb-2">
              Choises :{" "}
            </label>
            <div>
              {arr.map((item, i) => {
                return (
                  <div className="input-group mb-3" key={i}>
                    <input
                      autoComplete="off"
                      className="form-control"
                      onChange={handleChange}
                      value={item.value}
                      id={i}
                      type={item.type}
                      size="40"
                    />{" "}
                    <button
                      className="btn btn-danger btn-sm input-group-text"
                      style={{
                        height: "1px !important",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                      onClick={deleteInputChoise}
                      value={++i}
                    >
                      X
                    </button>
                  </div>
                );
              })}
              <button
                onClick={addInput}
                className="btn btn-primary btn-sm mb-2"
              >
                Add Choise (+)
              </button>
            </div>
            <label htmlFor="">Thumbnail : </label> <br />
            <input
              type="file"
              placeholder="File"
              className="form-control"
              onChange={(e) =>
                setDataPoll({ ...dataPoll, thumbnail: e.target.files[0] })
              }
            />{" "}
            <label htmlFor="">Deadline : </label> <br />
            <input
              type="datetime-local"
              placeholder="Deadline"
              className="form-control"
              onChange={(e) =>
                setDataPoll({ ...dataPoll, deadline: e.target.value })
              }
            />{" "}
            <br />
            <div className="container-flluid d-flex p-0">
              <button className="btn btn-primary" onClick={storePolling}>
                CREATE
              </button>
              {loading && (
                <LineWave
                  height="30"
                  width="50"
                  color="#4fa94d"
                  ariaLabel="line-wave"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  firstLineColor=""
                  middleLineColor=""
                  lastLineColor=""
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePoll;
