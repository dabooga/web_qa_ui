document.addEventListener('DOMContentLoaded', () => {
    const option_sprint = document.getElementById('option-sprint');
    const card_stories = document.getElementById('histories-content');
    const card_bugs = document.getElementById('bugs-content');
    const card_internal_tasks = document.getElementById('internal-task-content');
    const card_charts = document.getElementById('charts-content');
    const card_components = document.getElementById('components-content');
    const card_release_notes = document.getElementById('release-note-content');
    const boton_panel_release_note = document.getElementById('boton-panel-release-note');
    const card_documents = document.getElementById('documents-review-content');
    const card_qabugs = document.getElementById('qabugs-content');
    const button_export = document.getElementById('export-pdf');
    const button_close = document.getElementById('close-sprint');

    const loadData = async (opt) => {
      try {
        const pop_up = new bootstrap.Modal(document.getElementById("loadingModal"), {});
        pop_up.show();      
        document.getElementById('spinner').style.display = 'block';
        const response = await fetch(`/sprint/id/${opt}`);
        document.getElementById('spinner').style.display = 'none';
        pop_up.hide();
        data = await response.json();
        var card = null;
        card_stories.innerHTML = '';
        card_bugs.innerHTML = '';
        card_charts.innerHTML = '';
        card_internal_tasks.innerHTML = '';

        //Stories
        card = manageStories(data.qa_sprint_story.story);
        card_stories.appendChild(card);

        //Bugs
        card = manageBugs(data.qa_sprint_story.bugs);
        card_bugs.appendChild(card);

        // QA Bugs
        card = manageBugs(data.qa_sprint_story.bugs_qa);
        card_qabugs.appendChild(card);

        //Internal Tasks
        card = manageInternalTask(data.qa_sprint_story.internal_tasks);
        card_internal_tasks.appendChild(card);

        //Components
        card = manageComponents(data.qa_sprint_story.components);
        card_components.appendChild(card);

        //Release Notes
        card = manageReleaseNotes(data.qa_acceptance_results.release_notes);
        //boton_panel_release_note.textContent = data.qa_acceptance_results.release_notes.name;
        card_release_notes.appendChild(card);

        //Documentation
        //card = manageDocumentation(data.qa_sprint_story.documentation);
        //card_documents.appendChild(card);

        //Charts
        card = manageCharts(data);
        card_charts.appendChild(card);

        button_export.removeAttribute('hidden');
        button_close.removeAttribute('hidden');

      } catch (error) {
        document.getElementById('spinner').style.display = 'none';
        console.error('Error getting data:', error);
      }
  };

    const closeSprint = async (opt, pop_up) => {
      pop_up.hide()
      const textarea = document.getElementById("sprint-comments");
      const jira_key = document.getElementById("jira-ticket");
      const comments = textarea.value;
      const key = jira_key.value;
      const url = '/sprint/close';
      const formData = new FormData();
      formData.append('sprint_id', opt);
      formData.append('comments', comments);
      formData.append('key', key);
      formData.append('data', JSON.stringify(data));

      fetch(url, {
        method: 'POST',
        body: formData
      }).then((response) => {
        console.info('Request :',response);
        window.location.href = '/acceptance_results'
      }).catch((error) => {
        console.error('Error request:', error);
        window.alert("Somenthing was wrong, check the response and try again")
      });
    }

    option_sprint.addEventListener('change', (event) => {
        const sprintSelected = event.target.value;
        if (sprintSelected != 0){
          loadData(sprintSelected);
         }
    });

    button_export.addEventListener('click', function (event) {
      event.preventDefault();
      const textarea = document.getElementById("sprint-comments");
      const comments = textarea.value;
      const formData = new FormData();
      formData.append('comments', comments);
      fetch('/sprint/generate_pdf', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            // La respuesta es un archivo PDF, descargalo
            response.blob().then((blob) => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = data.sprint + '.pdf';
              a.click();
              window.URL.revokeObjectURL(url);
            });
          } else {
            console.error('Error al generar el PDF');
          }
        })
        .catch((error) => {
          console.error('Error en la solicitud:', error);
        });
      });
    
    button_close.addEventListener('click', function(event){
      event.preventDefault();
      const modal_close = document.getElementById('modal-close');
      const modal_save = document.getElementById('modal-save');

      const pop_up = new bootstrap.Modal(document.getElementById("static-modal"), {});
      pop_up.show();
      
      modal_save.addEventListener('click', () => closeSprint(data.id, pop_up))

      modal_close.addEventListener('click', function(event){
          event.preventDefault();
          pop_up.hide()
      })
    })
})