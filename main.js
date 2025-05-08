function searchContacts() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('results');
    const loadingDiv = document.getElementById('loading');
    
    // Show loading indicator
    resultsDiv.innerHTML = '';
    loadingDiv.classList.remove('d-none');
    
    // Fetch data from the JSON endpoint
    fetch('https://advinculacarlo.github.io/WebSys-ACT4/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            loadingDiv.classList.add('d-none');
            
            if (!searchTerm) {
                resultsDiv.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-info-circle"></i>
                        <h5>Please enter a title to search</h5>
                    </div>
                `;
                return;
            }
            
            // Convert single object to array for consistent processing
            const books = Array.isArray(data) ? data : [data];
            
            const filteredContacts = books.filter(book => 
                book.id.toLowerCase().includes(searchTerm)
            );
            
            displayResults(filteredContacts);
        })
        .catch(error => {
            loadingDiv.classList.add('d-none');
            resultsDiv.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-exclamation-triangle text-danger"></i>
                    <h5>Error loading</h5>
                    <p class="text-muted">${error.message}</p>
                </div>
            `;
            console.error('Error fetching data:', error);
        });
}

function displayResults(books) {
    const resultsDiv = document.getElementById('results');
    
    if (books.length === 0) {
        resultsDiv.innerHTML = `
            <div class="no-results">
                <i class="fas fa-user-slash"></i>
                <h5>No Book found</h5>
                <p class="text-muted">Try a different search term</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <table class="table contact-table table-hover">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    books.forEach(book => {
        html += `
            <tr>
                <td>
                    <strong>${book.id || 'N/A'}</strong>
                </td>
                <td>
                    ${book.title ? `<div><i class="me-2 text-primary"></i> ${book.title}</div>` : ''}
                </td>
                <td>
                    ${book.author ? `<div><i class="me-2 text-primary"></i> ${book.author}</div>` : ''}
                </td>
                <td>
                    ${book.genre ? `<div><i class="me-2 text-primary"></i> ${book.genre}</div>` : ''}
                </td>
                <td>
                    ${book.available ? `<div><i class="me-2 text-primary"></i> ${book.available}</div>` : ''}
                </td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    resultsDiv.innerHTML = html;
}