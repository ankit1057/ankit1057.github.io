document.addEventListener('DOMContentLoaded', () => {
    const projectCarousel = document.getElementById('project-carousel');
    const prevButton = document.getElementById('prev-project');
    const nextButton = document.getElementById('next-project');
    let projects = [];
    let currentIndex = 0;

    const fetchProjects = async () => {
        try {
            const response = await fetch('https://api.github.com/users/ankit1057/repos');
            const data = await response.json();
            // Filter out forks and include only relevant projects
            projects = data.filter(repo => !repo.fork && !repo.archived && !repo.disabled);
            displayProjects();
        } catch (error) {
            console.error('Error fetching projects:', error);
            projectCarousel.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
        }
    };

    const displayProjects = () => {
        projectCarousel.innerHTML = '';
        if (projects.length === 0) {
            projectCarousel.innerHTML = '<p>No public projects found.</p>';
            return;
        }

        // Display up to 3 projects at a time for the carousel effect
        for (let i = 0; i < Math.min(projects.length, 3); i++) {
            const project = projects[(currentIndex + i) % projects.length];
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description || 'No description provided.'}</p>
                <p><strong>Language:</strong> ${project.language || 'N/A'}</p>
                <a href="${project.html_url}" target="_blank">View on GitHub</a>
            `;
            projectCarousel.appendChild(projectCard);
        }
        updateButtonVisibility();
    };

    const showNextProject = () => {
        currentIndex = (currentIndex + 1) % projects.length;
        displayProjects();
    };

    const showPrevProject = () => {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        displayProjects();
    };

    const updateButtonVisibility = () => {
        // Buttons are always visible for a carousel, but their effect changes
        prevButton.style.display = projects.length > 1 ? 'inline-block' : 'none';
        nextButton.style.display = projects.length > 1 ? 'inline-block' : 'none';
    };

    prevButton.addEventListener('click', showPrevProject);
    nextButton.addEventListener('click', showNextProject);

    fetchProjects();
});
