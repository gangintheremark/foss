import { BtnStyleProp } from 'types/type';
interface IRegisterBtn extends BtnStyleProp {
  onClick?: () => void;
  disabled?: boolean;
  text: string;
}
const RegisterBtn = (props: IRegisterBtn) => {
  return (
    <button
      className={`bg-main-color text-white rounded ${props.width} ${props.height} mx-auto mt-10
        hover:bg-main-color-active disabled:bg-neutral-400`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default RegisterBtn;
