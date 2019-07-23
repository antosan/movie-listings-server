import React from "react";

function CinemaForm({ name, handleNameChange, handleSubmit }) {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                />
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
            </form>
        </div>
    );
}

export default CinemaForm;
