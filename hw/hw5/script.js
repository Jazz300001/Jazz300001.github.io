document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const usernameInput = document.getElementById('username');
    const gallery = document.getElementById('gallery');
  
  
    searchBtn.addEventListener('click', () => {
      const username = usernameInput.value || 'Jazz300001';
      gallery.innerHTML = ''; 
      fetchRepos(username);
    });
  
    function fetchRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
          repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.classList.add('repo-card');
            repoCard.innerHTML = `
              <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
              <p>${repo.description || 'No description available'}</p>
              <p>Created: ${new Date(repo.created_at).toLocaleDateString()}</p>
              <p>Updated: ${new Date(repo.updated_at).toLocaleDateString()}</p>
              <p>Watchers: ${repo.watchers_count}</p>
              <p>Languages: <span class="languages" data-url="${repo.languages_url}">Loading...</span></p>
            `;
            gallery.appendChild(repoCard);
  
            fetch(repo.languages_url)
              .then(response => response.json())
              .then(languages => {
                const langSpan = repoCard.querySelector('.languages');
                const langList = Object.keys(languages).join(', ') || 'No languages listed';
                langSpan.textContent = langList;
              });
          });
        })
        .catch(error => {
          gallery.innerHTML = `<p>Error fetching repositories for user: ${username}</p>`;
          console.error('Error fetching repos:', error);
        });
    }
  });
  