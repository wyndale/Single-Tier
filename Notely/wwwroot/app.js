async function loadNotes() {
    try {
        const response = await fetch('https://localhost:5001/api/notes');
        if (!response.ok) throw new Error('Network response was not ok');

        const notes = await response.json();
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '';

        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note-item';
            noteElement.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <button onclick="deleteNote(${note.id})">Delete</button>
                <button onclick="startEdit(${note.id})">Edit</button>
            `;
            notesList.appendChild(noteElement);
        });
    } catch (error) {
        console.error('Error loading notes:', error);
    }
}

document.getElementById('noteForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const note = {
        title: document.getElementById('title').value,
        content: document.getElementById('content').value
    };

    try {
        const response = await fetch('https://localhost:5001/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        });

        if (!response.ok) throw new Error('Failed to add note');

        document.getElementById('noteForm').reset();
        loadNotes();
    } catch (error) {
        console.error('Error adding note:', error);
    }
});

// Add these new functions:
async function startEdit(id) {
    try {
        const response = await fetch(`https://localhost:5001/api/notes/${id}`);
        if (!response.ok) throw new Error('Failed to fetch note');

        const note = await response.json();
        document.querySelector('.edit-section').style.display = 'block';
        document.getElementById('editId').value = note.id;
        document.getElementById('editTitle').value = note.title;
        document.getElementById('editContent').value = note.content;
    } catch (error) {
        console.error('Error starting edit:', error);
    }
}

async function cancelEdit() {
    document.querySelector('.edit-section').style.display = 'none';
    document.getElementById('editForm').reset();
}

document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedNote = {
        id: parseInt(document.getElementById('editId').value),
        title: document.getElementById('editTitle').value,
        content: document.getElementById('editContent').value
    };

    try {
        const response = await fetch(`https://localhost:5001/api/notes/${updatedNote.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedNote),
        });

        if (!response.ok) throw new Error('Failed to update note');

        cancelEdit();
        loadNotes();
    } catch (error) {
        console.error('Error updating note:', error);
    }
});

// Add delete function
async function deleteNote(id) {
    try {
        const response = await fetch(`https://localhost:5001/api/notes/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete note');
        loadNotes();
    } catch (error) {
        console.error('Error deleting note:', error);
    }
}

// Load notes when page loads
window.onload = loadNotes;