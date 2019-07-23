import React from "react";
import axios from "axios";
import CinemaForm from "./CinemaForm";
import CinemaTable from "./CinemaTable";

class CinemaAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(e) {
        e.preventDefault();

        this.setState({
            name: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { name } = this.state;

        axios
            .post("/api/cinemas", { name })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        const { name } = this.state;

        return (
            <div className="mvls-cinema-admin">
                <h1>Cinemas</h1>
                <h3>Add Cinema</h3>
                <CinemaForm
                    name={name}
                    handleNameChange={this.handleNameChange}
                    handleSubmit={this.handleSubmit}
                />
                <CinemaTable />
            </div>
        );
    }
}

export default CinemaAdmin;
