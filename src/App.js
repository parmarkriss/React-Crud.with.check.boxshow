import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [input, setInput] = useState({
    name: '',
    email: ''
  })

  const [record, setRecord] = useState([]);
  const [editid, setEditid] = useState("");
  const [checkedRows, setCheckedRows] = useState({});

  const handleCheckBoxChange = (id) => {
    setCheckedRows((prevCheckedRows) => ({
      ...prevCheckedRows,
      [id]: !prevCheckedRows[id],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput({
      ...input, [name]: value
    })
  }

  const handleSubmit = () => {
    const { name, email } = input
    if (editid) {
      let ans = record.map((item) => {
        if (item.id === editid) {
          return {
            ...item,
            name: input.name,
            email: input.email
          }
          return item;
        }
      })
      setRecord(ans);
      localStorage.setItem('crud', JSON.stringify(ans));
      setEditid("");
    } else {
      let obj = {
        id: Math.floor(Math.random() * 10000),
        name: input.name,
        email: input.email
      }
      let data = [...record, obj];
      setRecord(data);
      localStorage.setItem('crud', JSON.stringify(data));
    }
    setInput({
      name: '',
      email: ''
    })
  }

  const deleteRecord = (id) => {
    let ans = record.filter((v) => {
      return v.id !== id;
    })
    setRecord(ans);
    localStorage.setItem('crud', JSON.stringify(ans));
    alert("Record delete");
  }

  const editRecord = (id) => {
    let ans = record.filter((v) => {
      return v.id == id
    })
    setEditid(id);
    setInput(ans[0]);
  }

  

  useEffect(() => {
    let alldata = JSON.parse(localStorage.getItem('crud'));
    if (alldata === null) {
      setRecord([]);
    } else {
      setRecord(alldata);
    }
  }, [])


 


  return (
    <center>
      <table border={1}>
        <tr>
          <td>Name:- </td>
          <td><input type='text' name='name' onChange={handleChange} value={input.name}></input></td>
        </tr>
        <tr>
          <td>Email:- </td>
          <td><input type='text' name='email' onChange={handleChange} value={input.email}></input></td>
        </tr>
        <tr>
          <td></td>
          <td>
            {
              (editid) ? (<input type='button' onClick={() => handleSubmit()} value="Edit" />) : (<input type='button' onClick={() => handleSubmit()} value="Submit" />)
            }
          </td>
        </tr>
      </table><br></br>

      <table border={1}>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Email</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {
            record.map((val) => {
              const { name, email, id } = val;
              return (
                <>
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>
                    <input
                    type="checkbox"
                    checked={checkedRows[val.id] || false}
                    onChange={() => handleCheckBoxChange(val.id)}
                  />
                  {checkedRows[val.id] && (
                    <>
                      <button onClick={() => deleteRecord(val.id)}>Delete</button>
                      <button onClick={() => editRecord(val.id)}>Edit</button>
                    </>
                  )}
                    </td>
                  </tr>
                </>
              );
            })
          }
        </tbody>

      </table>
    </center>
  );
}

export default App;
