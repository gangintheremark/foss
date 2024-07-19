import { BtnStyleProp } from 'types/type';
interface IRegisterBtn extends BtnStyleProp {
  onClick?: () => void;
}
const RegisterBtn = (props: IRegisterBtn) => {
  return (
    <button
      className={`bg-main-color text-white rounded ${props.fontSize} ${props.width} ${props.height} mx-auto mt-3
        hover:bg-main-color-active`}
    >
      등록하기
    </button>
  );
};

export default RegisterBtn;
