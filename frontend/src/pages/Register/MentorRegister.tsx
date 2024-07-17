import SmallCalendar from '@components/Register/SmallCalendar';

const MentorRegister = () => {
  return (
    <div className="flex gap-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <SmallCalendar isMentor={true} />
    </div>
  );
};

export default MentorRegister;
