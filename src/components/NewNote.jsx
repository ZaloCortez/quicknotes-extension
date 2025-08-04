import React from "react";

function NewNote({ noteKey, setNoteKey, noteValue, setNoteValue, handleAddNote }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddNote();
    };
    
    return(
        <section>
            <h6 className="light-text">New note here:</h6>
            <form onSubmit={handleSubmit} className="d-flex flex-column mt">
                <input 
                    type="text"
                    id="new-title"
                    name="new-title"
                    placeholder="Title"
                    value={noteKey}
                    onChange={(e) => setNoteKey(e.target.value)}
                />
                <textarea 
                    name="new-content" 
                    id="new-content"
                    placeholder="Content"
                    value={noteValue}
                    onChange={(e) => setNoteValue(e.target.value)}
                ></textarea>
                <button type="submit" className="mt">Save</button>
            </form>
        </section>
    );
}

export default NewNote;