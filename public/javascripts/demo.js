document.addEventListener('DOMContentLoaded', () => {
   const option_sprint = document.getElementById('option-sprint');
   const card_stories = document.getElementById('histories-content');
   const card_bugs = document.getElementById('bugs-content');
   const card_internal_tasks = document.getElementById('internal-task-content');
   const card_charts = document.getElementById('charts-content');
   const button_export = document.getElementById('export-pdf');
   const button_close = document.getElementById('close-sprint');

   const loadData = async (opt) => {
       try {
           const response = await fetch(`/demo/id/${opt}`);
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

           //Internal Tasks
           card = manageInternalTask(data.qa_sprint_story.internal_tasks);
           card_internal_tasks.appendChild(card);

           //Charts
           card = manageCharts(data);
           card_charts.appendChild(card);

           button_export.removeAttribute('hidden');
           button_close.removeAttribute('hidden');

       } catch (error) {
           console.error('Error al cargar datos:', error);
       }
   };

   const closeSprint = async (opt, myModal) => {
     const textarea = document.getElementById("sprint-comments");
     const jira_key = document.getElementById("jira-ticket");
     const comments = textarea.value;
     const key = jira_key.value;
     const url = '/demo/close';
     const body_json = {'sprint_id': opt, 'comments': comments, 'key': key, 'data': JSON.stringify(data)};
   
     fetch(url, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(body_json),
     })
     .then((response) => {
       console.info('Request :',response);
       myModal.hide()
     }).catch((error) => {
       console.error('Error request:', error);
       myModal.hide()
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
       fetch('/demo/generate_pdf', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
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

     var myModal = new bootstrap.Modal(document.getElementById("static-modal"), {});
     myModal.show();
     
     modal_save.addEventListener('click', () => closeSprint(data.id, myModal))

     modal_close.addEventListener('click', function(event){
         event.preventDefault();
         myModal.hide()
     })
   })
})