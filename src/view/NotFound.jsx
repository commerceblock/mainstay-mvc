import React from 'react';
import { Button } from 'reactstrap'
import history from './app.history';


const NotFound = ({ message }) => (
    <div className="col-md-12">
        <div className="alert alert-danger ">
            {message}
        </div>
        <div className="text-center">
            <Button onClick={() => history.goBack()}>&larr; Go Back</Button>
        </div>
    </div>
);


export default NotFound
