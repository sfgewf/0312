import React, { useState } from 'react'; 
// 리액트 패키지에서 useState함수 가져옴
// 이 훅(내장함수)을 사용하면, 함수 컴포넌트 내에서 상태생성 및 업데이트시 사용
import './App.css';
// useState([]) - 상태 초기값 - 빈 배열로 설정 
// parkedCars - 컴포넌트 상태 비워둠
// setParkedCars - 업데이트 함수 
function ParkingSystem() {
  // 주차된 차량 상태 비워둠
  // 빈 배열과, 빈 문자열로 초기화 시킴 
  // 차량번호와 출차라는 글자를 비워둠으로 초기화 해줌 
    const [parkedCars, setParkedCars] = useState([]); // 비어있는 배열 설정, 입력된 차량번호 상태
    const [carInputValue, setCarInputValue] = useState(''); // 비어있는 출차 상태 

  // const 를 사용하여 함수선언 
  // const 의 경우 상수 뿐만 아니라 함수 선언시에도 사용됨
  // ... 확산연산자 - 배열이나 객체를 확장하거나 병합시 사용 
  // car 는 매개변수임
  // 매개변수의 역할은 parkCar 함수 호출시 주차된 차량을 나타내줌

  // ● 차량 주차 함수 - 새 차량 주차시 목록에 추가 
const parkCar = (car) => {
  setParkedCars([...parkedCars, car]); // 주차된 차량 목록에 새로운 차량 추가
};
// ● 차량 출차 함수 - 출차 클릭시 목록에서 사라짐
const unparkCar = (carIndex) => {
  /* .filter() - 배열의 각 요소에 대해 주어진 함수 호출하여 
  조건을 만족하는 요소에만 새로운 배열 생성 메서드 */ 
  // _ : ES6문법 (let, const)에서 사용하지 않는 변수를 의미
  // !== : 비교연산자 (서로 다른지 비교)
  // 다른 경우 true, 같을 경우 false로 반환 
  const updatedCars = parkedCars.filter((_,index) => index !== carIndex);
// 업데이트 차량 목록 설정 (주차된 차량목록상태 업데이트)
setParkedCars(updatedCars);
};

// parkedCars = 주차된 차량 목록을 담은 배열 
// 해당 조건이 맞을때 새로운 배열 생성 
// _,index 배열의 각 요소 확인 
// carIndex가 같은지 다른지 비교 
// index = 현재의 index 나타냄 
// _ 관례적으로 앞에 비어있는 변수 하나 넣어줌 (가독성을 위함)

// ● 입력된 차량 번호 변경 이벤트 핸들러
// 매개변수로 이벤트 객체 받음
const handleCarInputChange = (e) => {
  setCarInputValue(e.target.value); 
  // e.target.value - 이벤트가 일어난 요소의 값
};

// ● 주차 폼 제출 이벤트 
// 차량 번호가 비어있지 않은 경우에만  parkCar 함수호출
// 그리고 입력된 차량번호 초기화 
// 폼의 기본동작 (다시로드됨)을 방지하기 위해 
// e.preventDefault 사용되었음
const handleSubmit = (e) => {
  e.preventDefault(); // 링크차단메서드 
  // 폼 제출시 페이지가 다시 로드됨을 막아줌  
  // .trim() - 문자열의 양 끝에 공백 제거한 새로운 문자열 반환
  // 원본 문자열을 변경하지는 않음.
  // carInputValue 변수 문자열의 양끝에 공백 제거 후
  // 그 결과값이 '' 빈 문자열이 아닌지 확인하는 조건문
  // 공백으로만 이루어져있으면, .trim()  메서드 사용하여
  // 공백 제거 후에도 빈 문자열이 되므로 
  // 이 조건문은 거짓이 됨. 
  // 공백이 아닌 경우만 참이 됨 
  if (carInputValue.trim() !== '') {
    // 차량 주차함수호출
    parkCar(carInputValue);
    // 입력된 차량번호 초기화
    setCarInputValue('');
  } 
};
// ● 차량번호가 숫자가 아닌 경우를 처리하는 함수 
const handleInvalidInput = () => {
  const inputValue = carInputValue.trim(); // 입력된 값을 공백제거하여 확인
  if (!/^\d+$/.test(inputValue)) {
// .test() - 주어진 문자열이 정규 표현식에 일치하는지 여부 확인
    alert('차량 번호는 숫자로만 입력해주세요'); // 경고창 
    setCarInputValue(''); // 입력된 차량번호 초기화 
  }
};


// 정규표현식 중 문자열이 숫자로만 구성되어있는지 확인 
//  : !/^\d+$/ - 정규표현식 
// ^ -> 문자열로 시작을 나타내는 메타문자 
// \d -> 숫자를 나타내는 메타문자 
// + -> 앞의 표현식이 하나 이상의 인스턴스에 일치하는지 확인
// $ -> 문자열의 끝을 나타내는 메타문자 
// ! - > 부정 연산자 

    return (
    <div className="parking-system-container">
      {/* 주차관리시스템 제목 */}
      <h1 className="parking-system-title"> 주차관리시스템 </h1>
     
      <ul className="parked-cars-list">
        {/* .map() - 배열의 각 요소를 순회하며 콜백함수 실행 */}
        {/* 주차된 차량목록 */}

      {parkedCars.map((car, index) => (
        <li key = {index}> 
        {car}{' '}
          {/* car는, 출력될 차량번호 '' 는 공백을 의미
          이 공백은, 버튼 사이에 추가되는 리스트를 보기좋게 표시하기 위함 */}
          {/* key - 키값은, 리액트에서 각 요소를 식별하기 위한 키 */}
          {/* 출차버튼 */}
          <button className="unpark-button" onClick={() => unparkCar(index)}> 출차 </button>
        </li>
))}

      </ul>
      {/* 주차폼 */}
{/* onSubmit = 리액트에서 사용되는 이벤트 핸들러 (Enter 키 눌렀을때 handleSubmit 함수 호출) */}
      <form className="park-car-form" 
      onSubmit={handleSubmit} >
        <label htmlFor="carInput" className="car-input-label">
           차량번호         
          <input type="text" 
          id="carInput" 
          name="car"
          className="car-input"
          value={carInputValue} // 입력된 차량번호 표시 (입력된값표시)
          onChange={handleCarInputChange} // 값 변경시 호출되는 이벤트
          onBlur = {handleInvalidInput} // 입력된 요소에서 빠져나갈때 호출되는 이벤트
          required
          // required - 필수입력란임 (값이 필히 입력되어야함을 의미)
          /> 
        </label>
        {/* 주차버튼 */}
        <button className="park-button" type="submit">주차</button>
        {/*  type="submit" button에 들어가는 속성인데,
        form 안의 내용을 제출하라는 역할을 함 */}
      </form>
    </div>
  );
}

export default ParkingSystem;
// 컴포넌트 가져옴  
// 기본으로 내보내는 값을 지정시 사용 
