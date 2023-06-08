import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // webpack uses file-loader to handle font files
import './index.css'; // our app's CSS
import { response } from 'express';
import { error } from 'cypress/types/jquery';

document.addEventListener('DOMContentLoaded', function () {
	var calendarEl = document.getElementById('calendar');

	var calendar = new Calendar(calendarEl, {
		locale: 'pt-br', // traduzindo para português Brasil.
		plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
		themeSystem: 'bootstrap5',
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
		},

		initialDate: '2023-06-12',
		navLinks: true, // can click day/week names to navigate views
		editable: true,
		dayMaxEvents: true, // allow "more" link when too many events

		events: function (inf, successCallback, failureCallback) {
			var url = 'http://difiores-001-site3.etempurl.com/Agenda'
			fetch(url)
				.then(response => {
					if (response) {
						return response.json();
					} else {
						throw new Error('Erro na solicitação GET. ' + response.status);
					}
				})
				.then(data => {
					successCallback(data);
				})
				.catch(error => {
					console.error('Ocorreu um erro:', error);
					failureCallback(error)
				})
		}
	});

	calendar.render();
});