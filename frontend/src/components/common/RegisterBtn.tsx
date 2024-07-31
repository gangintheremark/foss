import { BtnStyleProp } from 'types/type';
interface IRegisterBtn extends BtnStyleProp {
  onClick?: () => void;
  disabled?: boolean;
}
const RegisterBtn = (props: IRegisterBtn) => {
  return (
    <button
      className={`bg-main-color text-white rounded ${props.fontSize} ${props.width} ${props.height} mx-auto mt-3
        hover:bg-main-color-active disabled:bg-nav-gray-color`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      등록하기
    </button>
  );
};

export default RegisterBtn;
