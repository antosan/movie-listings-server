import React from "react";

function CinemaForm({
    name,
    validationErrors,
    handleNameChange,
    handleSubmit
}) {
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
                {validationErrors.name && (
                    <span className="mvls-form-input-error">
                        {validationErrors.name}
                    </span>
                )}
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
            </form>
        </div>
    );
}

export default CinemaForm;
