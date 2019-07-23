import React from "react";

function CinemaForm({
    name,
    validationErrors,
    handleNameChange,
    handleSubmit
}) {
    return (
        <form className="mvls-form" onSubmit={handleSubmit}>
            <div className="mvls-form-row">
                <div className="mvls-form-col">
                    <label htmlFor="name">Name</label>
                    <div className="mvls-form-input-group">
                        <input
                            type="text"
                            name="name"
                            className={validationErrors.name ? "has-error" : ""}
                            value={name}
                            onChange={handleNameChange}
                        />
                        {validationErrors.name && (
                            <span className="mvls-form-input-error">
                                {validationErrors.name}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <button className="mvls-btn mvls-btn-form" type="submit">
                Submit
            </button>
            <button className="mvls-btn mvls-btn-form" type="reset">
                Reset
            </button>
        </form>
    );
}

export default CinemaForm;
