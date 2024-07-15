import { useCountStore } from '@store/count'

const MainCompo = () => {
  const CountButton = () => {
    const {increase, decrease} = useCountStore((state) => state.actions)
  
    return (
      <>
        <button onClick={increase}>증가</button>
        <button onClick={decrease}>감소</button>
      </>
    )
  }
  
  const Count = () => {
    const count = useCountStore((state) => state.count)
    return <div>{count}</div>
  }
  return (
    <>
    <Count />
    <CountButton />
    </>
  )
}

export default MainCompo