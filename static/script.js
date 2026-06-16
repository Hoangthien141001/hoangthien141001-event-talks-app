document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refresh-btn');
    const refreshIcon = document.getElementById('refresh-icon');
    const notesContainer = document.getElementById('notes-container');
    const loaderContainer = document.getElementById('loader-container');

    const fetchNotes = async () => {
        // Show loading state
        refreshIcon.classList.add('spin');
        
        if (notesContainer.children.length === 0 || notesContainer.querySelector('.error')) {
            notesContainer.innerHTML = '';
            notesContainer.appendChild(loaderContainer);
            loaderContainer.style.display = 'flex';
        }

        try {
            const response = await fetch('/api/notes');
            const result = await response.json();

            if (result.status === 'success') {
                renderNotes(result.data);
            } else {
                notesContainer.innerHTML = `<div class="error"><i class="fas fa-exclamation-triangle"></i> Error: ${result.message}</div>`;
            }
        } catch (error) {
            notesContainer.innerHTML = `<div class="error"><i class="fas fa-wifi"></i> Failed to fetch notes: ${error.message}. Please try again.</div>`;
        } finally {
            refreshIcon.classList.remove('spin');
        }
    };

    const renderNotes = (notes) => {
        notesContainer.innerHTML = ''; // Clear container
        
        if (notes.length === 0) {
            notesContainer.innerHTML = `<div class="note-card" style="text-align:center;">No release notes found.</div>`;
            return;
        }

        notes.forEach((note, index) => {
            const card = document.createElement('div');
            card.className = 'note-card';
            // Stagger animations
            card.style.animationDelay = `${index * 0.1}s`;

            const date = new Date(note.updated).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            // Extract plain text for the tweet if content contains HTML
            let plainContent = note.title;
            // Create tweet URL
            const tweetText = encodeURIComponent(`BigQuery Update: ${plainContent}\n\nRead more: ${note.link}`);
            const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

            // Sometimes atom content has HTML directly inside
            card.innerHTML = `
                <div class="note-header">
                    <div class="note-title">${note.title}</div>
                    <div class="note-date">${date}</div>
                </div>
                <div class="note-content">${note.content}</div>
                <div class="note-actions">
                    <a href="${tweetUrl}" target="_blank" rel="noopener noreferrer" class="tweet-btn">
                        <i class="fab fa-twitter"></i> Tweet Update
                    </a>
                </div>
            `;

            notesContainer.appendChild(card);
        });
    };

    // Initial fetch
    fetchNotes();

    // Refresh listener
    refreshBtn.addEventListener('click', fetchNotes);
});
