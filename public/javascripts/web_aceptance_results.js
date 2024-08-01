const loadData = async (opt, name) => {
    try {
        const card_stories = document.getElementById('histories-content');
        const card_bugs = document.getElementById('bugs-content');
        const card_internal_tasks = document.getElementById('internal-task-content');
        const card_components = document.getElementById('components-content');
        const card_release_notes = document.getElementById('release-note-content');
        const boton_panel_release_note = document.getElementById('boton-panel-release-note');
        const card_documents = document.getElementById('documents-review-content');
        const card_comments = document.getElementById('comments-content');
        const card_charts = document.getElementById('charts-content');
        modal_title = document.getElementById('modal-title');
        
        modal_title.textContent = name;
        const response = await fetch(`/acceptance_results/id/${opt}`);
        const data = await response.json();

        var card = null;
        card_stories.innerHTML = '';
        card_bugs.innerHTML = '';
        card_internal_tasks.innerHTML = '';
        card_charts.innerHTML = '';

        // Stories
        card = manageStories(data.qa_acceptance_results.story);
        card_stories.appendChild(card);

        // Bugs
        card = manageBugs(data.qa_acceptance_results.bugs);
        card_bugs.appendChild(card);

        //Internal Tasks
        card = manageInternalTask(data.qa_acceptance_results.internal_tasks);
        card_internal_tasks.appendChild(card);

        //Components
        card = manageComponents(data.qa_acceptance_results.components);
        card_components.appendChild(card);

        //Release Notes
        card = manageReleaseNotes(data.qa_acceptance_results.release_notes);
        //boton_panel_release_note.textContent = data.qa_acceptance_results.release_notes.name;
        card_release_notes.appendChild(card);

        //Documents
        //card = manageDocumentation(data.qa_acceptance_results.documentation);
        //card_documents.appendChild(card);

        // Charts
        card = manageCharts(data);
        card_charts.appendChild(card);

        // Comments
        card_comments.innerHTML = ''
        const content_comments = document.createElement('div');
        content_comments.classList.add("row");
        const col_comments = document.createElement('div');
        col_comments.classList.add("col");
        col_comments.textContent = data.comments;
        content_comments.appendChild(col_comments);
        card_comments.appendChild(content_comments);

    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
};

function donwload_sprint(idSprint) {
    fetch('/acceptance_results/generate_pdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'id': idSprint }),
    }).then(async (response) => {
        if (response.ok) {
            const contentDisposition = response.headers.get('content-disposition');
            const match = contentDisposition.match(/filename= (.+)$/);
            const filename = match ? match[1] : 'output.pdf';
            response.blob().then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);
            });
        } else {
            console.error('Error al generar el PDF');
        }
    }).catch((error) => {
        console.error('Error en la solicitud:', error);
    });
}

async function open_sprint(idSprint, nameSprint) {
    await loadData(idSprint, nameSprint);
    var myModal = new bootstrap.Modal(document.getElementById("static-modal"), {});
    myModal.show();
    const pdf_modal =  document.getElementById('pdf-modal');
    pdf_modal.addEventListener('click', () => donwload_sprint(idSprint))
}

async function delete_sprint(idSprint, nameSprint) {
    const option = confirm(`Do you want to delete ${nameSprint}?`);
    if (option) {
        try {
            const response = await fetch(`/acceptance_results/delete/${idSprint}`, { method: 'DELETE' });
            if (response.ok) {
                window.location.href = '/acceptance_results';
            } 
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }
}