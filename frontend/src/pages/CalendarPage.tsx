import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { Event, Label } from '../api';
import { createEvent, updateEvent, deleteEvent } from '../api';
import { EventModal } from '../EventModal';
import { Plus } from 'lucide-react';

interface CalendarPageProps {
    events: Event[];
    labels: Label[];
    refresh: () => void;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({ events, labels, refresh }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<Partial<Event> | null>(null);

    const mapToCalendarEvents = () => {
        return events.map(e => {
            const label = labels.find(l => l.id === e.label_id);
            return {
                id: String(e.id),
                title: e.title + (e.is_free ? ' (Rảnh)' : ''),
                start: e.start_time,
                end: e.end_time,
                backgroundColor: label ? label.color : 'var(--primary)',
                borderColor: label ? label.color : 'var(--primary)',
                extendedProps: e
            };
        });
    };

    const handleSaveEvent = async (eventData: Partial<Event>) => {
        try {
            if (eventData.id) await updateEvent(eventData.id, eventData);
            else await createEvent(eventData);
            setIsModalOpen(false);
            refresh();
        } catch (e) { alert('Failed to save'); }
    }

    const handleDeleteEvent = async (id: number) => {
        if (window.confirm('Xóa sự kiện này?')) {
            await deleteEvent(id);
            setIsModalOpen(false);
            refresh();
        }
    }

    return (
        <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', alignItems: 'center' }}>
                <h2 style={{ margin: 0, color: 'var(--secondary)', fontWeight: 900, fontSize: '1.8rem' }}>Lịch Trình Của Bạn ✨</h2>
                <button className="cute-btn" onClick={() => { setCurrentEvent(null); setIsModalOpen(true); }} style={{ padding: '0.8rem 1.5rem' }}>
                    <Plus size={22} style={{ marginRight: '0.5rem' }} /> Thêm Lịch Mới
                </button>
            </div>
            
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek' }}
                events={mapToCalendarEvents()}
                dateClick={(arg) => { setCurrentEvent({ start_time: arg.date.toISOString() }); setIsModalOpen(true); }}
                eventClick={(arg) => { setCurrentEvent(arg.event.extendedProps); setIsModalOpen(true); }}
                height="auto"
            />

            <EventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEvent}
                onDelete={handleDeleteEvent}
                labels={labels}
                initialData={currentEvent}
            />
        </div>
    );
};
