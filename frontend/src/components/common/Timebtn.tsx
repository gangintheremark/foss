import { BtnStyleProp } from 'types/type';

interface BtnProp extends BtnStyleProp {
  text: string;
  onClick: (value: string) => void;
  value: string;
  isActive?: boolean;
}

const Timebtn = (props: BtnProp) => {
  return (
    <button
      className={`${props.width} ${props.height} rounded border-gray border-solid border-[1px] 
    ${props.text === props.value ? 'bg-main-color text-white' : 'bg-white'}
    flex justify-center items-center text-${props.fontSize} font-medium 
    hover:bg-main-hover-color hover:text-white active:bg-main-color-active disabled:bg-gray`}
      key={props.text}
      onClick={() => props.onClick(props.text)}
      disabled={props.isActive}
    >
      {props.text}
    </button>
  );
};

export default Timebtn;
