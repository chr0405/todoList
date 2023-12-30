import { useEffect, useState } from 'react';

// 기본 제공하는 api 는 fetch
/*
server 에 data를 요청하려면
server 주소를 알아야 함
어떤 HTTP method를 사용할지 알아야 한다
*/

// axios 는 라이브러리

function App() {
  const [TodoList, setTodoList] = useState(null);

  // fetch로 받은 data 객체를 JS 객체로 프라미스로 변환 [파싱]
  // 위에서 받은 프라미스의 객체 값을 출력
  const fetchData = () => {
    // method 아무것도 안 적으면 get 요청
    fetch('http://localhost:4000/api/todo')
    .then((response) => response.json())
    .then((data) => setTodoList(data));
  } 

  useEffect(() => {
    fetchData();
  }, []);
  // useEffect에서 두 번째 인자에 아무것도 없으면 한 번만 실행 
  
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const text = event.target.text.value;
    const done = event.target.done.checked;
    fetch('http://localhost:4000/api/todo', {
    // 데이터를 줄 때는 body에 문자열로 직렬화 해서
    // method 에 'POST'라고 명시
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          done,
        }),
      }).then(() => fetchData());
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form onSubmit={onSubmitHandler}>
        {/* name 속성은 form이 제출된 후 서버에서 form data를 참조하기 위해 사용되거나,
        자바스크립트에서 요소를 참조하기 위해 사용 */}
        <input name='text'/>
        <input name='done' type='checkbox'/>
        <input type='submit' value='추가'/>
      </form>
      {/* optional chaining */}
      {TodoList?.map((todo) => (
        <div key={todo.id} style={{display: 'flex'}}>
          {/* key 값은 map을 사용하기 때문에 필요. 고유한 값으로 사용 */}
          <div>{todo.id}</div>
          <div>{todo.text}</div>
          <div>{todo.done? 'Y': 'N'}</div>
        </div>
      ))
      }
    </div>
  );
}

export default App;
