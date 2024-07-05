const DATA = [
    {
        question: 'Как называется еврейский Новый год?',
        answers:[
            {
                id: '1',
                value: 'Рош ха-Шана',
                correct: true,
            },
            {
                id: '2',
                value: 'Ханука',
                correct: false,
            },
            {
                id: '3',
                value: 'Йом Кипур',
                correct: false,
            },
            {
                id: '4',
                value: 'Кванза',
                correct: false,
            }
        ],
        multiple: true
    },
    {
        question: 'Сколько синих полос на флаге США?',
        answers:[
            {
                id: '5',
                value: '6',
                correct: false,
            },
            {
                id: '6',
                value: '0',
                correct: true,
            },
            {
                id: '7',
                value: '7',
                correct: false,
            },
            {
                id: '8',
                value: '13',
                correct: false,
            }
        ],
        multiple: false
    },
    {
        question: 'Кто из этих персонажей не дружит с Гарри Поттером?',
        answers:[
            {
                id: '9',
                value: 'Рон Уизли',
                correct: false,
            },
            {
                id: '10',
                value: 'Драко Малфой',
                correct: true,
            },
            {
                id: '11',
                value: 'Невилл Лонгботтом',
                correct: false,
            },
            {
                id: '12',
                value: 'Гермиона Грейнджер',
                correct: false,
            },
        ]
    },
    {
        question: 'Какое животное не фигурирует в китайском зодиаке?',
        answers:[
            {
                id: '13',
                value: 'Дракон',
                correct: false,
            },
            {
                id: '14',
                value: 'Кролик',
                correct: false,
            },
            {
                id: '15',
                value: 'Колибри',
                correct: true,
            },
            {
                id: '16',
                value: 'Собака',
                correct: false,
            }
        ]
    },
    {
        question: 'В какой стране проходили летние Олимпийские игры 2016 года?',
        answers:[
            {
                id: '17',
                value: 'Бразилия',
                correct: true,
            },
            {
                id: '18',
                value: 'Китай',
                correct: false,
            },
            {
                id: '19',
                value: 'Ирландия',
                correct: false,
            },
            {
                id: '20',
                value: 'Италия',
                correct: false,
            }
        ]
    },
    {
        question: 'Какая планета самая горячая?',
        answers:[
            {
                id: '21',
                value: 'Сатурн',
                correct: false,
            },
            {
                id: '22',
                value: 'Меркурий',
                correct: false,
            },
            {
                id: '23',
                value: 'Марс',
                correct: false,
            },
            {
                id: '24',
                value: 'Венера',
                correct: true,
            }
        ]
    },
    {
        question: 'Как назывался корабль капитана Джека Воробья в "Пиратах Карибского моря"?',
        answers:[
            {
                id: '25',
                value: 'Черная жемчужина',
                correct: true,
            },
            {
                id: '26',
                value: 'Мародер',
                correct: false,
            },
            {
                id: '27',
                value: 'Мародер',
                correct: false,
            },
            {
                id: '28',
                value: 'Слизерин',
                correct: false,
            }
        ]
    },
    {
        question: 'Какая самая редкая группа крови?',
        answers:[
            {
                id: '29',
                value: 'I группа',
                correct: true,
            },
            {
                id: '30',
                value: 'II группа',
                correct: false,
            },
            {
                id: '31',
                value: 'III группа',
                correct: false,
            },
            {
                id: '32',
                value: 'IV группа',
                correct: false,
            }
        ]
    },
    {
        question: 'Кто из этих персонажей не входит в группу друзей из сериала "Друзья"?',
        answers:[
            {
                id: '33',
                value: 'Рэйчел',
                correct: false,
            },
            {
                id: '34',
                value: 'Джоуи',
                correct: false,
            },
            {
                id: '35',
                value: 'Гюнтер',
                correct: true,
            },
            {
                id: '36',
                value: 'Моника',
                correct: false,
            }
        ],
        multiple: false
    },
    {
        question: 'Сколько костей в теле человека?',
        answers:[
            {
                id: '37',
                value: '209',
                correct: false,
            },
            {
                id: '38',
                value: '201',
                correct: false,
            },
            {
                id: '39',
                value: '205',
                correct: false,
            },
            {
                id: '40',
                value: '206',
                correct: true,
            }
        ]
    }
];

let localResults = {};

let timeLeft = 60;
let timerInterval;
let localResult = {};

const startTimer = () => {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        } else {
            timer.innerHTML = `Время: ${timeLeft} сек`;
             timeLeft--;
        }
    }, 1000);
};

const finishQuiz = () => {
    questions.classList.add('question--hidden');
    indicator.classList.add('indicator--hidden');
    results.classList.add('indicator--visible');
    btnNext.classList.add('btn-next--hidden');
    btnRestart.classList.add('btn-restart--visible');
    renderResults();
};



const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const results = document.getElementById('results');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');


const renderQuestions = (index) => {
    renderIndicator(index + 1);

    questions.dataset.currentStep = index;

    const renderAnswers = () => DATA[index].answers
    .map((answers) =>`
        <li>
            <label>
                <input class="answer=input" type="radio" name=${index} value=${answers.id}>
                     ${answers.value}
                </label>
       </li>
    `)
    .join('');
    
    questions.innerHTML = `
    <div class="quiz-questions-item">
                <div class="quiz-questions-item__question">${DATA[index].question}</div>
                <ul class="quiz-questions-item__answers">${renderAnswers()}</ul>
            </div>`;
    srartTimer();
};

const renderResults = () => {
    let content = '';

    const getClassname = (answers, questionIndex) =>{
        let classname = '';

        if (!answers.correct && answers.id === localResults[questionIndex]) {
            classname = 'answers--invalid';
        } else if (answers.correct) {
            classname = 'answers--valid';
        }

        return classname;
    }

    const getAnswers = (questionIndex) => DATA[questionIndex].answers
        .map((answers) => `<li class=${getClassname(answers, questionIndex)}>${answers.value}</li>`)
        .join('');
    

    DATA.forEach((question, index) => {
        content += `
            <div class="quiz-results-item">
                <div class="quiz-results-item__question">${question.question}</div>
                <ul class="quiz-results-item__answers">${getAnswers(index)}</ul>
            </div>
        `; 
    })

    results.innerHTML = content;
};

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`;
};

quiz.addEventListener('change', (event) => {
    if(event.target.classList.contains('answer=input')) {
        localResults[event.target.name] = event.target.value;
        btnNext.disabled = false;
    }
})

quiz.addEventListener('click', (event) => {
    if(event.target.classList.contains('btn-next')) {
        const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;

        if (DATA.length === nextQuestionIndex){

            questions.classList.add('question--hidden')
            indicator.classList.add('indicator--hidden')
            results.classList.add('indicator--visible')
            btnNext.classList.add('btn-next--hidden')
            btnRestart.classList.add('btn-restart--visible')

            renderResults();
        } else {
            renderQuestions(nextQuestionIndex);
        }

        btnNext.disabled = true;
    }

    if(event.target.classList.contains('btn-restart')) {
        localResults = {};
        results.innerHTML = '';

        questions.classList.remove('question--hidden')
        indicator.classList.remove('indicator--hidden')
        results.classList.remove('indicator--visible')
        btnNext.classList.remove('btn-next--hidden')
        btnRestart.classList.remove('btn-restart--visible')

        renderQuestions(0);
    }
})

const btnThemeToggle = document.getElementById('btn-theme-toggle');

btnThemeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});

document.body.classList.add('light-theme');

renderQuestions(0)
