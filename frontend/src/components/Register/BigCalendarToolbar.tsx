import React from 'react';
import { ToolbarProps, Navigate } from 'react-big-calendar';

const BigCalendarToolbar: React.FC<ToolbarProps> = ({
  date,
  view,
  views,
  label,
  onNavigate,
  onView,
}) => {
  const goToBack = () => {
    onNavigate(Navigate.PREVIOUS);
  };

  const goToNext = () => {
    onNavigate(Navigate.NEXT);
  };

  const goToToday = () => {
    onNavigate(Navigate.TODAY);
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToBack}>
          &lt;
        </button>
        <button type="button" onClick={goToToday}>
          Today
        </button>
        <button type="button" onClick={goToNext}>
          &gt;
        </button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
    </div>
  );
};

export default BigCalendarToolbar;
