const express = require('express');
const app = express();

// cors 정책 허용
const cors = require('cors');
app.use(cors());

// express 사용 시 body에서 data 를 꺼내 쓰려면 body-parser 가 필요
app.use(express.json()); // for parsing
app.use(express.urlencoded({ extended: true})); // for parsing

let id = 2;

const todoList = [{
    // sample data
    id : 1,
    text : '할 일 1',
    done : false,
}];

// api/todo 로 get 요청을 하면 함수 실행
app.get('/api/todo', (req, res) => {
    // return todoList;
    res.json(todoList);
});

// todoList 에 추가
// /api/todo 로 post 요청
app.post('/api/todo', (req, res) => {
    // server 에서 data 를 보낼 때 prompt는 body에 data를 넣어서 전달
    const {text, done} = req.body;
    console.log("req.body : ", req.body);
    // todoList에 추가
    todoList.push({
        id: id++,
        text,
        done,
    });
    return res.send('success');
})

app.listen(4000, () => {
    console.log('server start!!');
});