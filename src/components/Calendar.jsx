import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import axios from 'axios';
import FormTemplate from './FormTemplate';
import { toast } from 'react-toastify';
import { FaTrash } from "react-icons/fa"; // Importar el ícono de bote de basura

dayjs.locale('es');
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

const eventStyleGetter = () => {
  return {
    style: {
      backgroundColor: '#465FFF',
      color: 'white',
      borderRadius: '5px',
      padding: '5px',
      fontSize: '10px',
      height: 'auto',
    },
  };
};

export const Calendar = ({ recordatorios = [], onRecordatorioAdded }) => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ start: '', end: '', title: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const parsedEvents = recordatorios.map((event) => ({
      ...event,
      title: event.nombre,
      start: new Date(event.fecha_inicio),
      end: new Date(event.fecha_vencimiento),
    }));
    setEvents(parsedEvents);
  }, [recordatorios]);

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({
      title: '',
      start: dayjs(start).format('YYYY-MM-DDTHH:mm'),
      end: dayjs(end).format('YYYY-MM-DDTHH:mm'),
    });
    setShowForm(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      start: dayjs(event.start).format('YYYY-MM-DDTHH:mm'),
      end: dayjs(event.end).format('YYYY-MM-DDTHH:mm'),
    });
    setShowForm(true);
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;

    try {
      // await axios.delete(`https://finwise-gedvf4egduhbajbh.brazilsouth-01.azurewebsites.net/dashboard/deleteReminder/${selectedEvent.id}`);
      await axios.delete('http://localhost:3000/dashboard/deleteReminder', {
        data: { id: selectedEvent.id },
      });

      setEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id));
      toast.success('Recordatorio eliminado correctamente.');
      setShowForm(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      toast.error('Hubo un problema al eliminar el recordatorio.');
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!newEvent.title.trim()) {
      toast.error('El título del evento no puede estar vacío.');
      return;
    }

    try {
      if (selectedEvent) {
        //const response = await axios.put(`https://finwise-gedvf4egduhbajbh.brazilsouth-01.azurewebsites.net/dashboard/modifyReminder`, {
        const response = await axios.put('http://localhost:3000/dashboard/modifyReminder', {
          id: selectedEvent.id,
          nombre: newEvent.title,
          estado: 'pendiente',
          fecha_inicio: newEvent.start,
          fecha_vencimiento: newEvent.end,
        });

        const updated = response.data?.recordatorio;
        if (!updated) throw new Error('No se recibió el recordatorio modificado.');

        const updatedEvent = {
          ...updated,
          start: dayjs(updated.fecha_inicio).toDate(),
          end: dayjs(updated.fecha_vencimiento).toDate(),
        };

        setEvents((prev) =>
          prev.map((e) => (e.id === selectedEvent.id ? updatedEvent : e))
        );
        toast.success('Recordatorio modificado correctamente.');
      } else {
        //const response = await axios.post(`https://finwise-gedvf4egduhbajbh.brazilsouth-01.azurewebsites.net/dashboard/addReminder`, {
        const response = await axios.post('http://localhost:3000/dashboard/addReminder', {
          nombre: newEvent.title,
          estado: 'pendiente',
          fecha_inicio: newEvent.start,
          fecha_vencimiento: newEvent.end,
        });

        const saved = response.data?.recordatorio;
        if (!saved) throw new Error('No se recibió el recordatorio guardado.');

        const savedEvent = {
          ...saved,
          start: dayjs(saved.fecha_inicio).toDate(),
          end: dayjs(saved.fecha_vencimiento).toDate(),
        };

        setEvents((prev) => [...prev, savedEvent]);
        if (onRecordatorioAdded) onRecordatorioAdded(savedEvent);
        toast.success('Recordatorio agregado correctamente.');
      }

      setShowForm(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error al guardar el evento:', error);
      toast.error('Hubo un problema al guardar el recordatorio.');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedEvent(null);
  };

  return (
    <div style={{ height: '70vh', width: '100%' }}>
      <BigCalendar
        className='cursor-pointer'
        localizer={localizer}
        events={events}
        messages={messages}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
      />
      {showForm && (
        <FormTemplate onSubmit={handleFormSubmit} onCancel={handleCancel}>
          <h2 className='text-center text-3xl font-bold my-6 text-black'>
            {selectedEvent ? 'Modificar Evento' : 'Agregar Evento'}
          </h2>
          {selectedEvent && (
            <p className="text-center text-lg font-medium text-gray-700 mb-4">
              Evento seleccionado: <span className="font-bold">{selectedEvent.title}</span>
            </p>
          )}
          <label className="block text-white text-lg font-bold mb-1" htmlFor="title">
            Título del evento
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Ingrese el título del evento"
            value={newEvent.title}
            onChange={handleInputChange}
            className="border-2 rounded px-4 py-2 mb-6 text-lg bg-blue-50"
          />
          <label className="block text-white text-lg font-bold mb-1" htmlFor="start">
            Fecha y hora de inicio
          </label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            value={newEvent.start}
            onChange={handleInputChange}
            className="border-2 rounded px-4 py-2 mb-6 text-lg bg-green-50"
          />
          <label className="block text-white text-lg font-bold mb-1" htmlFor="end">
            Fecha y hora de fin
          </label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            value={newEvent.end}
            onChange={handleInputChange}
            className="border-2 rounded px-4 py-2 mb-6 text-lg bg-yellow-50"
          />
          {selectedEvent && (
            <button
              type="button"
              onClick={handleDeleteEvent}
              className="flex items-center justify-center bg-red-500 text-white p-3 rounded-full hover:bg-red-600 mb-6"
            >
              <FaTrash className="text-xl" />
            </button>
          )}
        </FormTemplate>
      )}
    </div>
  );
};
