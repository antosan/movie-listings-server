import React from "react";
import axios from "axios";
import CinemaForm from "./CinemaForm";
import CinemaTable from "./CinemaTable";

class CinemaAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            validationErrors: {},
            cinemas: [],
            tableLoading: false,
            tableError: false
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchCinemas();
    }

    fetchCinemas() {
        this.setState({
            tableLoading: true,
            tableError: false
        });

        axios
            .get("/api/cinemas")
            .then(response => {
                this.setState({
                    cinemas: response.data,
                    tableLoading: false,
                    tableError: false
                });
            })
            .catch(error => {
                this.setState({
                    cinemas: [],
                    tableLoading: false,
                    tableError: true
                })
            });
    }

    handleNameChange(e) {
        e.preventDefault();

        this.setState({
            name: e.target.value
        });
    }

    validateFormInput(data) {
        const validationErrors = {};
        const { name } = data;

        if (!name) {
            validationErrors.name = "This field is required";
        }

        return {
            validationErrors,
            isValid: Object.keys(validationErrors).length === 0
        };
    }

    isValid() {
        const { validationErrors, isValid } = this.validateFormInput(
            this.state
        );

        if (!isValid) {
            this.setState({ validationErrors });
        }

        return isValid;
    }

    handleSubmit(e) {
        e.preventDefault();

        const { name } = this.state;

        if (this.isValid()) {
            axios
                .post("/api/cinemas", { name })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    render() {
        const { name, validationErrors, cinemas, tableLoading, tableError } = this.state;

        return (
            <div className="mvls-cinema-admin">
                <h1>Cinemas</h1>
                <h3>Add Cinema</h3>
                <CinemaForm
                    name={name}
                    validationErrors={validationErrors}
                    handleNameChange={this.handleNameChange}
                    handleSubmit={this.handleSubmit}
                />
                <CinemaTable
                    cinemas={cinemas}
                    tableLoading={tableLoading}
                    tableError={tableError}
                />
            </div>
        );
    }
}

export default CinemaAdmin;
