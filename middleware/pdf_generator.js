const PDFDocument = require('pdfkit-table');
const { Chart } = require('chart.js');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { createCanvas, loadImage } = require('canvas')

const ChartDataLabels = require('chartjs-plugin-datalabels');
let doc = null;

function checkAddNewPage() {
  same_page = true
  if (doc.y > 650) {
    x = doc.x;
    doc.addPage();
    doc.x = x;
    same_page = false
  } else {
    doc.moveDown();
  }
  return same_page
}

function capitalizeWords(inputString) {
  return inputString
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function generate_table(title, data, type = "") {
  title = title != "" ? capitalizeWords(title) : "";
  let order = ['key', 'summary', 'components', 'status'];
  size_columns = { //480
    'key': { 'size': 60, 'align': 'left', 'headerAlign': 'center' },
    'summary': { 'size': 240, 'align': 'left', 'headerAlign': 'center' },
    'components': { 'size': 120, 'align': 'left', 'headerAlign': 'center' },
    'status': { 'size': 60, 'align': 'left', 'headerAlign': 'center' }
  };
  if (type == 'bug') {
    order = ['key', 'summary', 'components', 'status', 'notes'];
    size_columns['components']['size'] -= 30
    size_columns['summary']['size'] -= 30
    size_columns['notes'] = { 'size': 60, 'align': 'left', 'headerAlign ': "right" }

  } else if (type == 'internal') {
    order = ['key', 'type', 'summary', 'components', 'status', 'notes']
    size_columns['summary']['size'] -= 50
    size_columns['components']['size'] -= 50
    size_columns['type'] = { 'size': 40, 'align': 'left', 'headerAlign ': 'center' }
    size_columns['notes'] = { 'size': 60, 'align': 'left', 'headerAlign ': "right" }
  } else if (type == 'components') {
    order = ['key', 'summary', 'hash', 'status']
    size_columns = {
      'key': { 'size': 60, 'align': 'left', 'headerAlign': 'center' },
      'summary': { 'size': 100, 'align': 'left', 'headerAlign': 'center' },
      'hash': { 'size': 260, 'align': 'left', 'headerAlign': 'center' },
      'status': { 'size': 60, 'align': 'left', 'headerAlign': 'center' }
    };
  } else if (type == 'documents') {
    order = ['user_guide', 'version', 'hash', 'status']
    size_columns = {
      'user_guide': { 'size': 90, 'align': 'left', 'headerAlign': 'center' },
      'version': { 'size': 130, 'align': 'left', 'headerAlign': 'center' },
      'hash': { 'size': 200, 'align': 'left', 'headerAlign': 'center' },
      'status': { 'size': 60, 'align': 'left', 'headerAlign': 'center' }
    };
  }

  data.sort((a, b) => {
    return order.indexOf(a.key) - order.indexOf(b.key);
  });

  if (type != 'components') { // Pasar componentes a listado si los datos lo contiene
    const dataConverted = data.map(item => {
      let componentsAsString = item.components;
      if (Array.isArray(item.components)) {
        componentsAsString = item.components.join(', ');
      }
      return { ...item, components: componentsAsString };
    });
    data = Object.values(dataConverted)
  } else {
    data = Object.values(data)
  }

  let headers = [];
  for (h of order) {
    let column = {
      label: capitalizeWords(h.toUpperCase()),
      headerAlign: size_columns[h]['headerAlign'],
      property: h,
      width: size_columns[h]['size']
    }
    headers.push(column)
  }
  let table = null;
  try {
    const rojo = ['story rejected', 'qa failed', 'qa rejected', 'prod rejected', 'discarded']
    const verde = ['qa verification success', 'done', 'qa verified', 'discarded', 'in production', 'deploy release pre', 'pre deployment']
    const azul = ['in progress', 'qa testing story', 'qa validation']

    const o_values = {
      verde: [],
      rojo: [],
      azul: [],
      resto: [],
    };

    Object.values(data).forEach(element => {
      const status = element.hasOwnProperty('status') ? element.status.toLowerCase() : "";
      if (rojo.includes(status)) {
        o_values.rojo.push(element);
      } else if (verde.includes(status)) {
        o_values.verde.push(element);
      } else if (azul.includes(status)) {
        o_values.azul.push(element);
      } else {
        o_values.resto.push(element);
      }
    });

    table = {
      title: title,
      headers: headers,
      datas: [...o_values.verde, ...o_values.rojo, ...o_values.azul, ...o_values.resto]
    };

    await doc.table(table, {
      padding: 2,
      width: doc.page.width - 70,
      prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
        rectRow.width = 480
        if (indexRow % 2 == 0) {
          doc.addBackground(rectRow, '#bfbfbf');
        }

        if (indexColumn == order.indexOf('status')) {
          const row_status = row.status.toLowerCase()
          if (rojo.includes(row_status)) {
            doc.addBackground(rectCell, "#ff0d00"); //rojo
          } else if (verde.includes(row_status)) {
            doc.addBackground(rectCell, "#1affa3"); //verde
          } else if (azul.includes(row_status)) {
            doc.addBackground(rectCell, "#1a79ff"); //azul
          }
        }
      },
    });

  } catch (e) {
    console.error("Generating Table");
    console.error(table)
    console.error(e)
  }
}

async function generate_basic_chart(title, data, width, height, backgroundColor = ['#434DC4']) {
  
  let max_value = 0;
  const integerValues = Object.values(data).map(value => {
    const val = parseInt(value, 10);
    max_value = max_value < val ? val : max_value;
    return val;
  });

  title = capitalizeWords(title);
  title = title.toLowerCase().replace(/ /g, "") == "qadeploymentcounter" ? "QA Deployment Counter" : title;

  const labels = Object.keys(data).map(value => {
    value = value.replace('-_-', '#');
    return capitalizeWords(value);
  });
  

  //const chart = new ChartJSNodeCanvas({ type: 'png', width: 800, height: 600 });
  
  const chartConfig = {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: title,
          data: integerValues,
          backgroundColor: backgroundColor
        },
      ],
    },
    plugins: [ChartDataLabels],
    options: {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: max_value + 1,
          stepSize: 1,
          ticks: {
            precision: 0,
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        datalabels: {
          anchor: "end",
          align: "end",
          color: 'black',
          labels: {
            title: {
              font: {
                weight: 'bold'
              }
            },
            value: {
              color: 'green'
            }
          },
          formatter: function (value, context) {
            return value != 0 ? value : null
          }
        }
      }
    }
  }
  const w = 900
  const h = 600
  const canvas = createCanvas(w, h)
  const ctx = canvas.getContext('2d')
  const chart = new Chart(ctx, chartConfig);
  
  //const buffer = await chart.renderToBuffer(chartConfig);
  const buffer = chart.toBase64Image();

  doc.image(buffer, 60, doc.y, { align: 'center', width, height });
}

async function generate_advance_chart(title, data, width, height, ordered_grafic_columns = [], backgroundColor = ['#434DC4', '#6973E8', '#A6A937']) {

  title = capitalizeWords(title);
  const labels = Object.keys(data);
  let datasets = []
  for (let label of labels) {
    ordered_grafic_columns = ordered_grafic_columns.length > 0 ? ordered_grafic_columns : Object.keys(data[label]);
    for (subkey of ordered_grafic_columns) {
      if (!datasets.includes(subkey)) {
        datasets.push(subkey)
      }
    }
  }

  var max_value = 0;
  const chartData = {
    labels: labels.map((label) => capitalizeWords(label)),
    datasets: datasets.map((dataset, index) => ({
      label: capitalizeWords(dataset),
      data: labels.map((label) => {
        const value = dataset in data[label] ? data[label][dataset] : 0;
        max_value = max_value < parseInt(value, 10) ? parseInt(value, 10) : max_value;
        return parseInt(value, 10);
      }),
      backgroundColor: backgroundColor[index]
    })),
  };

  //const chart = new ChartJSNodeCanvas({ type: 'png', width: 800, height: 600 });
  const chartConfig = {
    type: 'bar',
    data: chartData,
    plugins: [ChartDataLabels],
    options: {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: max_value + 1,
          stepSize: 1,
          ticks: {
            precision: 0,
          }
        }
      },
      plugins: {
        legend: {
          position: 'right'
        },
        datalabels: {
          anchor: "end",
          align: "end",
          color: 'black',
          labels: {
            title: {
              font: {
                weight: 'bold'
              }
            },
            value: {
              color: 'green'
            }
          },
          formatter: function (value, context) {
            return value != 0 ? value : null
          }
        }
      }
    }
  }
  const canvas = createCanvas(900, 600)
  const ctx = canvas.getContext('2d')
  const chart = new Chart(ctx, chartConfig);


  //const buffer = await chart.renderToBuffer(chartConfig);
  const buffer = chart.toBase64Image();

  doc.image(buffer, 60, doc.y, { align: 'center', width, height });
}

async function pdf_generator(jsonData, historic = true) {
  try {
    doc = null;
    doc = new PDFDocument({ size: 'A4' });

    const team_order = ['Commons', 'Team_Rocket', 'Nakama', 'Sputnik', 'Heyday', 'Smith', 'PE'];

    doc.fontSize(16).font('Times-Roman').text(jsonData.sprint, { align: 'center' });
    doc.moveDown(2)
    doc.fontSize(16).font('Times-Roman').text('Included in this Sprint', 40);
    doc.moveDown(1)
    doc.fontSize(14).font('Times-Roman').text('This Sprint incorporates the following new functionalities and solved issues', 60);

    const data_to_pdf = historic ? jsonData.qa_sprint_story : jsonData.qa_acceptance_results;

    doc.moveDown(2)
    doc.fontSize(16).font('Times-Roman').text('New functionalities', 40);
    doc.moveDown();
    let need_new_page = false
    for (let item of team_order) {
      if (Object.keys(data_to_pdf.story).includes(item)) {
        if (data_to_pdf.story[item].length !== 0) {
          await generate_table(item, data_to_pdf.story[item])
          need_new_page = checkAddNewPage()
        }
      }
    }


    if (need_new_page) doc.addPage();
    doc.fontSize(16).font('Times-Roman').text('Solved issues', 40);
    doc.moveDown();
    for (let item of team_order) {
      if (Object.keys(data_to_pdf.bugs).includes(item)) {
        if (data_to_pdf.bugs[item].length !== 0) {
          await generate_table(item, data_to_pdf.bugs[item], 'bug')
          need_new_page = checkAddNewPage()
        }
      }
    }

    //Internal Tasks
    if (historic) {
      if (need_new_page) doc.addPage();
      doc.fontSize(16).font('Times-Roman').text('Internal Tasks', 40, doc.y);
      doc.moveDown();
      for (let item of team_order) {
        if (Object.keys(data_to_pdf.internal_tasks).includes(item)) {
          if (data_to_pdf.internal_tasks[item].length !== 0) {
            await generate_table(item, data_to_pdf.internal_tasks[item], 'internal')
            need_new_page = checkAddNewPage()
          }
        }
      }
    }

    //Components review
    if (need_new_page) doc.addPage();
    doc.fontSize(16).font('Times-Roman').text('Components review', 40);
    doc.moveDown();
    for (let item of team_order) {
      if (Object.keys(data_to_pdf.components).includes(item)) {
        if (data_to_pdf.components[item].length !== 0) {
          await generate_table(item, data_to_pdf.components[item], 'components')
          need_new_page = checkAddNewPage()
        }
      }
    }

    try {
      //Documentation
      if (need_new_page) doc.addPage();
      doc.fontSize(16).font('Times-Roman').text('Documents review', 40);
      doc.moveDown();

      for (let item of team_order) {
        if (Object.keys(data_to_pdf.documentation).includes(item)) {
          var documents = []
          if (data_to_pdf.documentation[item].length !== 0) {
            Object.keys(data_to_pdf.documentation[item][0]['documentation']).forEach(itemKey => {
              data_to_pdf.documentation[item][0]['documentation'][itemKey]['status'] = data_to_pdf.documentation[item][0]['status']
              documents.push(data_to_pdf.documentation[item][0]['documentation'][itemKey])
            });
            await generate_table(item, documents, 'documents')
            need_new_page = checkAddNewPage()
          }
        }
      }
    } catch (error) {
      console.error("Error generating Documentation block");
      doc.moveDown();
    }

    //Charts
    //if (historic) {
    if (true) {
      // Graficas
      if (need_new_page) doc.addPage();
      doc.fontSize(16).font('Times-Roman').text('Sprint metrics', 40);
      doc.moveDown(2)
      //Simples
      doc.fontSize(16).font('Times-Roman').text('Sprint bug summary', 60);
      await generate_basic_chart("Sprint bug summary", jsonData.g_bug_type, 450, 250)
      doc.moveDown(2)
      doc.fontSize(16).font('Times-Roman').text('Bugs by component', 60);
      await generate_basic_chart("Bugs by component", jsonData.g_bug_project, 450, 250)

      //Avanzadas
      doc.addPage()
      doc.fontSize(16).font('Times-Roman').text('Bugs tipology by component', 60);
      await generate_advance_chart("Bugs tipology by component", jsonData.g_bug_typology_byComponent, 450, 250)

      //Avanzadas
      doc.moveDown(2)
      doc.fontSize(16).font('Times-Roman').text('Bugs resolution by component', 60);
      await generate_advance_chart("Bugs resolution by component", jsonData.g_bug_pro_status, 450, 250)

      doc.addPage()
      doc.fontSize(16).font('Times-Roman').text('Bug cause by FactoryTeam', 60);
      bg_char = ['#4837A9', '#A93745', '#A93785', '#3799A9', '#45A937', '#A6A937', '#434DC4']
      ordered_graph_labels = ['Commons', 'Team_Rocket', 'Nakama', 'Sputnik', 'Heyday', 'Smith', 'not_assigned'];
      await generate_advance_chart("Bug cause by FactoryTeam", jsonData.g_bug_team_cause, 450, 250, ordered_graph_labels, bg_char)

      //Counters
      if ("counters" in jsonData) {
        doc.addPage();
        for (let counter in jsonData.counters) {
          let title = capitalizeWords(counter.replace('-_-', "#"));
          title = title.toLowerCase().replace(/ /g, "") == "qadeploymentcounter" ? "QA Deployment Counter" : title
          doc.fontSize(16).font('Times-Roman').text(title, 60);
          await generate_basic_chart(title, jsonData.counters[counter], 450, 250, ['#434DC4'], false);
        }
      }
    }


    //Comentarios
    if (need_new_page) doc.addPage();
    doc.fontSize(16).font('Times-Roman').text('Comments', 60);
    doc.moveDown(2)
    doc.fontSize(13).font('Times-Roman').text(jsonData.comments)

    doc.end();

    return doc;
  } catch (e) {
    console.error(e)
  }
}

module.exports = pdf_generator;
