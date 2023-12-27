import React from "react";
import {
  Calendar,
  momentLocalizer,
  Event,
  ToolbarProps,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface MyEvent extends Event {
  start: Date;
  end: Date;
}

const generateEvents = (): MyEvent[] => {
  // Générer des rendez-vous fictifs pour aujourd'hui
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    8,
    0,
    0
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    18,
    0,
    0
  );

  const events: MyEvent[] = [];

  for (let i = 0; i < 5; i++) {
    const start = new Date(startOfDay);
    start.setHours(start.getHours() + i);

    const end = new Date(start);
    end.setHours(start.getHours() + 1);

    events.push({
      title: `Rendez-vous ${i + 1}`,
      start,
      end,
    });
  }

  return events;
};

const MyCalendar: React.FC = () => {
  const events = generateEvents();

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        toolbar={true}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;
