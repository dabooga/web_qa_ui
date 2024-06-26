const team_order = ['Commons', 'Team_Rocket', 'Nakama', 'Sputnik', 'Heyday', 'Smith', 'PE', 'not_assigned'];

function capitalizeWords(inputString) {
    return inputString
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function apply_order(dataset) {
    let lines = Object({ 'verde': [], 'rojo': [], 'azul': [], 'resto': [] });
    rojo = ['story rejected', 'qa failed', 'qa rejected', 'prod rejected', 'discarded']
    verde = ['qa verification success', 'done', 'qa verified', 'discarded', 'in production', 'deploy release pre']
    azul = ['in progress', 'qa testing story', 'qa validation']
    dataset.forEach((element) => {
        if (rojo.includes(element.status.toLowerCase())) {
            lines.rojo.push(element);
        } else if (verde.includes(element.status.toLowerCase())) {
            lines.verde.push(element);
        } else if (azul.includes(element.status.toLowerCase())) {
            lines.azul.push(element);
        } else {
            lines.resto.push(element);
        }
    });
    return lines;
}

const createTable = () => {
    const dataTable = document.createElement('table');
    dataTable.classList.add("table", "table-striped");

    const table_header = document.createElement('thead');
    const table_body = document.createElement('tbody');
    dataTable.appendChild(table_header);
    dataTable.appendChild(table_body);

    return dataTable;
};

const create_table_header = (order) => {
    const row = document.createElement('tr');
    order.forEach(value => {
        const cell = document.createElement('th');
        cell.textContent = capitalizeWords(value.toUpperCase());
        row.appendChild(cell);
    });
    return row;
};

const create_table_row = (data, order, color = "") => {

    if (color == 'verde') {
        color = "#aedd94";
    } else if (color == 'rojo') {
        color = "#ff8a84";
    } else if (color == 'azul') {
        color = "#75a9f9";
    } else {
        color = "#999999";
    }
    const row = document.createElement('tr');

    order.forEach(key => {
        const cell = document.createElement('td');
        if (key == "status") {
            const status = document.createElement('div');
            status.style.width = "fit-content";
            status.classList.add('rounded-3');
            status.classList.add('border');
            status.classList.add('border-2');
            status.classList.add('px-2');
            status.style.borderColor = color;
            status.style.background = color;
            status.textContent = data[key];
            cell.appendChild(status);
        } else if (key == "key") { 
            const key_link = document.createElement('a');
            key_link.classList.add('link-primary', 'link-offset-2', 'link-underline-opacity-25', 'link-underline-opacity-100-hover');
            key_link.href = 'https://vintegris.atlassian.net/browse/' + data[key];
            key_link.target = '_blank';
            key_link.textContent = data[key];

            cell.appendChild(key_link);
        } else {
            cell.textContent = data[key];
        }
        //cell.style.color = text_color;
        row.appendChild(cell);
    });
    return row;
};

const create_content_row = (title, table) => {
    const row = document.createElement('div');
    row.classList.add("container-fluid");
    const row_title = document.createElement('div');
    row_title.classList.add('row');
    const col_title = document.createElement('div');
    col_title.classList.add('col');
    row_title.appendChild(col_title)
    const row_content = document.createElement('div');
    row_content.classList.add('row');
    const col_content = document.createElement('div');
    col_content.classList.add('col');
    row_content.appendChild(col_content)
    const h3_title = document.createElement('h3');
    h3_title.textContent = capitalizeWords(title);
    col_title.appendChild(h3_title);
    col_content.appendChild(table);

    row.appendChild(row_title);
    row.appendChild(row_content);

    return row;
};

const createAdvanceChart = (data, title, ordered_grafic_columns, backgroundColor = []) => {
    Chart.register(ChartDataLabels);
    const container_chart = document.createElement('div');
    container_chart.classList.add("container-fluid");

    const row_title = document.createElement('div');
    row_title.classList.add("row");

    const row_content = document.createElement('div');
    row_content.classList.add("row");
    container_chart.appendChild(row_title)
    container_chart.appendChild(row_content)

    const col_title = document.createElement('div');
    col_title.classList.add("col");
    const col_content = document.createElement('div');
    col_content.classList.add("col");

    const h3_title = document.createElement('h3');
    h3_title.textContent = title;
    row_title.appendChild(h3_title);
    row_content.appendChild(col_content)

    const canva = document.createElement('canvas');
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

    var max_value = 0
    const chartData = {
        labels: labels.map((label) => capitalizeWords(label)),
        datasets: datasets.map((dataset, index) => ({
            label: capitalizeWords(dataset),
            data: labels.map((label) => {
                const value = dataset in data[label] ? data[label][dataset] : 0;
                max_value = max_value < value ? value : max_value;
                return value;
            }),
            backgroundColor: backgroundColor[index]
        })),
    };

    new Chart(canva.getContext('2d'), {
        type: 'bar',
        data: chartData,
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
    });

    col_content.appendChild(canva);

    return container_chart;
};

const createBasicChart = (data, title, label, backgroundColor = []) => {
    Chart.register(ChartDataLabels);
    const container_chart = document.createElement('div');
    container_chart.classList.add("container-fluid");

    const row_title = document.createElement('div');
    row_title.classList.add("row");

    const row_content = document.createElement('div');
    row_content.classList.add("row");
    container_chart.appendChild(row_title)
    container_chart.appendChild(row_content)

    const col_title = document.createElement('div');
    col_title.classList.add("col");
    const col_content = document.createElement('div');
    col_content.classList.add("col");

    const h3_title = document.createElement('h3');
    title = title.toLowerCase().replace(/ /g, "") == "qadeploymentcounter" ? "QA Deployment Counter" : title
    h3_title.textContent = title;
    row_title.appendChild(h3_title);
    row_content.appendChild(col_content)

    const canva = document.createElement('canvas');

    const labels = Object.keys(data).map(value => {
        value = value.replace('-_-', '#')
        return capitalizeWords(value);
    });

    const values = Object.values(data);

    new Chart(canva.getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: capitalizeWords(label),
                    data: values,
                    backgroundColor: backgroundColor,
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: Math.max(...Object.values(data)) + 2,
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
                        return value;
                    }
                }
            }
        }
    });

    col_content.appendChild(canva);

    return container_chart;
};

const manageStories = (stories) => {
    const header_order = ['key', 'summary', 'components', 'status'];
    try {

        const content_main = document.createElement('div');
        content_main.classList.add("row");

        for (const team_key of team_order) {
            if (Object.keys(stories).includes(team_key)) {
                if (stories[team_key].length !== 0) {
                    const table = createTable();
                    const row = create_content_row(team_key, table);
                    const order = apply_order(stories[team_key]);
                    table.querySelector('thead').appendChild(create_table_header(header_order));
                    for (const line_type of Object.keys(order)) {
                        if (order.hasOwnProperty(line_type)) {
                            order[line_type].forEach((element) => {
                                table.querySelector('tbody').appendChild(create_table_row(element, header_order, line_type));
                            });
                        }
                    }

                    content_main.appendChild(row);
                }
            }
        }

        return content_main;
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
};

const manageInternalTask = (issues) => {
    const header_order = ['key', 'type', 'summary', 'components', 'status', 'notes'];
    try {

        const content_main = document.createElement('div');
        content_main.classList.add("row");

        for (const team_key of team_order) {
            if (Object.keys(issues).includes(team_key)) {
                if (issues[team_key].length !== 0) {
                    const table = createTable();
                    const row = create_content_row(team_key, table);
                    const order = apply_order(issues[team_key]);
                    table.querySelector('thead').appendChild(create_table_header(header_order));
                    for (const line_type of Object.keys(order)) {
                        if (order.hasOwnProperty(line_type)) {
                            order[line_type].forEach((element) => {
                                table.querySelector('tbody').appendChild(create_table_row(element, header_order, line_type));
                            });
                        }
                    }
                    content_main.appendChild(row);
                }
            }
        }

        return content_main;
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
};

const manageComponents = (issues) => {
    const header_order = ['key', 'summary', 'hash', 'status'];
    try {
        const content_main = document.createElement('div');
        content_main.classList.add("row");

        for (const team_key of team_order) {
            if (Object.keys(issues).includes(team_key)) {
                if (issues[team_key].length !== 0) {
                    const table = createTable();
                    const row = create_content_row(team_key, table);
                    const order = apply_order(issues[team_key]);
                    table.querySelector('thead').appendChild(create_table_header(header_order));
                    for (const line_type of Object.keys(order)) {
                        if (order.hasOwnProperty(line_type)) {
                            order[line_type].forEach((element) => {
                                table.querySelector('tbody').appendChild(create_table_row(element, header_order, line_type));
                            });
                        }
                    }
                    content_main.appendChild(row);
                }
            }
        }

        return content_main;
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
}

const manageDocumentation = (issues) => {
    const header_order = ['user_guide', 'version', 'hash', 'status'];
    rojo = ['story rejected', 'qa failed', 'qa rejected', 'prod rejected', 'discarded']
    verde = ['qa verification success', 'done', 'qa verified', 'discarded', 'in production', 'deploy release pre']
    azul = ['in progress', 'qa testing story', 'qa validation']
    if (issues.length == 0) return null;

    const content_main = document.createElement('div');
    content_main.classList.add("row");

    for (const team_key of team_order) {
        if (Object.keys(issues).includes(team_key)) {
            if (issues[team_key].length !== 0) {
                const docu = issues[team_key][0];
                const table = createTable();
                const row = create_content_row(team_key, table);
                try {
                    table.querySelector('thead').appendChild(create_table_header(header_order));
                    lines_of_documentation = {}
                    Object.keys(docu['documentation']).forEach(itemKey => {
                        docu['documentation'][itemKey]['status'] = docu['status'];
                        let color = '';
                        if (rojo.includes(docu['status'].toLowerCase())) {
                            color = 'rojo';
                        } else if (verde.includes(docu['status'].toLowerCase())) {
                            color = 'verde';
                        } else if (azul.includes(docu['status'].toLowerCase())) {
                            color = 'azul';
                        }
                        table.querySelector('tbody').appendChild(create_table_row(docu['documentation'][itemKey], header_order, color));
                        content_main.appendChild(row);
                    });


                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
    return content_main;
}

const manageBugs = (bugs) => {
    const header_order = ['key', 'summary', 'components', 'cause', 'status', 'notes'];

    try {
        const content_main = document.createElement('div');
        content_main.classList.add("row");

        for (const team_key of team_order) {
            if (Object.keys(bugs).includes(team_key)) {
                if (bugs[team_key].length !== 0) {
                    const table = createTable();
                    const row = create_content_row(team_key, table);
                    const order = apply_order(bugs[team_key]);
                    table.querySelector('thead').appendChild(create_table_header(header_order));
                    for (const line_type of Object.keys(order)) {
                        if (order.hasOwnProperty(line_type)) {
                            order[line_type].forEach((element) => {
                                table.querySelector('tbody').appendChild(create_table_row(element, header_order, line_type));
                            });
                        }
                    }
                    content_main.appendChild(row);
                }
            }
        }

        return content_main;
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
};

const manageCharts = (data) => {
    try {

        const content_main = document.createElement('div');
        content_main.classList.add("row");

        // Chart Bug type
        const card_bug_type = createBasicChart(data.g_bug_type, "Sprint bug summary", "Tipology", ['#434DC4']);
        content_main.appendChild(card_bug_type);

        // Chart Bug project
        const card_bug_project = createBasicChart(data.g_bug_project, "Bugs by component", "Bugs", ['#434DC4']);
        content_main.appendChild(card_bug_project);

        //Bugs tipology by component
        const chart_bug_typologie = createAdvanceChart(data.g_bug_typology_byComponent, "Bugs tipology by component", [], ['#434DC4', '#6973E8']);
        content_main.appendChild(chart_bug_typologie);

        //Chart Bugs resolution by component
        const chart_bug_res_by_comp = createAdvanceChart(data.g_bug_pro_status, "Bugs resolution by component", [], ['#434DC4', '#6973E8']);
        content_main.appendChild(chart_bug_res_by_comp);

        //Chart Bug cause by FactoryTeam
        ordered_graph_labels = ['Commons', 'Team_Rocket', 'Nakama', 'Sputnik', 'Heyday', 'Smith', 'not_assigned'];
        const chart_bug = createAdvanceChart(data.g_bug_team_cause, "Bug cause by FactoryTeam", ordered_graph_labels, ['#4837A9', '#A93745', '#A93785', '#3799A9', '#45A937', '#A6A937', '#45a4c4']);
        content_main.appendChild(chart_bug);

        //Counters
        if ('counters' in data) {
            //const chart_counters= createAdvanceChart(data.counters, "Counters", [], ['#434DC4', '#6973E8','#434DC4', '#6973E8','#434DC4', '#6973E8','#434DC4']);
            for (counter in data.counters) {
                const title = capitalizeWords(counter.replace('-_-', "#"));
                const chart_counter = createBasicChart(data.counters[counter], title, title, ['#434DC4'])
                content_main.appendChild(chart_counter);
            }
        }

        return content_main;


    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
};