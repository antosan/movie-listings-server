import React from "react";
import axios from "axios";
import CinemaForm from "./CinemaForm";
import CinemaTable from "./CinemaTable";

class CinemaAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            editing: false,
            formSubmitting: false,
            formSuccess: false,
            formError: false,
            validationErrors: {},
            cinemas: [],
            tableLoading: false,
            tableError: false
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditCinema = this.handleEditCinema.bind(this);
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
                });
            });
    }

    resetFormState() {
        this.setState({
            name: "",
            editing: false,
            formSubmitting: false,
            formSuccess: false,
            formError: false,
            validationErrors: {}
        })
    }

    handleNameChange(e) {
        e.preventDefault();

        this.setState({
            name: e.target.value
        });
    }

    handleEditCinema(cinema) {
        return () => {
            this.setState({ ...cinema, editing: true });
        };
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

        const { name, editing, id, cinemas } = this.state;

        if (this.isValid()) {
            if (editing) {
                // Existing record - update
                axios
                    .put(`/api/cinemas/${id}`, { name })
                    .then(response => {
                        this.resetFormState();

                        const index = cinemas.findIndex(c => c.id === id)

                        this.setState({
                            formSuccess: true,
                            cinemas: [
                                ...cinemas.slice(0, index),
                                { id, name },
                                ...cinemas.slice(index + 1)
                            ]
                        })
                    })
                    .catch(error => {
                        this.setState({
                            validationErrors: {},
                            formSubmitting: false,
                            formSuccess: false,
                            formError: true
                        })
                    });
            } else {
                // New record - insert
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
    }

    render() {
        const {
            name,
            editing,
            validationErrors,
            cinemas,
            tableLoading,
            tableError
        } = this.state;
        console.log(cinemas);

        return (
            <div className="mvls-cinema-admin">
                <h1>Cinemas</h1>
                <h3>{editing ? "Edit Cinema" : "Add Cinema"}</h3>
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
                    onEditCinema={this.handleEditCinema}
                />
            </div>
        );
    }
}

export default CinemaAdmin;
