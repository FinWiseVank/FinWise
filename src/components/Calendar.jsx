import React, { useState } from 'react';
import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import FormTemplate from './FormTemplate';

dayjs.locale('es'); // Cambiar el idioma a español
const localizer = dayjsLocalizer(dayjs);

const messages = {
  allDay: 'Todo el día',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay eventos en este rango',
  showMore: total => `+ Ver más (${total})`,
};

export const Calendar = () => {
  const [events, setEvents] = useState([
    {
      title: 'Reunión 1',
      start: dayjs('2025-02-01T22:00:00').toDate(),
      end: dayjs('2025-02-01T23:00:00').toDate(),
    },
  ]);
  const [showForm, setShowForm] = useState(false);//para mostrar el formulario
  const [newEvent, setNewEvent] = useState({ start: '', end: '', title: '' });//para cargar el formulario

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ start: dayjs(start).format('YYYY-MM-DDTHH:mm'), end: dayjs(end).format('YYYY-MM-DDTHH:mm'), title: '' });
    setShowForm(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setEvents([...events, { ...newEvent, start: dayjs(newEvent.start).toDate(), end: dayjs(newEvent.end).toDate() }]);
    setShowForm(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div style={{ height: '70vh', width: '100%' }}>
      <BigCalendar className='cursor-pointer'
        localizer={localizer}
        events={events}
        messages={messages}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
      />
      {showForm && (
        <FormTemplate onSubmit={handleFormSubmit} onCancel={handleCancel}>
          <h2 className='text-center text-2xl font-bold my-4 text-white'>Agregar Evento</h2>
          <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
            Título del evento
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder='Ingrese el título del evento'
            value={newEvent.title}
            onChange={handleInputChange}
            className="border-2 rounded px-2 py-1 mb-4"
          />
          <label className="block text-white text-sm font-bold mb-2" htmlFor="start">
            Fecha y hora de inicio
          </label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            value={newEvent.start}
            onChange={handleInputChange}
            className="border-2 rounded px-2 py-1 mb-4"
          />
          <label className="block text-white text-sm font-bold mb-2" htmlFor="end">
            Fecha y hora de fin
          </label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            value={newEvent.end}
            onChange={handleInputChange}
            className="border-2 rounded px-2 py-1 mb-4"
          />
        </FormTemplate>
      )}
    </div>
  );
};