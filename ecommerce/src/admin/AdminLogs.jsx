import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  fetchAdminLogsApi } from '../api/api';
import NavBar from '../components/NavBar';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
     const fetchLogs=async()=>{
        try{
        const response=await fetchAdminLogsApi();
        if(response.status===200){
            setLogs(response.data);
        }
        }catch(error){
        
        }
     }

  fetchLogs();

  }, []);

  return (
    <div className="container-fluid mt-4">
      <NavBar></NavBar>
      <h4 style={{marginTop:"120px"}}>Admin Logs</h4>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Request Method</th>
            <th>Request URL</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{log.user}</td>
                <td>{log.request_method}</td>
                <td>{log.request_url}</td>
                <td>{new Date(log.created_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No logs available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLogs;
