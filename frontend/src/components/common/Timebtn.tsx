interface BtnProp {
  text: string;
  onClick: (value: string) => void;
  value: string;
  width: string;
  height: string;
  fontSize: string;
}

const Timebtn = (props: BtnProp) => {
  return (
    <button
      className={`${props.width} ${props.height} rounded border-gray border-solid border-[1px] 
    ${props.text === props.value ? 'bg-main-color text-white' : 'bg-white'}
    flex justify-center items-center text-${props.fontSize} font-medium 
    hover:bg-main-hover-color active:bg-main-color-active disabled:bg-gray`}
      key={props.text}
      onClick={() => props.onClick(props.text)}
    >
      {props.text}
    </button>
  );
};

export default Timebtn;
